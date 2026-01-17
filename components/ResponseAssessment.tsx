
import React from 'react';
import { RiskCategory, PatientData, ResponseType } from '../types';
import { classifyResponse } from '../constants';

interface ResponseAssessmentProps {
  data: PatientData;
  risk: RiskCategory;
  setData: (data: PatientData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ResponseAssessment: React.FC<ResponseAssessmentProps> = ({ data, risk, setData, onNext, onBack }) => {
  const update = (field: keyof PatientData, val: any) => setData({ ...data, [field]: val });
  const response = classifyResponse(data);

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-emerald-600 rounded-full"></div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Longitudinal Response Assessment</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest">Biochemical Monitoring</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Suppressed Tg (ng/mL)</label>
              <input type="number" step="0.01" value={data.suppressedTg} onChange={e => update('suppressedTg', +e.target.value)} className="w-full p-3 border rounded-xl font-bold text-lg" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Tg Antibody Status</label>
              <select value={data.tgAb} onChange={e => update('tgAb', e.target.value)} className="w-full p-3 border rounded-xl font-bold">
                <option value="Negative">Negative</option>
                <option value="Positive-Stable">Positive (Stable)</option>
                <option value="Positive-Rising">Positive (Rising)</option>
                <option value="Positive-Falling">Positive (Falling)</option>
              </select>
            </div>
          </div>

          <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest pt-4 border-t">Imaging Findings</h3>
          <select value={data.imaging} onChange={e => update('imaging', e.target.value)} className="w-full p-3 border rounded-xl font-bold">
            <option value="Negative">Negative (Normal Bed/Nodes)</option>
            <option value="Indeterminate">Indeterminate (Atypical Nodes)</option>
            <option value="Structural">Structural (Recurrence/Persistence)</option>
          </select>
        </div>

        <div className="flex flex-col">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex-grow flex flex-col justify-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Current Response State</span>
            <h4 className={`text-3xl font-black mt-2 leading-tight ${
              response === ResponseType.EXCELLENT ? 'text-emerald-400' : 'text-blue-400'
            }`}>{response}</h4>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              This status overrides the initial risk category for follow-up scheduling. (T-2025-12)
            </p>
            <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
               <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Immediate Implication</p>
               <p className="text-xs italic leading-relaxed">
                 {response === ResponseType.EXCELLENT ? 'Eligible for TSH goal liberalization and imaging de-escalation.' : 'Requires closer surveillance or active intervention.'}
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-100 mt-10">
        <button onClick={onBack} className="px-6 py-3 text-slate-500 font-black uppercase text-xs tracking-widest hover:text-slate-800 transition-colors">
          <i className="fas fa-chevron-left mr-2"></i> Previous
        </button>
        <button onClick={onNext} className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black transition-all shadow-xl">
          Generate Takeaway <i className="fas fa-file-medical ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default ResponseAssessment;
