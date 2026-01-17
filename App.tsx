
import React, { useState } from 'react';
import { PatientData, Histology, VascularInvasion, ETE, SurgeryType, MarginStatus } from './types';
import InitialDiagnosis from './components/InitialDiagnosis';
import RiskAssessment from './components/RiskAssessment';
import TreatmentDecision from './components/TreatmentDecision';
import ResponseAssessment from './components/ResponseAssessment';
import FinalTakeaway from './components/FinalTakeaway';
import StepIndicator from './components/StepIndicator';
import { calculateATARisk, classifyResponse } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PatientData>({
    age: 45,
    sex: 'Female',
    histology: Histology.PAPILLARY,
    tumorSizeCm: 1.5,
    multifocality: false,
    capsularInvasion: false,
    vascularInvasion: VascularInvasion.NONE,
    aggressiveSubtype: false,
    ete: ETE.NONE,
    nStage: 'N0',
    involvedNodes: 0,
    largestNodeCm: 0,
    extranodalExtension: false,
    mStage: 'M0',
    metastasisSite: [],
    raiAvidity: 'Unknown',
    surgery: SurgeryType.TOTAL,
    lnDissection: 'None',
    margins: MarginStatus.R0,
    suppressedTg: 0.1,
    tsh: 1.5,
    tgAb: 'Negative',
    imaging: 'Negative',
    raiScan: 'Not Done',
    raiDone: false,
    raiIndication: 'None',
    raiDoseMci: 0,
    molecularMarkers: {
      braf: false,
      tert: false
    }
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const currentRisk = calculateATARisk(data);
  const currentResponse = classifyResponse(data);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100">
      <header className="bg-white border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <i className="fas fa-shield-virus"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter">ThyroidDATA 2025</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ATA Management Navigator</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase">Risk Category</p>
            <p className="text-xs font-bold text-indigo-600">{currentRisk}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase">Response</p>
            <p className="text-xs font-bold text-blue-600">{currentResponse}</p>
          </div>
          <div className="bg-indigo-50 px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 border border-indigo-100">
            ATA-2025 VERIFIED
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full p-4 md:p-8">
        <div className="mb-8">
          <StepIndicator currentStep={step} />
        </div>
        
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {step === 1 && <InitialDiagnosis data={data} setData={setData} onNext={handleNext} />}
          {step === 2 && <RiskAssessment data={data} risk={currentRisk} onNext={handleNext} onBack={handleBack} />}
          {step === 3 && <TreatmentDecision data={data} risk={currentRisk} onNext={handleNext} onBack={handleBack} />}
          {step === 4 && <ResponseAssessment data={data} risk={currentRisk} onNext={handleNext} onBack={handleBack} setData={setData} />}
          {step === 5 && <FinalTakeaway data={data} onReset={() => setStep(1)} />}
        </div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
          Operated as a deterministic clinical pathway engine • v3.1.0
        </p>
      </footer>
    </div>
  );
};

export default App;
