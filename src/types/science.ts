export type StructureProvenance = 'experimental' | 'alphafold';

export interface DomainAnnotation {
  id: string;
  name: string;
  start: number;
  end: number;
  color: string;
  database: 'Pfam' | 'InterPro' | 'UniProt';
  description?: string;
}

export interface ActiveSiteResidue {
  position: number;
  code: string;
  role: 'Catalytic' | 'Binding' | 'Zinc Finger' | 'Hinge' | 'Gatekeeper';
  description: string;
}

export interface ClinicalVariant {
  id: string;
  mutation: string; // e.g. "R175H"
  position: number;
  wildType: string;
  mutant: string;
  clinicalSignificance: 'Pathogenic' | 'Likely Pathogenic' | 'VUS' | 'Likely Benign' | 'Benign';
  reviewStars: number;
  phenotype: string;
  dbSnpId?: string;
  clinVarId?: string;
  alleleFrequency?: string;
  consequence?: string;
}

export interface DrugInfo {
  name: string;
  brandName?: string;
  chemblId?: string;
  pubchemCid?: number;
  smiles: string;
  molecularFormula: string;
  molecularWeight: number;
  maxPhase: number; // 4 = approved
  mechanismOfAction: string;
  indication: string;
  xLogP?: number;
  tpsa?: number;
  hbd?: number;
  hba?: number;
  rotatableBonds?: number;
}

export interface ChemblActivity {
  moleculeChemblId: string;
  moleculeName: string;
  standardType: 'IC50' | 'Ki' | 'Kd' | 'EC50' | '% Inhibition';
  standardValue: number;
  standardUnits: string;
  pChemblValue?: number;
  targetChemblId: string;
}

export interface TargetData {
  id: string;
  symbol: string;
  name: string;
  organism: string;
  uniprotId: string;
  pdbId: string;
  provenance: StructureProvenance;
  resolution?: string;
  method?: string;
  meanPlddt: number;
  sequenceLength: number;
  sequence: string;
  description: string;
  biologicalFunction: string;
  domains: DomainAnnotation[];
  activeSites: ActiveSiteResidue[];
  variants: ClinicalVariant[];
  drugs: DrugInfo[];
  chemblActivities: ChemblActivity[];
  cifUrl?: string;
  pdbUrl?: string;
  paeDocUrl?: string;
}

export interface ResidueInfo {
  index: number;
  code: string;
  fullName: string;
  plddt: number;
  secondaryStructure?: 'helix' | 'sheet' | 'loop';
  domainName?: string;
  isHotspot?: boolean;
  isActiveSite?: boolean;
  activeSiteRole?: string;
  variantCount?: number;
}

export interface AIDossier {
  executiveSummary: string;
  structuralTopology: string;
  bindingPockets: Array<{
    pocketName: string;
    residues: string;
    druggabilityScore: string;
    mechanism: string;
  }>;
  mutationHotspots?: Array<{
    mutation: string;
    biophysicalImpact: string;
    clinicalPhenotype: string;
  }>;
  therapeuticModalities: string[];
  plddtAssessment?: string;
}

export interface MutationPredictionResult {
  mutationLabel: string;
  ddgScore: string;
  pathogenicity: string;
  stericClashRisk: string;
  electrostaticChange: string;
  biophysicalMechanism: string;
  recommendations: string;
}

export interface DockingHypothesisResult {
  target: string;
  compound: string;
  predictedAffinity: string;
  keyInteractions: Array<{
    type: string;
    targetResidue: string;
    atomGroup: string;
  }>;
  pharmacophoreRationale: string;
  structureActivityOptimization: string;
}

export interface ViewerControls {
  representation: 'cartoon' | 'stick' | 'sphere';
  colorMode: 'plddt' | 'spectrum' | 'chain' | 'secondary' | 'domains';
  surface: 'none' | 'vdw' | 'sas';
  surfaceOpacity: number;
  spinning: boolean;
  spinSpeed: number;
  showLigands: boolean;
  showWater: boolean;
  backgroundTheme: 'dark' | 'light';
}
