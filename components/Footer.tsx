
import React from 'react';
import { Instagram, Linkedin, Mail, ShieldCheck, Lock, Globe } from 'lucide-react';

interface FooterProps {
  onOpenEarlyAccess: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  onNavigatePlatform?: () => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
  onOpenAdmin?: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  onOpenEarlyAccess, onNavigateAbout, onNavigateContact, onNavigatePlatform, onOpenTerms, onOpenPrivacy, onOpenAdmin 
}) => {
  const linkStyles = "text-sm font-bold text-slate-600 hover:text-calm-blue hover:scale-105 transition-all duration-300 block text-left origin-left";

  return (
    <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-24">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-calm-blue rounded-2xl flex items-center justify-center text-white shadow-lg">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
              <div>
                <span className="font-black text-2xl tracking-tighter text-slate-900">MindLens</span>
                <span className="text-[9px] font-black text-calm-blue/80 block uppercase tracking-widest mt-0.5 leading-tight">An Initiative by Gadoya Group Of Companies Pvt Ltd</span>
              </div>
            </div>
            <p className="text-xl font-medium text-slate-500 leading-relaxed mb-10">
              Transforming clinical psychology through spatial visualization and ethical AI.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/mindlenss/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-200 transition-all active:scale-90"><Instagram size={20} /></a>
              <a href="https://linkedin.com/company/ngcreationsofficial" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-90"><Linkedin size={20} /></a>
              <a href="mailto:info.mindlens@gmail.com" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-calm-blue hover:border-blue-200 transition-all active:scale-90"><Mail size={20} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-20">
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Platform</h4>
              <ul className="space-y-4">
                <li><button onClick={onNavigatePlatform} className={linkStyles}>Core Technology</button></li>
                <li><button onClick={onNavigateAbout} className={linkStyles}>Research Science</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Clinical</h4>
              <ul className="space-y-4">
                <li><button onClick={onNavigateContact} className={linkStyles}>Contact Support</button></li>
                <li><button onClick={onOpenEarlyAccess} className={linkStyles}>Early Access</button></li>
                <li><button onClick={onOpenAdmin} className={`${linkStyles} flex items-center gap-2 text-slate-300`}><Lock size={12} /> Merchant Portal</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Legal</h4>
              <ul className="space-y-4">
                <li><button onClick={onOpenPrivacy} className={linkStyles}>Privacy Policy</button></li>
                <li><button onClick={onOpenTerms} className={linkStyles}>Terms of Service</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} Gadoya Group Of Companies Pvt Ltd. (MindLens). All Rights Reserved.</p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><ShieldCheck size={14} className="text-green-500" /> HIPAA / WHO COMPLIANT</div>
             <div className="w-1 h-1 bg-slate-200 rounded-full" />
             <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><Globe size={14} className="text-calm-blue" /> GLOBAL DEPLOYMENT</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
