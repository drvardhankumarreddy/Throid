
import { RiskCategory, PatientData, Histology, ETE, VascularInvasion, ResponseType, MarginStatus } from './types';

/**
 * MODULE 1: AJCC 8th Edition Staging (Mortality Prediction)
 */
export const calculateAJCCStage = (p: PatientData): string => {
  if (p.age < 55) {
    return p.mStage === 'M1' ? 'Stage II' : 'Stage I';
  } else {
    if (p.mStage === 'M1') return 'Stage IVB';
    if (p.ete === ETE.GROSS || p.nStage === 'N1b') return 'Stage II';
    return 'Stage I';
  }
};

/**
 * MODULE 2: ATA Initial Risk Stratification (Recurrence Prediction)
 */
export const calculateATARisk = (p: PatientData): RiskCategory => {
  // High Risk
  if (p.mStage === 'M1' || p.ete === ETE.GROSS || p.margins === MarginStatus.R2 || p.molecularMarkers.tert) {
    return RiskCategory.HIGH;
  }
  
  // Intermediate
  if (p.histology === Histology.AGGRESSIVE || 
      p.vascularInvasion === VascularInvasion.EXTENSIVE || 
      p.extranodalExtension || 
      p.involvedNodes > 5 ||
      p.largestNodeCm > 3) {
    return RiskCategory.INTERMEDIATE;
  }

  // Low-Intermediate
  if (p.involvedNodes > 0 && p.involvedNodes <= 5) {
    return RiskCategory.LOW_INTERMEDIATE;
  }
  
  // Very Low (Microcarcinoma)
  if (p.tumorSizeCm <= 1 && p.ete === ETE.NONE && p.nStage === 'N0' && !p.multifocality) {
    return RiskCategory.VERY_LOW;
  }
  
  return RiskCategory.LOW;
};

/**
 * MODULE 3: Surgical Recommendation Engine (Initial Guidance)
 */
export const getSurgeryRecommendation = (p: PatientData) => {
  if (p.tumorSizeCm > 4 || p.ete === ETE.GROSS || p.mStage === 'M1') {
    return {
      procedure: 'Total Thyroidectomy',
      dissection: p.nStage !== 'N0' ? 'Therapeutic Neck Dissection' : 'None (Consider Central for high T stage)',
      rationale: 'R-2025-14: Mandatory for tumors >4cm, gross ETE, or distant metastasis.',
      citation: 'R-2025-14'
    };
  }
  if (p.tumorSizeCm > 1 || p.ete === ETE.MICROSCOPIC || p.multifocality) {
    return {
      procedure: 'Lobectomy OR Total Thyroidectomy',
      dissection: 'None unless nodes clinically positive',
      rationale: 'R-2025-15: Choice depends on TSH suppression goals, RAI consideration, and monitoring ease.',
      citation: 'R-2025-15'
    };
  }
  return {
    procedure: 'Lobectomy or Active Surveillance',
    dissection: 'None',
    rationale: 'R-2025-16: Standard for microcarcinoma (<1cm) in the absence of high-risk clinical features.',
    citation: 'R-2025-16'
  };
};

/**
 * MODULE 4: RAI Decision Engine (Initial Guidance)
 */
export const getRAIRecommendation = (risk: RiskCategory, p: PatientData) => {
  if (risk === RiskCategory.VERY_LOW || risk === RiskCategory.LOW) {
    return { 
      status: 'Not Recommended', 
      purpose: 'None',
      citation: 'R-2025-42', 
      text: 'Remnant ablation does not improve disease-free survival in patients with low risk of recurrence.' 
    };
  }
  if (risk === RiskCategory.HIGH) {
    return { 
      status: 'Strongly Recommended', 
      purpose: 'Adjuvant/Therapeutic',
      citation: 'R-2025-45', 
      text: 'Indicated to reduce recurrence risk, facilitate Tg monitoring, and treat potential residual disease.' 
    };
  }
  return { 
    status: 'Consider Selective Use', 
    purpose: 'Shared Decision',
    citation: 'T-2025-8', 
    text: 'Decision based on post-operative stimulated Tg levels (>5-10 ng/mL) and histological variants.' 
  };
};

/**
 * MODULE 5: Active Surveillance Candidacy
 */
export const getASCandidacy = (p: PatientData) => {
  if (p.age < 18) return { status: 'Inappropriate', reason: 'Pediatric status requires surgery.', citation: 'R-2025-18' };
  if (p.tumorSizeCm > 1.5) return { status: 'Inappropriate', reason: 'Tumor size exceeds safe observation limits.', citation: 'T-2025-2' };
  if (p.ete !== ETE.NONE) return { status: 'Inappropriate', reason: 'ETE is a contraindication for surveillance.', citation: 'R-2025-16' };
  if (p.nStage !== 'N0' && p.nStage !== 'Nx') return { status: 'Inappropriate', reason: 'Regional nodal disease requires surgical resection.', citation: 'R-2025-16' };
  if (p.molecularMarkers.tert) return { status: 'Inappropriate', reason: 'TERT+ profile suggests high risk of rapid progression.', citation: 'R-2025-4' };
  
  if (p.tumorSizeCm <= 1.0 && p.age >= 60) return { status: 'Ideal', reason: 'Elderly patients with microcarcinoma show extremely low progression rates.', citation: 'F-2025-4' };

  return { status: 'Appropriate with Shared Decision', reason: 'Meets primary criteria for observation; requires committed lifelong follow-up.', citation: 'R-2025-16' };
};

/**
 * MODULE 6: Response Classification (Analysis)
 */
export const classifyResponse = (p: PatientData): ResponseType => {
  if (p.imaging === 'Structural') return ResponseType.STRUCTURALLY_INCOMPLETE;
  if (p.suppressedTg > 1 || p.tgAb === 'Positive-Rising') return ResponseType.BIOCHEMICALLY_INCOMPLETE;
  if (p.suppressedTg >= 0.2 || p.tgAb === 'Positive-Stable') return ResponseType.INDETERMINATE;
  return ResponseType.EXCELLENT;
};

/**
 * MODULE 7: Long-term Monitoring Schedule
 */
export const getMonitoringSchedule = (response: ResponseType) => {
  switch(response) {
    case ResponseType.EXCELLENT:
      return { labs: 'Every 12-24 months', imaging: 'None or every 3-5 years', citation: 'R-2025-61' };
    case ResponseType.INDETERMINATE:
      return { labs: 'Every 6-12 months', imaging: 'Every 12-24 months', citation: 'R-2025-65' };
    case ResponseType.BIOCHEMICALLY_INCOMPLETE:
      return { labs: 'Every 3-6 months', imaging: 'Every 6-12 months', citation: 'R-2025-70' };
    default:
      return { labs: 'Intensive Monitoring', imaging: 'Frequent (3-6 months)', citation: 'R-2025-74' };
  }
};
