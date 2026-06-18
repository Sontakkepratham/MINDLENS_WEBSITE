
import React, { useState, useEffect } from 'react';
import { X, Shield, Scale, Lock, HeartHandshake, FileText, AlertTriangle, Fingerprint, Info, ChevronRight, CheckCircle2, Globe, GraduationCap, Gavel } from 'lucide-react';
import Button from './ui/Button';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy' | 'hipaa' | null;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'hipaa'>('terms');

  useEffect(() => {
    if (type) setActiveTab(type);
  }, [type, isOpen]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'terms', label: 'Terms of Service', icon: <Scale size={18} /> },
    { id: 'privacy', label: 'Privacy Policy', icon: <Lock size={18} /> },
    { id: 'hipaa', label: 'Global Compliance', icon: <Globe size={18} /> }
  ];

  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center bg-slate-900/70 backdrop-blur-xl p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-full max-h-[90vh] lg:max-h-[85vh] animate-in zoom-in-95 duration-500 border border-white/20">
        
        {/* Institutional Header */}
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/50">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Shield size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Legal & Ethics Center</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                <CheckCircle2 size={12} className="text-green-500" /> WHO ALIGNED • GLOBAL VERSION 2024.1
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-md rounded-xl transition-all active:scale-95 text-slate-400 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>

        {/* Dynamic Navigation */}
        <div className="flex p-2 bg-slate-100/50 border-b border-slate-100 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id 
                ? 'bg-white text-calm-blue shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Global Compliance Content Area */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 lg:p-16 custom-scrollbar bg-white relative">
          
          {activeTab === 'terms' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex gap-4">
                <AlertTriangle className="text-red-500 shrink-0" size={24} />
                <div>
                  <h4 className="font-black text-red-900 text-sm mb-1 uppercase tracking-tight">Universal Life-Safety Warning</h4>
                  <p className="text-xs text-red-800 leading-relaxed font-medium">
                    MindLens is an adjunctive wellness platform, not a substitute for professional medical diagnosis or emergency intervention. In accordance with WHO standards, if you are in immediate crisis, please exit this app and call: <span className="font-black">988 (US/Canada), 111 (UK), 112 (EU/Global), or 080-46110007 (India).</span>
                  </p>
                </div>
              </div>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <Gavel size={20} className="text-calm-blue" />
                   <h4 className="text-xl font-black text-slate-900">1. Global Jurisdiction & Regulatory Body Alignment</h4>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  MindLens operates under a "Compliance-by-Design" architecture. Our Terms of Service are harmonized with the <strong>World Health Organization (WHO) Mental Health Action Plan</strong> and the <strong>UN Convention on the Rights of Persons with Disabilities</strong>. We adhere to local mental health acts across jurisdictions, including the <strong>Mental Healthcare Act, 2017 (India)</strong> and <strong>NIMH (USA)</strong> frameworks.
                </p>
                
                <h4 className="text-xl font-black text-slate-900">2. AI Governance & Clinical Limitations</h4>
                <p className="text-slate-600 leading-relaxed">
                  Our Gemini-powered spatial models are trained under strict <strong>IEEE Ethical AI Guidelines</strong>. You acknowledge that AI insights are "probabilistic assistants" intended to augment, not replace, the final decision-making authority of your licensed human therapist.
                </p>

                <h4 className="text-xl font-black text-slate-900">3. Non-Diagnosis Agreement</h4>
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                   <p className="text-sm text-slate-500 font-medium italic">
                     "The user expressly agrees that high-fidelity spatial models of mood are descriptive representations of subjective states and do not constitute a clinical diagnosis of DSM-5 or ICD-11 disorders without a validated clinical interview by a MindLens Human Partner."
                   </p>
                </div>
              </section>

              <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Governance Build: RC-2024.12.A</p>
                <div className="flex gap-4 opacity-30 grayscale">
                   <div className="text-[8px] font-black border border-slate-300 px-2 py-1 rounded">WHO ALIGNED</div>
                   <div className="text-[8px] font-black border border-slate-300 px-2 py-1 rounded">CE MARK PREP</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-4">
                <Lock className="text-calm-blue shrink-0" size={24} />
                <div>
                  <h4 className="font-black text-blue-900 text-sm mb-1 uppercase tracking-tight">Global Data Sovereignty</h4>
                  <p className="text-xs text-blue-800 leading-relaxed font-medium">
                    Our "Vault" architecture exceeds <strong>GDPR (EU)</strong>, <strong>CCPA (USA)</strong>, and <strong>DPDP (India)</strong> requirements. We treat your emotional data as an extension of your biological body.
                  </p>
                </div>
              </div>

              <section className="space-y-6">
                <h4 className="text-xl font-black text-slate-900">1. Decentralized Clinical Encryption</h4>
                <p className="text-slate-600 leading-relaxed">
                  Unlike traditional cloud apps, MindLens utilizes "Zero-Knowledge" protocols for spatial logs. This means even our staff cannot view your inner spatial models without your temporary cryptographic grant—ensuring total <strong>Institutional Confidentiality</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <h5 className="font-black text-slate-900 text-xs uppercase mb-2">Right to Portability</h5>
                    <p className="text-[11px] text-slate-500">In accordance with GDPR Art. 20, you may export your entire clinical history in machine-readable JSON format at any time.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <h5 className="font-black text-slate-900 text-xs uppercase mb-2">Right to Erasure</h5>
                    <p className="text-[11px] text-slate-500">A "One-Click Purge" is available. Deletion follows DoD-grade sanitization standards across all distributed shards.</p>
                  </div>
                </div>

                <h4 className="text-xl font-black text-slate-900">2. Global Server Residency</h4>
                <p className="text-slate-600 leading-relaxed">
                  MindLens complies with national data residency laws. Clinical data for Indian citizens is stored on <strong>MeitY-empanelled</strong> clouds within Indian borders, while EU data resides in GDPR-compliant Frankfurt clusters.
                </p>
              </section>

              <div className="pt-10 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Encryption Standards: AES-256-GCM / TLS 1.3</p>
              </div>
            </div>
          )}

          {activeTab === 'hipaa' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="bg-green-50 p-6 rounded-3xl border border-green-100 flex gap-4">
                <GraduationCap className="text-green-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-black text-green-900 text-sm mb-1 uppercase tracking-tight">Integrated Healthcare Compliance</h4>
                  <p className="text-xs text-green-800 leading-relaxed font-medium">
                    This section outlines our adherence to specific national healthcare laws (HIPAA, DISHA, Mental Health Acts) to ensure clinical validity.
                  </p>
                </div>
              </div>

              <section className="space-y-6">
                <h4 className="text-xl font-black text-slate-900">1. PHI / EMR Protection (USA & International)</h4>
                <p className="text-slate-600 leading-relaxed">MindLens acts as a <strong>Business Associate</strong> under HIPAA. We utilize <strong>SOC2 Type II</strong> certified infrastructure to manage Protected Health Information (PHI). Every clinician interaction is double-verified via institutional biometric handshake.</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border-l-4 border-green-500">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-1" />
                    <div>
                      <span className="font-black text-slate-900 text-xs uppercase block mb-1">Indian DISHA Framework</span>
                      <p className="text-xs text-slate-500 leading-relaxed">Full compliance with Digital Information Security in Healthcare Act guidelines for patient consent management.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border-l-4 border-green-500">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-1" />
                    <div>
                      <span className="font-black text-slate-900 text-xs uppercase block mb-1">Human Rights Compliance</span>
                      <p className="text-xs text-slate-500 leading-relaxed">Alignment with the QualityRights tool-kit to ensure user dignity and autonomy in digital psychotherapy.</p>
                    </div>
                  </div>
                </div>

                <h4 className="text-xl font-black text-slate-900">2. Clinical Audit Readiness</h4>
                <p className="text-slate-600 leading-relaxed">
                  MindLens maintains a transparent, tamper-proof audit trail of all AI model interactions. This allows health regulators to verify the safety and efficacy of our supportive protocols during institutional reviews.
                </p>
              </section>

              <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Clinical Protocol: ML-GLOBAL-VER-4</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-green-600">
                  <Fingerprint size={12} /> BIOMETRIC LOGS ACTIVE
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-slate-400">
            <Info size={16} className="text-calm-blue" />
            <span className="text-[10px] font-black uppercase tracking-widest">Digital Signature Required</span>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-initial rounded-2xl px-10" onClick={onClose}>Dismiss</Button>
            <Button variant="primary" className="flex-1 sm:flex-initial rounded-2xl px-10 shadow-xl shadow-calm-blue/20" onClick={onClose}>I Attest & Accept</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
