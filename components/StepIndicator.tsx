
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Diagnosis', icon: 'fa-vial' },
    { id: 2, label: 'Risk', icon: 'fa-shield-virus' },
    { id: 3, label: 'Plan', icon: 'fa-clipboard-check' },
    { id: 4, label: 'Response', icon: 'fa-wave-square' },
    { id: 5, label: 'Takeaway', icon: 'fa-file-medical' }
  ];

  return (
    <div className="flex justify-between items-center px-4 relative">
      <div className="absolute top-5 left-10 right-10 h-[2px] bg-slate-100 z-0"></div>
      <div 
        className="absolute top-5 left-10 h-[2px] bg-indigo-500 z-0 transition-all duration-700 ease-in-out" 
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 80}%` }}
      ></div>
      
      {steps.map((step) => (
        <div key={step.id} className="relative z-10 flex flex-col items-center group">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-sm ${
            currentStep >= step.id 
            ? 'bg-indigo-600 border-indigo-600 text-white rotate-[360deg]' 
            : 'bg-white border-slate-200 text-slate-300'
          }`}>
            <i className={`fas ${step.icon} text-sm`}></i>
          </div>
          <span className={`mt-2 text-[9px] font-black uppercase tracking-widest transition-colors ${
            currentStep >= step.id ? 'text-indigo-600' : 'text-slate-400'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
