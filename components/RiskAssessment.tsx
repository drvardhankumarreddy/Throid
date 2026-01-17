
import React from 'react';
import { RiskCategory, PatientData, ETE } from '../types';
import { calculateAJCCStage } from '../constants';

interface RiskAssessmentProps {
  risk: RiskCategory;
  data: PatientData;
  onNext: () => void;
  onBack: () => void;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ risk, data, onNext, onBack }) => {
  const ajcc = calculateAJCCStage(data);

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Staging & Risk Stratification</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">AJCC 8th Edition (Mortality)</span>
            <h3 className="text-5xl font-black mt-2 mb-4 tracking-tighter">{ajcc}</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Predicted mortality based on Age ({data.age}y), TNM status, and metastasis. (F-2025-2)
            </p>
          </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-indigo-600 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">ATA Initial Risk (Recurrence)</span>
            <h3 className="text-5xl font-black mt-2 mb-4 tracking-tighter">{risk}</h3>
            <p className="text-indigo-200 text-xs leading-relaxed max-w-sm">
              Categorized for recurrence probability based on pathology findings. (T-2025-4)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Risk Criteria Impact</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase">Molecular</p>
            <p className="text-xs font-bold text-slate-800">{data.molecularMarkers.tert ? '⚠️ TERT+' : 'Standard'}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase">Histology</p>
            <p className="text-xs font-bold text-slate-800">{data.aggressiveSubtype ? 'Aggressive' : 'Favorable'}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase">Margins</p>
            <p className="text-xs font-bold text-slate-800">{data.margins}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase">Extension</p>
            <p className="text-xs font-bold text-slate-800">{data.ete}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-100 mt-10">
        <button onClick={onBack} className="px-6 py-3 text-slate-500 font-black uppercase text-xs tracking-widest hover:text-slate-800 transition-colors">
          <i className="fas fa-chevron-left mr-2"></i> Back
        </button>
        <button onClick={onNext} className="px-10 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black transition-all shadow-xl">
          Clinical Guidance <i className="fas fa-chevron-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default RiskAssessment;
