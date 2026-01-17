
import React from 'react';
import { PatientData, Histology, ETE, VascularInvasion, SurgeryType, MarginStatus } from '../types';

interface InitialDiagnosisProps {
  data: PatientData;
  setData: (data: PatientData) => void;
  onNext: () => void;
}

const InitialDiagnosis: React.FC<InitialDiagnosisProps> = ({ data, setData, onNext }) => {
  const update = (field: keyof PatientData, val: any) => setData({ ...data, [field]: val });
  const updateMolecular = (marker: 'braf' | 'tert', val: boolean) => {
    setData({
      ...data,
      molecularMarkers: {
        ...data.molecularMarkers,
        [marker]: val
      }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8 border-b pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Diagnostic Inputs</h2>
          <p className="text-slate-500 text-sm italic">Verification required for AJCC and ATA modules.</p>
        </div>
        <div className="text-[10px] font-bold text-slate-400">PATHOLOGY / NODAL / SURGERY</div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Col 1: Path/Histology */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase text-indigo-600 tracking-widest flex items-center gap-2">
            <i className="fas fa-microscope"></i> Tumor Pathology
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Age</label>
              <input type="number" value={data.age} onChange={e => update('age', +e.target.value)} className="w-full p-2 border rounded-lg font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Histology</label>
              <select value={data.histology} onChange={e => update('histology', e.target.value)} className="w-full p-2 border rounded-lg text-sm font-bold">
                {Object.values(Histology).map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Tumor Size (cm)</label>
              <input type="number" step="0.1" value={data.tumorSizeCm} onChange={e => update('tumorSizeCm', +e.target.value)} className="w-full p-2 border rounded-lg font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Extrathryroidal Extension</label>
              <select value={data.ete} onChange={e => update('ete', e.target.value)} className="w-full p-2 border rounded-lg text-sm">
                {Object.values(ETE).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="flex gap-4">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" checked={data.multifocality} onChange={e => update('multifocality', e.target.checked)} className="w-4 h-4" />
                 <span className="text-[10px] font-bold text-slate-600 uppercase">Multifocal</span>
               </label>
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" checked={data.aggressiveSubtype} onChange={e => update('aggressiveSubtype', e.target.checked)} className="w-4 h-4" />
                 <span className="text-[10px] font-bold text-slate-600 uppercase">Aggressive Var</span>
               </label>
            </div>
          </div>
        </div>

        {/* Col 2: Nodes & Metastasis */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase text-indigo-600 tracking-widest flex items-center gap-2">
            <i className="fas fa-network-wired"></i> Nodal & Metastatic
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">N Stage</label>
              <select value={data.nStage} onChange={e => update('nStage', e.target.value)} className="w-full p-2 border rounded-lg text-sm">
                <option value="N0">N0 (None)</option>
                <option value="N1a">N1a (Central)</option>
                <option value="N1b">N1b (Lateral)</option>
                <option value="Nx">Nx (Unknown)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Node Count</label>
                <input type="number" value={data.involvedNodes} onChange={e => update('involvedNodes', +e.target.value)} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Max Node (cm)</label>
                <input type="number" step="0.1" value={data.largestNodeCm} onChange={e => update('largestNodeCm', +e.target.value)} className="w-full p-2 border rounded-lg" />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={data.extranodalExtension} onChange={e => update('extranodalExtension', e.target.checked)} className="w-4 h-4" />
              <span className="text-[10px] font-bold text-slate-600 uppercase">Extranodal Extension (ENE)</span>
            </label>
            <div className="pt-4 border-t">
              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input type="checkbox" checked={data.mStage === 'M1'} onChange={e => update('mStage', e.target.checked ? 'M1' : 'M0')} className="w-4 h-4" />
                <span className="text-xs font-bold text-red-600 uppercase">Distant Metastasis (M1)</span>
              </label>
              {data.mStage === 'M1' && (
                <div className="text-[10px] font-bold text-red-400 italic">Predicts high recurrence/mortality risk.</div>
              )}
            </div>
          </div>
        </div>

        {/* Col 3: Surgery & Molecular */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase text-indigo-600 tracking-widest flex items-center gap-2">
            <i className="fas fa-hand-holding-medical"></i> Surgical Adequacy
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Surgery Done</label>
              <select value={data.surgery} onChange={e => update('surgery', e.target.value)} className="w-full p-2 border rounded-lg text-sm">
                {Object.values(SurgeryType).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Margins</label>
              <select value={data.margins} onChange={e => update('margins', e.target.value)} className="w-full p-2 border rounded-lg text-sm">
                {Object.values(MarginStatus).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="space-y-2 border-t pt-4">
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Molecular Risk</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={data.molecularMarkers.braf} onChange={e => updateMolecular('braf', e.target.checked)} className="w-4 h-4" />
                <span className="text-xs font-medium">BRAF V600E Mutation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={data.molecularMarkers.tert} onChange={e => updateMolecular('tert', e.target.checked)} className="w-4 h-4" />
                <span className="text-xs font-medium text-red-600">TERT Promoter Mutation</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t flex justify-end">
        <button onClick={onNext} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl">
          Initial Assessment <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default InitialDiagnosis;
