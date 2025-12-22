
import React from 'react';
import { Reveal } from './ui/Reveal';
import { MessageCircle, Clock, Heart, BrainCircuit } from 'lucide-react';

const AISupport: React.FC = () => {
  return (
    <section id="ai-support" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-calm-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 lg:order-1 relative">
           <Reveal>
             {/* Chat Interface Mockup */}
             <div className="bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden max-w-md mx-auto">
               <div className="bg-slate-900/50 p-4 flex items-center justify-between border-b border-slate-700">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-calm-blue to-soft-lavender p-0.5">
                     <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                       <Heart size={18} className="text-white" />
                     </div>
                   </div>
                   <div>
                     <h4 className="font-bold">MindLens Companion</h4>
                     <p className="text-xs text-slate-400">Always here. 24/7</p>
                   </div>
                 </div>
               </div>
               
               <div className="p-6 space-y-6 min-h-[400px]">
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">AI</div>
                   <div className="bg-slate-700/50 p-4 rounded-2xl rounded-tl-none text-slate-200 text-sm">
                     I see your PHQ-9 results show you've been having trouble sleeping lately. Would you like to try a "Worry Time" exercise before bed tonight? 🌙
                   </div>
                 </div>

                 <div className="flex gap-4 flex-row-reverse">
                   <div className="w-8 h-8 rounded-full bg-calm-blue flex-shrink-0 flex items-center justify-center text-xs">Me</div>
                   <div className="bg-calm-blue p-4 rounded-2xl rounded-tr-none text-white text-sm">
                     Actually, that sounds helpful. I just can't turn my brain off.
                   </div>
                 </div>

                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">AI</div>
                   <div className="bg-slate-700/50 p-4 rounded-2xl rounded-tl-none text-slate-200 text-sm">
                     That's completely normal. Let's set a 15-minute timer to write down worries, then we put them away. Ready?
                   </div>
                 </div>
               </div>

               <div className="p-4 border-t border-slate-700 bg-slate-900/30">
                 <div className="h-10 bg-slate-700/50 rounded-full w-full animate-pulse"></div>
               </div>
             </div>
           </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 text-calm-blue">
               <MessageCircle size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Compassionate Companion. Zero Judgment.</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Sometimes you just need to be heard at 3 AM. MindLens provides an empathetic, AI-driven space to vent, process, and plan. 
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-calm-blue mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Available 24/7</h4>
                  <p className="text-slate-400">Insomnia doesn't keep office hours. Neither do we.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BrainCircuit className="w-6 h-6 text-soft-lavender mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Context-Aware Empathy</h4>
                  <p className="text-slate-400">Unlike generic bots, MindLens remembers your clinical progress and tailors support to your current emotional state.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default AISupport;
