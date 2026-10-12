import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as $3Dmol from '3dmol';
import {
  RotateCcw,
  Play,
  Pause,
  Camera,
  Maximize2,
  Eye,
  Sliders,
  Layers,
  Sparkles,
  Info,
  Palette
} from 'lucide-react';
import { ViewerControls, TargetData, ClinicalVariant, ActiveSiteResidue } from '../types/science';

interface MolecularViewer3DProps {
  structureData: string | null;
  structureFormat: 'cif' | 'pdb';
  target: TargetData;
  activeFocusResidue: number | null;
  activeVariant: ClinicalVariant | null;
  activeSite: ActiveSiteResidue | null;
  onSelectResidue: (residueNumber: number) => void;
  isLoading: boolean;
}

export const MolecularViewer3D: React.FC<MolecularViewer3DProps> = ({
  structureData,
  structureFormat,
  target,
  activeFocusResidue,
  activeVariant,
  activeSite,
  onSelectResidue,
  isLoading
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const surfaceRef = useRef<any>(null);
  const highlightShapeRef = useRef<any>(null);

  const [controls, setControls] = useState<ViewerControls>({
    representation: 'cartoon',
    colorMode: 'plddt',
    surface: 'none',
    surfaceOpacity: 0.7,
    spinning: false,
    spinSpeed: 0.8,
    showLigands: true,
    showWater: false,
    backgroundTheme: 'dark'
  });

  const [pickedAtom, setPickedAtom] = useState<{
    resn: string;
    resi: number;
    chain: string;
    b: number;
    elem: string;
    atomName: string;
  } | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);

  // Initialize viewer
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous viewer if existing
    containerRef.current.innerHTML = '';

    const bg = controls.backgroundTheme === 'dark' ? '#0f172a' : '#ffffff';
    const viewer = ($3Dmol as any).createViewer(containerRef.current, {
      defaultcolors: ($3Dmol as any).rasmolElementColors,
      backgroundColor: bg,
    });

    viewerRef.current = viewer;

    const handleResize = () => {
      if (viewerRef.current) {
        viewerRef.current.resize();
        viewerRef.current.render();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [controls.backgroundTheme]);

  // Canonical AlphaFold 4-tier pLDDT color scheme
  const plddtColorFunc = useCallback((atom: any) => {
    const b = atom.b ?? 80;
    if (b > 90) return '#0053D6'; // Very high (>90)
    if (b > 70) return '#65CBF3'; // Confident (70-90)
    if (b > 50) return '#FFDB13'; // Low (50-70)
    return '#FF7D45';             // Very low (<50)
  }, []);

  // Secondary structure color scheme
  const secondaryColorFunc = useCallback((atom: any) => {
    const ss = atom.ss;
    if (ss === 'h') return '#ec4899'; // Alpha helix (magenta/pink)
    if (ss === 's') return '#eab308'; // Beta sheet (yellow)
    return '#94a3b8';                 // Loop / coil (grey)
  }, []);

  // Domain coloring function
  const domainColorFunc = useCallback((atom: any) => {
    const resi = atom.resi;
    const match = target.domains.find(d => resi >= d.start && resi <= d.end);
    return match ? match.color : '#cbd5e1';
  }, [target.domains]);

  // Apply representation, coloring, and ligand styles
  const applyVisualStyles = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    // Reset styles
    viewer.setStyle({}, {});

    // Main polymer backbone style
    const styleObj: any = {};
    if (controls.representation === 'cartoon') {
      styleObj.cartoon = {
        thickness: 0.45,
        opacity: controls.surface !== 'none' ? 0.75 : 1.0,
      };

      if (controls.colorMode === 'plddt') {
        styleObj.cartoon.colorfunc = plddtColorFunc;
      } else if (controls.colorMode === 'spectrum') {
        styleObj.cartoon.color = 'spectrum';
      } else if (controls.colorMode === 'secondary') {
        styleObj.cartoon.colorfunc = secondaryColorFunc;
      } else if (controls.colorMode === 'domains') {
        styleObj.cartoon.colorfunc = domainColorFunc;
      } else {
        styleObj.cartoon.colorscheme = 'chainHetatm';
      }
    } else if (controls.representation === 'stick') {
      styleObj.stick = {
        radius: 0.22,
        colorscheme: 'Jmol',
      };
      if (controls.colorMode === 'plddt') {
        styleObj.stick.colorfunc = plddtColorFunc;
      }
    } else if (controls.representation === 'sphere') {
      styleObj.sphere = {
        scale: 0.75,
      };
      if (controls.colorMode === 'plddt') {
        styleObj.sphere.colorfunc = plddtColorFunc;
      } else {
        styleObj.sphere.colorscheme = 'Jmol';
      }
    }

    // Apply main model style (excluding non-protein waters and ligands for cartoon)
    viewer.setStyle({ hetflag: false }, styleObj);

    // Show ligands, drugs, cofactors, ions
    if (controls.showLigands) {
      viewer.setStyle(
        { hetflag: true, resn: ['HOH', 'WAT'], invert: true },
        {
          stick: { radius: 0.28, colorscheme: 'Jmol' },
          sphere: { scale: 0.35, colorscheme: 'Jmol' },
        }
      );
    }

    // Show water molecules if enabled
    if (controls.showWater) {
      viewer.setStyle(
        { resn: ['HOH', 'WAT'] },
        {
          sphere: { radius: 0.3, color: '#38bdf8' },
        }
      );
    } else {
      viewer.setStyle({ resn: ['HOH', 'WAT'] }, { sphere: { hidden: true } });
    }

    // Highlight active sites as distinct colored sticks
    target.activeSites.forEach(site => {
      viewer.addStyle(
        { resi: site.position },
        {
          stick: { radius: 0.35, color: '#f59e0b' },
        }
      );
    });

    // Surface management
    if (surfaceRef.current) {
      viewer.removeSurface(surfaceRef.current);
      surfaceRef.current = null;
    }

    if (controls.surface !== 'none') {
      const surfaceType =
        controls.surface === 'sas'
          ? ($3Dmol as any).SurfaceType.SAS
          : ($3Dmol as any).SurfaceType.VDW;

      surfaceRef.current = viewer.addSurface(surfaceType, {
        opacity: controls.surfaceOpacity,
        colorfunc: controls.colorMode === 'plddt' ? plddtColorFunc : undefined,
        colorscheme: controls.colorMode === 'plddt' ? undefined : 'whiteCarbon',
      });
    }

    viewer.render();
  }, [
    controls,
    plddtColorFunc,
    secondaryColorFunc,
    domainColorFunc,
    target.activeSites,
  ]);

  // Load structure data when available
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !structureData) return;

    try {
      viewer.clear();
      viewer.addModel(structureData, structureFormat);

      // Setup picking
      viewer.setClickable({}, true, (atom: any) => {
        if (!atom) return;
        setPickedAtom({
          resn: atom.resn,
          resi: atom.resi,
          chain: atom.chain || 'A',
          b: atom.b ?? 0,
          elem: atom.elem,
          atomName: atom.atom || atom.resn,
        });
        onSelectResidue(atom.resi);

        // Flash selection sphere
        if (highlightShapeRef.current) {
          viewer.removeShape(highlightShapeRef.current);
        }
        highlightShapeRef.current = viewer.addSphere({
          center: { x: atom.x, y: atom.y, z: atom.z },
          radius: 1.8,
          color: '#38bdf8',
          opacity: 0.55,
        });
        viewer.render();
      });

      applyVisualStyles();
      viewer.zoomTo();
      viewer.render();
    } catch (err) {
      console.error('Failed to load structure in 3Dmol:', err);
    }
  }, [structureData, structureFormat, applyVisualStyles, onSelectResidue]);

  // Update visual styles when controls change
  useEffect(() => {
    applyVisualStyles();
  }, [controls, applyVisualStyles]);

  // Handle spin control
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (controls.spinning) {
      viewer.spin('y', controls.spinSpeed);
    } else {
      viewer.spin(false);
    }
  }, [controls.spinning, controls.spinSpeed]);

  // Focus on specific residue, variant, or active site
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !activeFocusResidue) return;

    try {
      if (highlightShapeRef.current) {
        viewer.removeShape(highlightShapeRef.current);
        highlightShapeRef.current = null;
      }

      // Add prominent sidechain sticks to the focused residue
      viewer.addStyle(
        { resi: activeFocusResidue },
        {
          stick: { radius: 0.45, color: '#ef4444' },
        }
      );

      // Find atom coordinates for focused residue to place aura
      const atoms = viewer.selectedAtoms({ resi: activeFocusResidue });
      if (atoms && atoms.length > 0) {
        const centerAtom = atoms[Math.floor(atoms.length / 2)];
        highlightShapeRef.current = viewer.addSphere({
          center: { x: centerAtom.x, y: centerAtom.y, z: centerAtom.z },
          radius: 2.2,
          color: '#ef4444',
          opacity: 0.5,
        });

        // Smoothly zoom in and center
        viewer.center({ resi: activeFocusResidue });
        viewer.zoom(1.6, 600);
      }
      viewer.render();
    } catch (err) {
      console.warn('Failed to center on residue:', err);
    }
  }, [activeFocusResidue]);

  // Reset Camera
  const handleResetCamera = () => {
    if (viewerRef.current) {
      viewerRef.current.zoomTo(1000);
      viewerRef.current.render();
    }
  };

  // Export Screenshot
  const handleExportScreenshot = () => {
    if (!viewerRef.current) return;
    try {
      const uri = viewerRef.current.pngURI();
      const link = document.createElement('a');
      link.download = `${target.symbol}_${target.pdbId || target.uniprotId}_3D_Structure.png`;
      link.href = uri;
      link.click();
    } catch (e) {
      console.error('Screenshot export error:', e);
    }
  };

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      containerRef.current.parentElement?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-md">
      {/* Top Floating Overlay Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Status & Provenance Badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 shadow-md flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-200">
              {target.symbol}
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
              {target.pdbId ? `PDB: ${target.pdbId}` : `UniProt: ${target.uniprotId}`}
            </span>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-700/80 text-[11px] font-medium text-slate-300">
            {target.provenance === 'experimental' ? (
              <span className="text-sky-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Experimental ({target.method} {target.resolution})
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                AlphaFold v4/v6 Predicted
              </span>
            )}
          </div>
        </div>

        {/* Viewport Control Tools */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-lg border border-slate-700/80 pointer-events-auto shadow-md">
          <button
            onClick={() => setControls(c => ({ ...c, spinning: !c.spinning }))}
            className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
              controls.spinning
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title={controls.spinning ? 'Stop Rotation' : 'Auto Rotate'}
          >
            {controls.spinning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handleResetCamera}
            className="p-1.5 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            title="Reset Camera View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportScreenshot}
            className="p-1.5 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            title="Export High-Res PNG"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowControlPanel(!showControlPanel)}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              showControlPanel
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title="Display Representation & Surface Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide-out Representation Controls Menu */}
      {showControlPanel && (
        <div className="absolute top-14 right-3 z-20 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-3 shadow-2xl text-xs space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-blue-400" /> Molecular Style Settings
            </span>
            <button
              onClick={() => setShowControlPanel(false)}
              className="text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>

          {/* Representation Selector */}
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Model Representation</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(['cartoon', 'stick', 'sphere'] as const).map(rep => (
                <button
                  key={rep}
                  onClick={() => setControls(c => ({ ...c, representation: rep }))}
                  className={`py-1 text-center capitalize rounded text-xs transition-colors ${
                    controls.representation === rep
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {rep}
                </button>
              ))}
            </div>
          </div>

          {/* Color Mode */}
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Color Scheme</label>
            <select
              value={controls.colorMode}
              onChange={e => setControls(c => ({ ...c, colorMode: e.target.value as any }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="plddt">AlphaFold pLDDT Confidence Scale</option>
              <option value="spectrum">Spectrum (N-to-C Rainbow)</option>
              <option value="secondary">Secondary Structure (Helix/Sheet)</option>
              <option value="domains">Functional Domains</option>
              <option value="chain">Chain Identifier</option>
            </select>
          </div>

          {/* Surface Mesh */}
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Solvent / Molecular Surface</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 mb-2">
              {(['none', 'vdw', 'sas'] as const).map(surf => (
                <button
                  key={surf}
                  onClick={() => setControls(c => ({ ...c, surface: surf }))}
                  className={`py-1 text-center uppercase text-xs rounded transition-colors ${
                    controls.surface === surf
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {surf === 'sas' ? 'Solvent (SAS)' : surf === 'vdw' ? 'VDW' : 'None'}
                </button>
              ))}
            </div>

            {controls.surface !== 'none' && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Opacity:</span>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={controls.surfaceOpacity}
                  onChange={e =>
                    setControls(c => ({ ...c, surfaceOpacity: parseFloat(e.target.value) }))
                  }
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[11px] text-slate-300 font-mono">
                  {Math.round(controls.surfaceOpacity * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800">
            <label className="flex items-center justify-between text-slate-300 cursor-pointer">
              <span>Show Ligands & Heteroatoms</span>
              <input
                type="checkbox"
                checked={controls.showLigands}
                onChange={e => setControls(c => ({ ...c, showLigands: e.target.checked }))}
                className="accent-blue-500 rounded"
              />
            </label>
            <label className="flex items-center justify-between text-slate-300 cursor-pointer">
              <span>Display Solvent Water Molecules</span>
              <input
                type="checkbox"
                checked={controls.showWater}
                onChange={e => setControls(c => ({ ...c, showWater: e.target.checked }))}
                className="accent-blue-500 rounded"
              />
            </label>
            <label className="flex items-center justify-between text-slate-300 cursor-pointer">
              <span>Dark WebGL Canvas Theme</span>
              <input
                type="checkbox"
                checked={controls.backgroundTheme === 'dark'}
                onChange={e =>
                  setControls(c => ({
                    ...c,
                    backgroundTheme: e.target.checked ? 'dark' : 'light',
                  }))
                }
                className="accent-blue-500 rounded"
              />
            </label>
          </div>
        </div>
      )}

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="mol-viewer-container w-full h-full relative cursor-grab active:cursor-grabbing"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-200 text-sm font-medium">
            Fetching 3D coordinates & computing molecular topology...
          </p>
          <p className="text-slate-400 text-xs font-mono">
            RCSB PDB / AlphaFold DB Coordinate Stream
          </p>
        </div>
      )}

      {/* Bottom Floating Legend & Picked Atom HUD */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-end justify-between gap-2 pointer-events-none">
        {/* Canonical AlphaFold pLDDT Legend */}
        {controls.colorMode === 'plddt' && (
          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/80 pointer-events-auto shadow-md">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <span>AlphaFold Confidence (pLDDT)</span>
              <Info className="w-3 h-3 text-slate-500" />
            </div>
            <div className="grid grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0053D6]" />
                <span className="text-slate-200">&gt; 90</span>
                <span className="text-slate-500 text-[10px] hidden sm:inline">Very High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#65CBF3]" />
                <span className="text-slate-200">70-90</span>
                <span className="text-slate-500 text-[10px] hidden sm:inline">Confident</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FFDB13]" />
                <span className="text-slate-200">50-70</span>
                <span className="text-slate-500 text-[10px] hidden sm:inline">Low</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FF7D45]" />
                <span className="text-slate-200">&lt; 50</span>
                <span className="text-slate-500 text-[10px] hidden sm:inline">Very Low</span>
              </div>
            </div>
          </div>
        )}

        {/* Picked Atom / Selected Residue HUD */}
        {pickedAtom && (
          <div className="bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-lg border border-blue-500/50 pointer-events-auto shadow-lg text-xs flex items-center gap-3">
            <div>
              <span className="text-[10px] uppercase font-semibold text-blue-400 block">
                Selected Residue
              </span>
              <span className="font-bold text-slate-100 font-mono">
                {pickedAtom.resn} #{pickedAtom.resi}
              </span>
              <span className="text-slate-400 text-[11px] ml-1">
                (Chain {pickedAtom.chain})
              </span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-400 block">pLDDT Score</span>
              <span
                className="font-mono font-bold"
                style={{
                  color:
                    pickedAtom.b > 90
                      ? '#0053D6'
                      : pickedAtom.b > 70
                      ? '#65CBF3'
                      : pickedAtom.b > 50
                      ? '#FFDB13'
                      : '#FF7D45',
                }}
              >
                {pickedAtom.b.toFixed(1)}
              </span>
            </div>
            <button
              onClick={() => setPickedAtom(null)}
              className="text-slate-500 hover:text-slate-300 ml-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
