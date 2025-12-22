
import React from 'react';
import { X, Shield, Scale, Lock, HeartHandshake } from 'lucide-react';
import Button from './ui/Button';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy' | 'hipaa';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const content = {
    terms: {
      title: "Terms of Service",
      icon: <Scale className="text-calm-blue" />,
      text: `By using MindLens, you agree to these terms. MindLens is a digital mental wellness platform, not a medical provider. Our AI companion is a supportive tool, not a diagnostic engine. Users must be 18+ or have parental consent. Data usage is strictly for improving your individual care experience. We reserve the right to modify the service as clinical research evolves.`
    },
    privacy: {
      title: "Privacy Policy",
      icon: <Lock className="text-calm-blue" />,
      text: `Your privacy is our primary engineering requirement. We collect minimal data: clinical screener results, session notes (if opted-in), and account info. We use AES-256 bank-grade encryption. We never sell your data to third parties. All AI analysis is localized to your encrypted session and purged upon account deletion.`
    },
    hipaa: {
      title: "HIPAA Compliance",
      icon: <Shield className="text-calm-blue" />,
      text: `MindLens adheres to the Health Insurance Portability and Accountability Act (HIPAA) standards for protecting sensitive patient data. All video sessions are peer-to-peer encrypted, and all PHI (Protected Health Information) is stored in specialized, isolated databases with multi-factor audit logging.`
    }
  };

  const active = content[type];

  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              {active.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{active.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
              {active.text}
            </p>
            <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
              <HeartHandshake className="text-calm-blue shrink-0" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Clearer Insight. Stronger Skills. Lasting Wellness. <br />
                © {new Date().getFullYear()} MindLens Health.
              </p>
            </div>
          </div>
        </div>
        <div className="p-8 border-t border-slate-100 bg-slate-50/50">
          <Button onClick={onClose} className="w-full py-4 rounded-2xl">I Understand</Button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
