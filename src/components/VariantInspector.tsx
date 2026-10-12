import React, { useState } from 'react';
import { TargetData, ClinicalVariant, MutationPredictionResult } from '../types/science';
import { requestMutationPrediction } from '../services/aiService';
import {
  AlertCircle,
  Eye,
  Sparkles,
  Star,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Flame,
  ShieldAlert
} from 'lucide-react';

interface VariantInspectorProps {
  target: TargetData;
  activeVariant: ClinicalVariant | null;
  onFocusVariant: (variant: ClinicalVariant) => void;
}

const AMINO_ACIDS = [
  { code: 'A', name: 'Ala (Alanine)' },
  { code: 'R', name: 'Arg (Arginine)' },
  { code: 'N', name: 'Asn (Asparagine)' },
  { code: 'D', name: 'Asp (Aspartate)' },
  { code: 'C', name: 'Cys (Cysteine)' },
  { code: 'E', name: 'Glu (Glutamate)' },
  { code: 'Q', name: 'Gln (Glutamine)' },
  { code: 'G', name: 'Gly (Glycine)' },
  { code: 'H', name: 'His (Histidine)' },
  { code: 'I', name: 'Ile (Isoleucine)' },
  { code: 'L', name: 'Leu (Leucine)' },
  { code: 'K', name: 'Lys (Lysine)' },
  { code: 'M', name: 'Met (Methionine)' },
  { code: 'F', name: 'Phe (Phenylalanine)' },
  { code: 'P', name: 'Pro (Proline)' },
  { code: 'S', name: 'Ser (Serine)' },
  { code: 'T', name: 'Thr (Threonine)' },
  { code: 'W', name: 'Trp (Tryptophan)' },
  { code: 'Y', name: 'Tyr (Tyrosine)' },
  { code: 'V', name: 'Val (Valine)' },
];

export const VariantInspector: React.FC<VariantInspectorProps> = ({
  target,
  activeVariant,
  onFocusVariant
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'simulator'>('catalog');

  // Simulator state
  const [simPosition, setSimPosition] = useState<number>(
    target.variants[0]?.position || 175
  );
  const [mutantResidue, setMutantResidue] = useState<string>('H');
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<MutationPredictionResult | null>(null);

  // Wildtype residue at position
  const currentWildType = target.sequence ? target.sequence[simPosition - 1] || 'R' : 'R';

  const handleSimulateMutation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    try {
      const res = await requestMutationPrediction(
        target,
        currentWildType,
        simPosition,
        mutantResidue,
        target.meanPlddt
      );
      setPrediction(res);
    } catch (err) {
      console.error('In silico mutation error:', err);
    } finally {
      setIsPredicting(false);
    }
  };

  const getSigBadgeClass = (sig: string) => {
    switch (sig) {
      case 'Pathogenic':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Likely Pathogenic':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'VUS':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Likely Benign':
      case 'Benign':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Tab Header */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            ClinVar Clinical Variants ({target.variants.length})
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> In Silico Mutagenesis Simulator
          </button>
        </div>
      </div>

      {activeTab === 'catalog' ? (
        /* ClinVar & Hotspot Catalog Table */
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span>Authoritative ClinVar / dbSNP Pathogenicity Records</span>
            <span className="font-mono text-[11px]">Click row to focus 3D camera</span>
          </div>

          <div className="space-y-2.5">
            {target.variants.map(variant => {
              const isSelected = activeVariant?.id === variant.id;
              return (
                <div
                  key={variant.id}
                  onClick={() => onFocusVariant(variant)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-sm ring-1 ring-blue-500'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base text-slate-900">
                        {variant.mutation}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        (Pos {variant.position})
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getSigBadgeClass(
                          variant.clinicalSignificance
                        )}`}
                      >
                        {variant.clinicalSignificance}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Review Stars */}
                      <div
                        className="flex items-center text-amber-400 text-xs"
                        title={`${variant.reviewStars} / 4 ClinVar Review Stars`}
                      >
                        {Array.from({ length: variant.reviewStars }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onFocusVariant(variant);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Fly to 3D
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-slate-700 mb-1">
                    Phenotype: <span className="font-normal">{variant.phenotype}</span>
                  </p>

                  {variant.consequence && (
                    <p className="text-xs text-slate-500 leading-relaxed bg-white p-2 rounded border border-slate-100">
                      <strong className="text-slate-700">Biophysical Consequence: </strong>
                      {variant.consequence}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                    {variant.dbSnpId && (
                      <span className="font-mono text-blue-600 hover:underline">
                        dbSNP: {variant.dbSnpId}
                      </span>
                    )}
                    {variant.clinVarId && (
                      <span className="font-mono text-slate-500">
                        ClinVar: {variant.clinVarId}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* In Silico Mutagenesis Simulator */
        <div className="p-5 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              In Silico Variant Simulator & Biophysical Energetics
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Select any residue position in {target.symbol} and simulate an amino acid
              substitution. AI calculates predicted $\Delta\Delta G$ folding energy changes,
              steric clashes, electrostatic shifts, and ACMG pathogenicity risk.
            </p>

            <form onSubmit={handleSimulateMutation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Position */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Residue Position (1 - {target.sequenceLength})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={target.sequenceLength}
                    value={simPosition}
                    onChange={e => setSimPosition(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Wild-Type (Auto-resolved) */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Wild-Type Residue
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentWildType}
                    className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-slate-700"
                  />
                </div>

                {/* Mutant Amino Acid */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Mutant Substitution
                  </label>
                  <select
                    value={mutantResidue}
                    onChange={e => setMutantResidue(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                  >
                    {AMINO_ACIDS.map(aa => (
                      <option key={aa.code} value={aa.code}>
                        {aa.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono font-semibold text-blue-700">
                  Target Mutation: {currentWildType}{simPosition}{mutantResidue}
                </span>

                <button
                  type="submit"
                  disabled={isPredicting}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-lg shadow disabled:opacity-50 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  {isPredicting ? 'Computing Biophysics...' : 'Simulate Mutation Impact'}
                </button>
              </div>
            </form>
          </div>

          {/* Prediction Output Card */}
          {prediction && (
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-sm text-slate-900 font-mono">
                    {prediction.mutationLabel}
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getSigBadgeClass(
                    prediction.pathogenicity
                  )}`}
                >
                  {prediction.pathogenicity}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Folding Free Energy (&Delta;&Delta;G)
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-800">
                    {prediction.ddgScore}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Steric Clash Risk
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-800">
                    {prediction.stericClashRisk}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Electrostatic Change
                  </span>
                  <span className="font-mono font-bold text-xs text-slate-800">
                    {prediction.electrostaticChange}
                  </span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                <span className="font-semibold text-slate-800 block mb-0.5">
                  Molecular Mechanism:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {prediction.biophysicalMechanism}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                <span className="font-semibold text-slate-800 block mb-0.5">
                  Experimental Validation Recommendations:
                </span>
                <p className="text-slate-600">{prediction.recommendations}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
