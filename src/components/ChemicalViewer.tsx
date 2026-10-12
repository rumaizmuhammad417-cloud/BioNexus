import React, { useEffect, useRef, useState } from 'react';
import SmilesDrawer from 'smiles-drawer';
import { DrugInfo, DockingHypothesisResult, TargetData } from '../types/science';
import { requestDockingHypothesis } from '../services/aiService';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, ExternalLink, Dna, Activity } from 'lucide-react';

interface ChemicalViewerProps {
  drugs: DrugInfo[];
  target: TargetData;
  selectedDrug: DrugInfo | null;
  onSelectDrug: (drug: DrugInfo) => void;
}

export const ChemicalViewer: React.FC<ChemicalViewerProps> = ({
  drugs,
  target,
  selectedDrug,
  onSelectDrug
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const active = selectedDrug || drugs[0];

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dockingHypothesis, setDockingHypothesis] = useState<DockingHypothesisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'druggability' | 'docking'>('druggability');

  // Draw 2D chemical structure using smiles-drawer
  useEffect(() => {
    if (!canvasRef.current || !active?.smiles) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    try {
      const options = {
        width: 320,
        height: 240,
        bondThickness: 1.6,
        bondLength: 16,
        themes: {
          light: {
            C: '#0f172a',
            O: '#dc2626',
            N: '#2563eb',
            S: '#d97706',
            P: '#ea580c',
            Cl: '#16a34a',
            F: '#059669',
            Br: '#9333ea',
            BACKGROUND: 'transparent'
          }
        }
      };

      // Handle SmilesDrawer constructor depending on bundle export format
      const DrawerClass = (SmilesDrawer as any).Drawer || SmilesDrawer;
      const drawer = new DrawerClass(options);

      (SmilesDrawer as any).parse(
        active.smiles,
        (tree: any) => {
          drawer.draw(tree, canvas, 'light', false);
        },
        (err: any) => {
          console.warn('SmilesDrawer parse warning:', err);
        }
      );
    } catch (e) {
      console.warn('SmilesDrawer error:', e);
    }
  }, [active]);

  // Compute Lipinski Rule of 5 and Veber rules
  const mw = active?.molecularWeight ?? 400;
  const xlogp = active?.xLogP ?? 2.5;
  const hbd = active?.hbd ?? 2;
  const hba = active?.hba ?? 5;
  const rotBonds = active?.rotatableBonds ?? 4;
  const tpsa = active?.tpsa ?? 70;

  const violations = [
    mw > 500 ? 'MW > 500 Da' : null,
    xlogp > 5 ? 'LogP > 5' : null,
    hbd > 5 ? 'HBD > 5' : null,
    hba > 10 ? 'HBA > 10' : null,
  ].filter(Boolean) as string[];

  const passesLipinski = violations.length <= 1;
  const passesVeber = rotBonds <= 10 && tpsa <= 140;

  const handleGenerateDocking = async () => {
    if (!active) return;
    setIsAnalyzing(true);
    setActiveTab('docking');
    try {
      const res = await requestDockingHypothesis(
        target,
        active.name,
        active.smiles,
        active.molecularWeight
      );
      setDockingHypothesis(res);
    } catch (err) {
      console.error('Docking generation error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!active) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        No small-molecule therapeutics cataloged for this target yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Top Selector Ribbon */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Therapeutic Agents:
          </span>
          <div className="flex items-center gap-1.5">
            {drugs.map(drug => (
              <button
                key={drug.name}
                onClick={() => {
                  onSelectDrug(drug);
                  setDockingHypothesis(null);
                }}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                  active.name === drug.name
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {drug.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            Phase {active.maxPhase} {active.maxPhase === 4 ? '(FDA Approved)' : ''}
          </span>
        </div>
      </div>

      {/* Main Grid: 2D Chemical Canvas + Physicochemical Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5">
        {/* Left: 2D Chemical Structure Diagram */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 relative min-h-[260px]">
          <canvas
            ref={canvasRef}
            width={320}
            height={240}
            className="max-w-full h-auto"
          />

          {/* PubChem fallback image if smiles-drawer doesn't draw */}
          {active.pubchemCid && (
            <img
              src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${active.pubchemCid}/PNG?image_size=240x240`}
              alt={active.name}
              className="absolute inset-0 m-auto max-h-[220px] pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
              title="Official PubChem 2D Depiction"
            />
          )}

          <div className="w-full mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono text-[11px] font-medium text-slate-700">
              Formula: {active.molecularFormula}
            </span>
            {active.pubchemCid && (
              <a
                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${active.pubchemCid}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-[11px]"
              >
                PubChem CID {active.pubchemCid} <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Right: Compound Overview & Druggability Assessment */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{active.name}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {active.indication}
                </p>
              </div>
              <button
                onClick={handleGenerateDocking}
                disabled={isAnalyzing}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAnalyzing ? 'Analyzing Docking...' : 'Docking & Binding Hypothesis'}
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/70 p-3 rounded-lg border border-blue-100 mb-4">
              <strong className="text-blue-900 block mb-0.5">Mechanism of Action (MoA):</strong>
              {active.mechanismOfAction}
            </p>

            {/* Sub-tabs: Druggability / Docking Hypothesis */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
              <button
                onClick={() => setActiveTab('druggability')}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === 'druggability'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Lipinski & Veber Druggability
              </button>
              {dockingHypothesis && (
                <button
                  onClick={() => setActiveTab('docking')}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                    activeTab === 'docking'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" /> AI Pharmacophore & Docking
                </button>
              )}
            </div>

            {activeTab === 'druggability' ? (
              <div>
                {/* Lipinski Rule of 5 and Veber Score Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Molecular Weight
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-800">
                      {mw.toFixed(1)} Da
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Target: &le; 500 Da {mw <= 500 ? '✓' : '⚠️'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Lipophilicity (XLogP)
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-800">
                      {xlogp.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Target: &le; 5.0 {xlogp <= 5.0 ? '✓' : '⚠️'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Polar Surface (TPSA)
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-800">
                      {tpsa.toFixed(1)} Å²
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Veber: &le; 140 Å² {tpsa <= 140 ? '✓' : '⚠️'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      H-Bond Donors (HBD)
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-800">
                      {hbd}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Target: &le; 5 {hbd <= 5 ? '✓' : '⚠️'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      H-Bond Acceptors (HBA)
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-800">
                      {hba}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Target: &le; 10 {hba <= 10 ? '✓' : '⚠️'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Rotatable Bonds
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-800">
                      {rotBonds}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Veber: &le; 10 {rotBonds <= 10 ? '✓' : '⚠️'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    {passesLipinski ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    )}
                    <span className="font-semibold text-slate-800">
                      {passesLipinski
                        ? 'Passes Lipinski\'s Rule of 5 (High Oral Bioavailability)'
                        : `Violates Lipinski (${violations.join(', ')})`}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-slate-500">
                    Veber Score: {passesVeber ? 'Optimal' : 'Sub-optimal'}
                  </span>
                </div>
              </div>
            ) : (
              /* Docking Hypothesis Tab */
              dockingHypothesis && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-100 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-indigo-950">Predicted Affinity:</span>
                      <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                        {dockingHypothesis.predictedAffinity}
                      </span>
                    </div>
                    <p className="text-indigo-900 leading-relaxed">
                      {dockingHypothesis.pharmacophoreRationale}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-500 block mb-1.5">
                      Key Residue Contacts & Interactions:
                    </span>
                    <div className="space-y-1.5">
                      {dockingHypothesis.keyInteractions.map((inter, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200 text-xs font-mono"
                        >
                          <span className="text-slate-800 font-semibold">{inter.targetResidue}</span>
                          <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[11px]">
                            {inter.type}
                          </span>
                          <span className="text-slate-500 text-[11px]">{inter.atomGroup}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-800 block mb-0.5">
                      Lead Optimization Angle:
                    </span>
                    <span className="text-slate-600">
                      {dockingHypothesis.structureActivityOptimization}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
