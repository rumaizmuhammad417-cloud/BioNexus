import React, { useState } from 'react';
import { TargetData } from '../types/science';
import { SHOWCASE_TARGETS } from '../data/showcaseTargets';
import { Search, Dna, Sparkles, Database, ArrowRight } from 'lucide-react';

interface TargetSearchBarProps {
  currentTarget: TargetData;
  onSelectTarget: (target: TargetData) => void;
  onCustomSearch: (query: string) => Promise<void>;
  isSearching: boolean;
}

export const TargetSearchBar: React.FC<TargetSearchBarProps> = ({
  currentTarget,
  onSelectTarget,
  onCustomSearch,
  isSearching
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onCustomSearch(searchInput.trim());
  };

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Quick Showcase Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Showcase Targets:
          </span>
          {SHOWCASE_TARGETS.map(target => {
            const isActive = currentTarget.id === target.id;
            return (
              <button
                key={target.id}
                onClick={() => onSelectTarget(target)}
                className={`px-3 py-1 text-xs rounded-lg font-semibold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                }`}
              >
                {target.symbol}
              </button>
            );
          })}
        </div>

        {/* Global Search Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-1.5 shrink-0">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Query PDB ID, UniProt, or Gene (e.g. 7KRR, P00520)..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button
            type="submit"
            disabled={isSearching || !searchInput.trim()}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            {isSearching ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};
