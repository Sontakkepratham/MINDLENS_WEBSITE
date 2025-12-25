
import React from 'react';
import { Reveal } from './Reveal';
import { Quote } from 'lucide-react';

interface QuoteBreakProps {
  quote: string;
  author: string;
  variant?: 'blue' | 'purple' | 'slate';
}

const QuoteBreak: React.FC<QuoteBreakProps> = ({ quote, author, variant = 'blue' }) => {
  const themes = {
    blue: 'bg-blue-50/30 text-calm-blue border-blue-100',
    purple: 'bg-purple-50/30 text-soft-lavender border-purple-100',
    slate: 'bg-slate-50/50 text-slate-500 border-slate-100'
  };

  return (
    <div className={`py-20 sm:py-32 border-y ${themes[variant]} overflow-hidden relative`}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <Quote size={400} />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="mx-auto mb-8 opacity-20" size={48} />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium italic leading-relaxed mb-8 tracking-tight">
              "{quote}"
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-current opacity-30"></div>
              <span className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] opacity-60">
                {author}
              </span>
              <div className="h-px w-8 bg-current opacity-30"></div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default QuoteBreak;
