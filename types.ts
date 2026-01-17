
export enum Histology {
  PAPILLARY = 'Papillary',
  FOLLICULAR = 'Follicular',
  ONCOCYTIC = 'Oncocytic (Hürthle)',
  AGGRESSIVE = 'Aggressive Variant (Tall Cell, Columnar, etc.)'
}

export enum VascularInvasion {
  NONE = 'None',
  FOCAL = 'Focal (<4 vessels)',
  EXTENSIVE = 'Extensive (≥4 vessels)'
}

export enum ETE {
  NONE = 'None',
  MICROSCOPIC = 'Microscopic',
  GROSS = 'Gross (T3b/T4)'
}

export enum SurgeryType {
  LOBECTOMY = 'Lobectomy',
  TOTAL = 'Total Thyroidectomy',
  COMPLETION = 'Completion Thyroidectomy'
}

export enum MarginStatus {
  R0 = 'R0 (Negative)',
  R1 = 'R1 (Microscopic Positive)',
  R2 = 'R2 (Gross Residual)'
}

export enum RiskCategory {
  VERY_LOW = 'Very Low',
  LOW = 'Low',
  LOW_INTERMEDIATE = 'Low-Intermediate',
  INTERMEDIATE = 'Intermediate',
  HIGH = 'High'
}

export enum ResponseType {
  EXCELLENT = 'Excellent',
  INDETERMINATE = 'Indeterminate',
  BIOCHEMICALLY_INCOMPLETE = 'Biochemically Incomplete',
  STRUCTURALLY_INCOMPLETE = 'Structurally Incomplete'
}

export interface PatientData {
  // Demographics
  age: number;
  sex: 'Male' | 'Female';
  
  // Tumor Pathology
  histology: Histology;
  tumorSizeCm: number;
  multifocality: boolean;
  capsularInvasion: boolean;
  vascularInvasion: VascularInvasion;
  aggressiveSubtype: boolean;
  ete: ETE;
  
  // Lymph Node Status
  nStage: 'N0' | 'N1a' | 'N1b' | 'Nx';
  involvedNodes: number;
  largestNodeCm: number;
  extranodalExtension: boolean;
  
  // Distant Metastasis
  mStage: 'M0' | 'M1';
  metastasisSite: string[];
  raiAvidity: 'Known' | 'Unknown' | 'Negative';

  // Surgery Details
  surgery: SurgeryType;
  lnDissection: 'None' | 'Central' | 'Lateral' | 'Both';
  margins: MarginStatus;
  
  // Post-operative Biochemistry
  suppressedTg: number;
  stimulatedTg?: number;
  tgAb: 'Negative' | 'Positive-Stable' | 'Positive-Rising' | 'Positive-Falling';
  tsh: number;

  // Imaging
  imaging: 'Negative' | 'Indeterminate' | 'Structural';
  raiScan: 'Not Done' | 'Negative' | 'Positive';

  // Radioiodine Therapy
  raiDone: boolean;
  raiIndication: 'None' | 'Ablation' | 'Adjuvant' | 'Therapeutic';
  raiDoseMci: number;

  // Molecular
  molecularMarkers: {
    braf: boolean;
    tert: boolean;
  };
}
