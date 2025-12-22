
import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from './ui/Button';

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way"
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 }
];

interface PHQScreenerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHQScreener: React.FC<PHQScreenerProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => answers.reduce((a, b) => a + b, 0);
  
  const getFeedback = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "text-green-600", advice: "Your scores suggest minimal symptoms. Continue your wellness routine." };
    if (score <= 9) return { level: "Mild", color: "text-yellow-600", advice: "You're experiencing mild symptoms. We recommend regular check-ins and self-help tools." };
    if (score <= 14) return { level: "Moderate", color: "text-orange-600", advice: "Moderate symptoms detected. It might be beneficial to speak with one of our counselors." };
    return { level: "Moderately Severe to Severe", color: "text-red-600", advice: "Significant symptoms detected. Please consider booking an urgent session with a professional counselor." };
  };

  const score = calculateScore();
  const feedback = getFeedback(score);
  const progressPercent = ((currentStep + 1) / questions.length) * 100;

  return (
    <div 
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phq9-title"
    >
      <div className="bg-white w-full h-full md:h-auto md:max-w-2xl md:rounded-[40px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-500 flex flex-col">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 focus-visible:ring-4 focus-visible:ring-calm-blue/20 rounded-full z-10 p-2 transition-all"
          aria-label="Close Screener"
        >
          <X size={28} />
        </button>

        {!showResult ? (
          <div className="p-8 md:p-14 lg:p-20 flex-1 overflow-y-auto custom-scrollbar">
            <div className="mb-10 sm:mb-16">
              <span className="text-calm-blue font-black text-xs uppercase tracking-[0.3em]" id="phq9-step">
                Step {currentStep + 1} of {questions.length}
              </span>
              <div 
                className="w-full bg-slate-100 h-2.5 rounded-full mt-4 overflow-hidden"
                role="progressbar"
                aria-valuenow={currentStep + 1}
                aria-valuemin={1}
                aria-valuemax={questions.length}
              >
                <div 
                  className="bg-calm-blue h-full rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-10 sm:mb-14 leading-tight min-h-[6rem] sm:min-h-[8rem]" id="phq9-title">
              {questions[currentStep]}
            </h3>

            <div className="space-y-4" role="group" aria-labelledby="phq9-title">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={`w-full text-left p-6 rounded-[32px] border-2 transition-all duration-300 flex justify-between items-center group ${
                    answers[currentStep] === opt.value 
                    ? 'border-calm-blue bg-blue-50 text-calm-blue shadow-xl scale-[1.02]' 
                    : 'border-slate-50 hover:border-blue-200 hover:bg-slate-50 hover:shadow-lg text-slate-600'
                  }`}
                  aria-pressed={answers[currentStep] === opt.value}
                >
                  <span className="font-bold text-lg">{opt.label}</span>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    answers[currentStep] === opt.value ? 'bg-calm-blue border-calm-blue text-white' : 'border-slate-200 group-hover:border-calm-blue/30'
                  }`}>
                    <ChevronRight size={18} className={`transition-transform ${answers[currentStep] === opt.value ? 'translate-x-0' : 'translate-x-1 opacity-0 group-hover:opacity-100'}`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-start items-center">
              <button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="text-slate-400 hover:text-calm-blue disabled:opacity-0 flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-all p-3"
                aria-label="Previous Question"
              >
                <ChevronLeft size={18} /> Go Back
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-14 lg:p-20 text-center flex-1 overflow-y-auto">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-12 shadow-inner ring-[12px] ring-blue-50/30">
              <CheckCircle2 size={64} className="text-calm-blue" />
            </div>
            <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4" id="phq9-result-title">Review Ready</h3>
            <p className="text-slate-500 font-medium text-lg mb-12">Based on the PHQ-9 standardized clinical scale.</p>
            
            <div className="bg-slate-50/50 rounded-[48px] p-10 sm:p-14 mb-12 border border-slate-100 shadow-inner">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Your Severity Index</div>
              <div className={`text-7xl sm:text-8xl font-black mb-6 ${feedback.color} drop-shadow-sm`} aria-live="polite">
                {score} <span className="text-2xl sm:text-3xl text-slate-300 font-bold">/ 27</span>
              </div>
              <div className={`text-2xl sm:text-3xl font-black mb-6 ${feedback.color}`}>{feedback.level} Symptoms</div>
              <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-sm mx-auto">{feedback.advice}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button onClick={onClose} variant="outline" className="w-full sm:w-auto py-5 px-12 rounded-3xl">Dismiss</Button>
              <Button onClick={() => { onClose(); document.getElementById('counselors')?.scrollIntoView({ behavior: 'smooth' }); }} variant="primary" className="w-full sm:w-auto py-5 px-12 rounded-3xl shadow-xl">Book Priority Session</Button>
            </div>
            
            <div className="mt-12 flex items-start sm:items-center justify-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-tight max-w-sm mx-auto">
              <AlertCircle size={16} className="shrink-0" />
              <span className="text-left sm:text-center leading-relaxed">Standard clinical screener only. For professional diagnosis or emergencies, consult qualified medical services.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PHQScreener;
