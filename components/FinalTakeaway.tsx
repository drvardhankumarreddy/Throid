
import React from 'react';
import { PatientData, RiskCategory, ResponseType, MarginStatus } from '../types';
import { 
  calculateAJCCStage, 
  calculateATARisk, 
  getRAIRecommendation, 
  classifyResponse, 
  getMonitoringSchedule,
  getSurgeryRecommendation,
  getASCandidacy
} from '../constants';

interface FinalTakeawayProps {
  data: PatientData;
  onReset: () => void;
}

const FinalTakeaway: React.FC<FinalTakeawayProps> = ({ data, onReset }) => {
  const ajcc = calculateAJCCStage(data);
  const ataRisk = calculateATARisk(data);
  const rai = getRAIRecommendation(ataRisk, data);
  const response = classifyResponse(data);
  const schedule = getMonitoringSchedule(response);
  const surg = getSurgeryRecommendation(data);
  const as = getASCandidacy(data);

  return (
    <div className="p-8 bg-white print:p-0">
      <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-slate-100">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Clinical Management Report</h2>
          <p className="text-slate-400 text-xs font-bold tracking-widest mt-1">ATA-2025 DETERMINISTIC CLINICAL PATHWAY</p>
        </div>
        <button onClick={() => window.print()} className="bg-slate-100 p-3 rounded-xl hover:bg-white border border-slate-200 print:hidden transition-all shadow-sm">
          <i className="fas fa-print mr-2"></i> Download PDF
        </button>
      </div>

      {/* Primary Highlights */}
      <section className="mb-10">
        <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
          <div className="w-2 h-4 bg-indigo-600 rounded-full"></div>
          1. Risk & Staging Summary
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-slate-900 text-white p-5 rounded-3xl">
            <p className="text-[9px] font-black uppercase text-slate-500 mb-1">AJCC 8th Stage</p>
            <p className="text-2xl font-black">{ajcc}</p>
          </div>
          <div className="bg-indigo-600 text-white p-5 rounded-3xl">
            <p className="text-[9px] font-black uppercase text-indigo-300 mb-1">ATA Initial Risk</p>
            <p className="text-2xl font-black">{ataRisk}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl">
            <p className="text-[9px] font-black uppercase text-emerald-400 mb-1">Current Response</p>
            <p className="text-2xl font-black text-emerald-900">{response}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl">
            <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Molecular Status</p>
            <p className="text-xs font-bold text-slate-800">
              {data.molecularMarkers.tert ? 'TERT+ (High)' : (data.molecularMarkers.braf ? 'BRAF+' : 'Negative')}
            </p>
          </div>
        </div>
      </section>

      {/* Initial Guidance Summary */}
      <section className="mb-10">
        <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
          <div className="w-2 h-4 bg-indigo-600 rounded-full"></div>
          2. Initial Management Strategy (Guidance)
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
            <div className="flex justify-between mb-3">
              <p className="text-[10px] font-black uppercase text-slate-400">Surgery Recommendation</p>
              <span className="text-[9px] font-black text-slate-400">{surg.citation}</span>
            </div>
            <p className="text-sm font-bold text-slate-800 mb-1">{surg.procedure}</p>
            <p className="text-xs text-slate-500 mb-2 font-bold">{surg.dissection}</p>
            <p className="text-xs text-slate-600 italic leading-relaxed border-t pt-2">{surg.rationale}</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
            <div className="flex justify-between mb-3">
              <p className="text-[10px] font-black uppercase text-slate-400">RAI Recommendation</p>
              <span className="text-[9px] font-black text-slate-400">{rai.citation}</span>
            </div>
            <p className="text-sm font-bold text-slate-800 mb-1">{rai.status}</p>
            <p className="text-xs text-slate-500 mb-2 font-bold">Purpose: {rai.purpose}</p>
            <p className="text-xs text-slate-600 italic leading-relaxed border-t pt-2">{rai.text}</p>
          </div>
        </div>
      </section>

      {/* Analysis and Follow-up */}
      <section className="mb-10">
        <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
          <div className="w-2 h-4 bg-indigo-600 rounded-full"></div>
          3. Dynamic Re-stratification & Follow-up
        </h3>
        <div className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden shadow-sm">
           <table className="w-full text-left">
             <thead className="bg-slate-50">
               <tr>
                 <th className="p-4 text-[10px] font-black uppercase text-slate-400">Monitoring Type</th>
                 <th className="p-4 text-[10px] font-black uppercase text-slate-400">ATA-2025 Frequency</th>
                 <th className="p-4 text-[10px] font-black uppercase text-slate-400">Guideline Citation</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               <tr>
                 <td className="p-4 text-xs font-bold text-slate-700">Biochemical Labs (Tg/TgAb)</td>
                 <td className="p-4 text-xs font-black text-indigo-600">{schedule.labs}</td>
                 <td className="p-4 text-[10px] text-slate-400 font-bold">{schedule.citation}</td>
               </tr>
               <tr>
                 <td className="p-4 text-xs font-bold text-slate-700">Imaging (Neck Ultrasound)</td>
                 <td className="p-4 text-xs font-black text-indigo-600">{schedule.imaging}</td>
                 <td className="p-4 text-[10px] text-slate-400 font-bold">{schedule.citation}</td>
               </tr>
               <tr>
                 <td className="p-4 text-xs font-bold text-slate-700">TSH Maintenance Target</td>
                 <td className="p-4 text-xs font-black text-indigo-600">
                   {response === ResponseType.EXCELLENT ? '0.5 – 2.0 mIU/L' : '< 0.1 mIU/L'}
                 </td>
                 <td className="p-4 text-[10px] text-slate-400 font-bold">R-2025-58</td>
               </tr>
             </tbody>
           </table>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
          <div className="w-2 h-4 bg-indigo-600 rounded-full"></div>
          4. IF-THEN Clinical Analysis
        </h3>
        <div className="space-y-4">
          <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
            <p className="text-[11px] text-indigo-900 leading-relaxed">
              <strong>IF</strong> Suppressed Tg remains &lt; 0.2 ng/mL AND Ultrasound is Negative for 2 years 
              &rarr; <strong>ACTION:</strong> De-escalate surveillance to annual biochemical monitoring only (R-2025-61).
            </p>
          </div>
          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-[11px] text-amber-900 leading-relaxed">
              <strong>IF</strong> Tg shows rising trend OR TgAb converts to Positive-Rising 
              &rarr; <strong>ACTION:</strong> Perform structural restaging via diagnostic RAI scan or cross-sectional imaging (R-2025-70).
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 pt-8 border-t flex flex-col items-center gap-4 print:hidden">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Guideline logic auditable via ATA-2025 Master Publication</p>
        <button onClick={onReset} className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
          New Patient Assessment
        </button>
      </div>
    </div>
  );
};

export default FinalTakeaway;
