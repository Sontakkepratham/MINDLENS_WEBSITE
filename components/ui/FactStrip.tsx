
import React from 'react';
import { Reveal } from './Reveal';
import { Info, Sparkles, Brain, Shield } from 'lucide-react';

interface Fact {
  icon: React.ReactNode;
  text: string;
}

interface FactStripProps {
  facts: Fact[];
  variant?: 'light' | 'dark';
}

const FactStrip: React.FC<FactStripProps> = ({ facts, variant = 'light' }) => {
  return (
    <div className={`py-12 border-y ${variant === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50/50 border-slate-100'}`}>
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
            {facts.map((fact, idx) => (
              <div key={idx} className="flex items-center gap-4 max-w-xs group">
                <div className={`p-2 rounded-xl transition-all duration-500 group-hover:scale-110 ${variant === 'dark' ? 'bg-white/5 text-calm-blue' : 'bg-white text-calm-blue shadow-sm'}`}>
                  {fact.icon}
                </div>
                <p className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] leading-relaxed ${variant === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {fact.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default FactStrip;
