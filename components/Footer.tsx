
import React from 'react';
import { Twitter, Instagram, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';

interface FooterProps {
  onOpenEarlyAccess: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  onOpenEarlyAccess, onNavigateAbout, onNavigateContact, onOpenTerms, onOpenPrivacy 
}) => {
  // Define unified link styles with the requested scale and color hover effects
  const linkStyles = "text-sm font-bold text-slate-600 hover:text-calm-blue hover:scale-105 transition-all duration-300 block text-left origin-left";

  return (
    <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-24">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-calm-blue rounded-2xl flex items-center justify-center text-white shadow-lg">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
              <span className="font-black text-2xl tracking-tighter text-slate-900">MindLens</span>
            </div>
            <p className="text-xl font-medium text-slate-500 leading-relaxed mb-10">
              Transforming clinical psychology through spatial visualization and ethical AI.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/yourmindlens" target="_blank" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-200 transition-all active:scale-90"><Instagram size={20} /></a>
              <a href="https://linkedin.com/company/ngcreationsofficial" target="_blank" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-90"><Linkedin size={20} /></a>
              <a href="mailto:info.mindlens@gmail.com" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-calm-blue hover:border-blue-200 transition-all active:scale-90"><Mail size={20} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-20">
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Platform</h4>
              <ul className="space-y-4">
                <li><button onClick={() => window.scrollTo(0, 0)} className={linkStyles}>Home Lab</button></li>
                <li><button onClick={onNavigateAbout} className={linkStyles}>Science</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Clinical</h4>
              <ul className="space-y-4">
                <li><button onClick={onNavigateContact} className={linkStyles}>Contact Support</button></li>
                <li><button onClick={onOpenEarlyAccess} className={linkStyles}>Early Access</button></li>
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
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} MindLens Health, Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <ShieldCheck size={14} className="text-green-500" /> HIPAA Validated
             </div>
             <div className="w-1 h-1 bg-slate-200 rounded-full" />
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">v2.5 Release Candidate</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
