import React, { useState } from 'react';
import { TargetData, AIDossier } from '../types/science';
import { requestTargetAnalysis } from '../services/aiService';
import {
  Sparkles,
  Shield,
  Layers,
  Crosshair,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface AIDossierTabProps {
  target: TargetData;
}

export const AIDossierTab: React.FC<AIDossierTabProps> = ({ target }) => {
  const [dossier, setDossier] = useState<AIDossier | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDossier = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestTargetAnalysis(target);
      setDossier(result);
    } catch (err: any) {
      setError(err.message || 'Failed to synthesize dossier');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
      {/* Dossier Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
              <Cpu className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Autonomous Structural Biology Intelligence Dossier
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Synthesized biophysical analysis powered by Gemini 3.8 Flash & Deep Science Knowledge Base
          </p>
        </div>

        <button
          onClick={handleGenerateDossier}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          {isLoading ? 'Synthesizing Dossier...' : dossier ? 'Re-Synthesize Dossier' : 'Synthesize Full AI Dossier'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {!dossier && !isLoading && (
        <div className="py-10 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            Ready to Generate Deep Structural Dossier
          </h4>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Click above to synthesize binding pocket topologies, mutational vulnerability hot-spots,
            and emerging therapeutic modalities for {target.symbol} ({target.name}).
          </p>
          <button
            onClick={handleGenerateDossier}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
          >
            Synthesize Dossier Now
          </button>
        </div>
      )}

      {isLoading && (
        <div className="py-12 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-700">
            Querying AlphaFold topology, mutational matrices, and pharmacological libraries...
          </p>
          <span className="text-[11px] text-slate-400 font-mono">
            Gemini 3.8 Flash Autonomous Reasoning
          </span>
        </div>
      )}

      {dossier && !isLoading && (
        <div className="space-y-5 animate-in fade-in">
          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" /> Executive Biophysical Summary
            </h4>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {dossier.executiveSummary}
            </p>
          </div>

          {/* Quaternary & Tertiary Topology */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" /> Structural Topology & Conformational Dynamics
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {dossier.structuralTopology}
            </p>
          </div>

          {/* Binding Pockets & Druggability */}
          {dossier.bindingPockets && dossier.bindingPockets.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2.5 flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-emerald-600" /> Cataloged Binding Pockets & Druggability
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dossier.bindingPockets.map((pocket, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{pocket.pocketName}</span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {pocket.druggabilityScore}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Residues: {pocket.residues}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">{pocket.mechanism}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mutational Hotspots */}
          {dossier.mutationHotspots && dossier.mutationHotspots.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Mutational Vulnerability Hotspots
              </h4>
              <div className="space-y-2">
                {dossier.mutationHotspots.map((hotspot, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-slate-900 mr-2">
                        {hotspot.mutation}
                      </span>
                      <span className="text-slate-600">{hotspot.biophysicalImpact}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      {hotspot.clinicalPhenotype}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next-Gen Modalities */}
          {dossier.therapeuticModalities && dossier.therapeuticModalities.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/60 to-purple-50/60 border border-indigo-100">
              <h4 className="text-xs uppercase font-bold text-indigo-900 tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Next-Generation Therapeutic Modalities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dossier.therapeuticModalities.map((mod, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-white/90 p-2.5 rounded-lg border border-indigo-100/80 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
