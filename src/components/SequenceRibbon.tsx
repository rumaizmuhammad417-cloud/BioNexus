import React, { useRef, useState } from 'react';
import { TargetData } from '../types/science';
import { Search, ChevronLeft, ChevronRight, Zap, AlertCircle } from 'lucide-react';

interface SequenceRibbonProps {
  target: TargetData;
  activeResidueIndex: number | null;
  onSelectResidue: (residueIndex: number) => void;
}

export const SequenceRibbon: React.FC<SequenceRibbonProps> = ({
  target,
  activeResidueIndex,
  onSelectResidue
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [jumpInput, setJumpInput] = useState('');

  const sequence = target.sequence || '';
  const residues = sequence.split('');

  // Map known variants and active sites to residue positions
  const variantMap = new Map(target.variants.map(v => [v.position, v]));
  const activeSiteMap = new Map(target.activeSites.map(s => [s.position, s]));

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -350 : 350;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pos = parseInt(jumpInput, 10);
    if (!isNaN(pos) && pos >= 1 && pos <= sequence.length) {
      onSelectResidue(pos);
      // Center in ribbon
      if (scrollContainerRef.current) {
        const tileWidth = 28;
        scrollContainerRef.current.scrollTo({
          left: (pos - 5) * tileWidth,
          behavior: 'smooth',
        });
      }
      setJumpInput('');
    }
  };

  // Get color for residue tile based on approximate domain or pLDDT
  const getTilePlddtColor = (index: number) => {
    // Check if active site
    if (activeSiteMap.has(index)) return 'border-amber-400 bg-amber-50 text-amber-900';
    // Check if hotspot variant
    if (variantMap.has(index)) return 'border-red-400 bg-red-50 text-red-900 font-bold';
    return 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:border-blue-300';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      {/* Top Controls: Title, Domain Legend, Jump To Number */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Primary Sequence Ribbon
          </h4>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {sequence.length} Amino Acids
          </span>
        </div>

        {/* Jump to Residue Form */}
        <div className="flex items-center gap-2">
          <form onSubmit={handleJump} className="flex items-center gap-1">
            <div className="relative">
              <input
                type="number"
                min="1"
                max={sequence.length}
                placeholder="Jump #..."
                value={jumpInput}
                onChange={e => setJumpInput(e.target.value)}
                className="w-24 pl-6 pr-2 py-1 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-1.5 top-2" />
            </div>
            <button
              type="submit"
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Go
            </button>
          </form>

          <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Domain Color Bar Strip */}
      {target.domains.length > 0 && (
        <div className="mb-2">
          <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-100 mb-1.5">
            {target.domains.map(dom => {
              const span = dom.end - dom.start + 1;
              const pct = (span / sequence.length) * 100;
              return (
                <div
                  key={dom.id}
                  style={{ width: `${pct}%`, backgroundColor: dom.color }}
                  className="h-full cursor-pointer hover:opacity-80 transition-opacity"
                  title={`${dom.name} (${dom.start}-${dom.end})`}
                  onClick={() => onSelectResidue(dom.start)}
                />
              );
            })}
          </div>

          {/* Domain Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {target.domains.map(dom => (
              <button
                key={dom.id}
                onClick={() => onSelectResidue(dom.start)}
                className="flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: dom.color }}
                />
                <span className="font-medium">{dom.name}</span>
                <span className="text-slate-400 font-mono text-[10px]">
                  ({dom.start}-{dom.end})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal Sequence Ribbon Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto py-2 flex items-center gap-1 scroll-smooth select-none"
      >
        {residues.map((aa, idx) => {
          const pos = idx + 1;
          const isSelected = activeResidueIndex === pos;
          const variant = variantMap.get(pos);
          const activeSite = activeSiteMap.get(pos);

          return (
            <button
              key={pos}
              onClick={() => onSelectResidue(pos)}
              className={`flex flex-col items-center justify-center min-w-[28px] h-12 rounded border text-xs transition-all relative cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300 ring-offset-1 font-bold z-10 scale-105'
                  : getTilePlddtColor(pos)
              }`}
              title={`Residue #${pos} (${aa})${
                variant ? ` - Mutation ${variant.mutation}` : ''
              }${activeSite ? ` - ${activeSite.role} Active Site` : ''}`}
            >
              {/* Upper indicator icon if hotspot or active site */}
              {variant && (
                <span className="absolute -top-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
              {activeSite && !variant && (
                <span className="absolute -top-1 w-2 h-2 rounded-full bg-amber-500" />
              )}

              <span className="text-[9px] font-mono opacity-60 leading-none">
                {pos % 5 === 0 || pos === 1 ? pos : ''}
              </span>
              <span className="font-mono text-sm leading-tight font-bold">{aa}</span>
            </button>
          );
        })}
      </div>

      {/* Legend below ribbon */}
      <div className="flex items-center gap-4 mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-red-500" />
          <span>Hotspot Clinical Mutation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-amber-400" />
          <span>Catalytic / Binding Site</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-blue-600" />
          <span>Selected in 3D Viewport</span>
        </div>
      </div>
    </div>
  );
};
