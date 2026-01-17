
import React from 'react';
import { RiskCategory, PatientData, MarginStatus } from '../types';
import { getRAIRecommendation, getSurgeryRecommendation, getASCandidacy } from '../constants';

interface TreatmentDecisionProps {
  risk: RiskCategory;
  data: PatientData;
  onNext: () => void;
  onBack: () => void;
}

const TreatmentDecision: React.FC<TreatmentDecisionProps> = ({ risk, data, onNext, onBack }) => {
  const rai = getRAIRecommendation(risk, data);
  const surg = getSurgeryRecommendation(data);
  const as = getASCandidacy(data);

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Initial Management Plan</h2>
          <p className="text-slate-500 text-xs italic font-medium">Guidance generated prior to follow-up analysis.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Surgical Plan */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-10 text-4xl group-hover:scale-110 transition-transform">
              <i className="fas fa-scalpel text-blue-600"></i>
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Surgical Strategy</h3>
              <span className="bg-slate-100 px-2 py-0.5 rounded border text-[9px] font-black">{surg.citation}</span>
            </div>
            <p className="text-lg font-black text-slate-900 mb-1 leading-tight">{surg.procedure}</p>
            <p className="text-xs text-slate-500 font-bold mb-3 flex items-center gap-2">
              <i className="fas fa-network-wired text-[10px]"></i> Nodes: {surg.dissection}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed italic border-t pt-3 mt-3">
              {surg.rationale}
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-3xl border border-blue-200 relative group">
            <div className="absolute top-0 right-0 p-3 opacity-10 text-4xl group-hover:scale-110 transition-transform">
              <i className="fas fa-radiation text-blue-600"></i>
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className="text-xs font-black uppercase text-blue-400 tracking-widest">Radioactive Iodine (RAI)</h3>
              <span className="bg-white px-2 py-0.5 rounded border border-blue-200 text-[9px] font-black">{rai.citation}</span>
            </div>
            <p className="text-lg font-black text-blue-900 mb-1">{rai.status}</p>
            <p className="text-xs text-blue-500 font-bold mb-2">Purpose: {rai.purpose}</p>
            <p className="text-xs text-blue-700 leading-relaxed">{rai.text}</p>
          </div>
        </div>

        {/* AS and TSH Goals */}
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border transition-all ${
            as.status === 'Ideal' ? 'bg-emerald-50 border-emerald-200' : 
            as.status.includes('Appropriate') ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-200'
          }`}>
             <div className="flex justify-between items-start mb-4">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Active Surveillance</h3>
              <span className="bg-white px-2 py-0.5 rounded border text-[9px] font-black">{as.citation}</span>
            </div>
            <p className={`text-lg font-black mb-1 ${
              as.status === 'Inappropriate' ? 'text-red-600' : 'text-slate-900'
            }`}>{as.status}</p>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">{as.reason}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
             <div className="flex justify-between items-start mb-4">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest">TSH Suppression Goal</h3>
              <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20 text-[9px] font-black">R-2025-58</span>
            </div>
            <p className="text-2xl font-black mb-1">
              {risk === RiskCategory.HIGH ? '< 0.1 mIU/L' : '0.5 – 2.0 mIU/L'}
            </p>
            <p className="text-xs opacity-60 italic leading-relaxed mt-2">
              Determined by your {risk} risk classification. Re-assessment required post-surgery.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-100 mt-10">
        <button onClick={onBack} className="px-6 py-3 text-slate-500 font-black uppercase text-xs tracking-widest hover:text-slate-800 transition-colors">
          <i className="fas fa-chevron-left mr-2"></i> Back
        </button>
        <button onClick={onNext} className="px-10 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black transition-all shadow-xl uppercase text-xs tracking-[0.2em]">
          Move to Response Assessment <i className="fas fa-chevron-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default TreatmentDecision;
