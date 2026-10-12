import { AIDossier, MutationPredictionResult, DockingHypothesisResult, TargetData } from '../types/science';

export async function requestTargetAnalysis(target: TargetData): Promise<AIDossier> {
  const res = await fetch('/api/analyze-target', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      targetName: target.name,
      uniprotId: target.uniprotId,
      pdbId: target.pdbId,
      sequenceLength: target.sequenceLength,
      plddtAvg: target.meanPlddt,
      summary: target.description,
    }),
  });

  if (!res.ok) {
    throw new Error(`Server returned ${res.status} for target analysis`);
  }

  const payload = await res.json();
  return payload.data;
}

export async function requestMutationPrediction(
  target: TargetData,
  wildTypeResidue: string,
  position: number,
  mutantResidue: string,
  plddtAtSite?: number
): Promise<MutationPredictionResult> {
  const res = await fetch('/api/predict-mutation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      targetName: `${target.symbol} (${target.name})`,
      wildTypeResidue,
      position,
      mutantResidue,
      plddtAtSite,
      structureContext: `${target.domains.find(d => position >= d.start && position <= d.end)?.name || 'Globular core'}`,
    }),
  });

  if (!res.ok) {
    throw new Error(`Server returned ${res.status} for mutation prediction`);
  }

  const payload = await res.json();
  return payload.data;
}

export async function requestDockingHypothesis(
  target: TargetData,
  drugName: string,
  smiles?: string,
  mw?: number
): Promise<DockingHypothesisResult> {
  const res = await fetch('/api/drug-docking-hypothesis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      targetName: `${target.symbol} (${target.name})`,
      drugName,
      smiles,
      mw,
    }),
  });

  if (!res.ok) {
    throw new Error(`Server returned ${res.status} for docking hypothesis`);
  }

  const payload = await res.json();
  return payload.data;
}
