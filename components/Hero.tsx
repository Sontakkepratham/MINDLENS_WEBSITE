
import React from 'react';
import Button from './ui/Button';
import { BarChart3, Gamepad2, ClipboardCheck, Sparkles, CalendarDays, Brain } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface HeroProps {
  onOpenScreener: () => void;
  onOpenEarlyAccess: () => void;
  onOpenBooking: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenScreener, onOpenEarlyAccess, onOpenBooking }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-mesh-gradient bg-mesh min-h-[90vh] flex items-center">
      
      {/* Background Knowledge Fragments - To fill the "Blank Space" */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[15%] left-[5%] text-[8rem] lg:text-[12rem] font-black text-slate-900/[0.02] -rotate-12 animate-pulse-soft">MIND</div>
        <div className="absolute bottom-[20%] right-[10%] text-[8rem] lg:text-[12rem] font-black text-slate-900/[0.02] rotate-12 animate-pulse-soft">LENS</div>
        <div className="absolute top-[40%] right-[5%] text-[4rem] lg:text-[6rem] font-black text-calm-blue/[0.01] -rotate-6">CLARITY</div>
      </div>

      {/* Animated Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] bg-blue-400/10 blur-[120px] rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] lg:w-[700px] lg:h-[700px] bg-purple-400/10 blur-[100px] rounded-full animate-pulse-soft" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content Column */}
          <div className="relative z-20 order-2 lg:order-1">
            <Reveal>
              <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-sm mb-8">
                  <Sparkles className="text-calm-blue w-4 h-4" />
                  <span className="text-xs font-black text-slate-500 tracking-widest uppercase">The Future of Wellness</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-slate-900 mb-8 tracking-tighter">
                  See Your <br className="hidden sm:block" />
                  <span className="gradient-text">Mind in 3D.</span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-slate-500 mb-12 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
                  MindLens transforms complex emotions into interactive spatial models. Professional guidance meets high-fidelity AI support.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <Button 
                    onClick={onOpenBooking} 
                    size="lg" 
                    className="shadow-2xl shadow-calm-blue/30 w-full sm:w-auto gap-3 py-6 px-10 rounded-3xl"
                  >
                    <CalendarDays size={24} /> Book Session
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onOpenScreener} 
                    size="lg" 
                    className="glass-card w-full sm:w-auto py-6 px-10 rounded-3xl border-slate-200"
                  >
                    <ClipboardCheck className="mr-2" size={24} /> Start Screener
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Visual Column */}
          <div className="relative z-10 order-1 lg:order-2 h-[500px] lg:h-[700px] w-full flex items-center justify-center">
            <Reveal delay={200}>
              <div className="relative w-full h-full flex items-center justify-center perspective-1000 preserve-3d">
                
                {/* 3D Visual - Main Counselor Card */}
                <div className="relative z-30 group animate-float-slow">
                  <div className="absolute -inset-10 bg-gradient-to-tr from-calm-blue/20 to-soft-lavender/20 rounded-[80px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="relative bg-white p-4 sm:p-5 rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-4 border-white card-3d preserve-3d">
                    <div className="overflow-hidden rounded-[36px] w-[260px] h-[340px] sm:w-[360px] sm:h-[480px]">
                      <img 
                        src="https://drive.google.com/thumbnail?id=1RT3NZdXzPcur9x7nuxtj_X987b8sNEKN&sz=w1000" 
                        className="w-full h-full object-cover bg-slate-100 transition-transform duration-700 group-hover:scale-105" 
                        alt="Lead Clinical Psychologist"
                        loading="eager"
                      />
                    </div>
                    
                    {/* Floating Info Tag */}
                    <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-3xl border border-white shadow-2xl scale-95 sm:scale-100 group-hover:translate-x-4 transition-transform duration-500">
                       <div className="flex items-center gap-3 mb-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                         <div className="text-xs font-black text-calm-blue tracking-widest uppercase">Nidhi Gadoya</div>
                       </div>
                       <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Lead Clinical Expert</div>
                    </div>
                  </div>
                </div>

                {/* Floating Decoration Cards */}
                <div className="absolute top-[10%] left-[-10%] z-20 animate-float pointer-events-none scale-75 sm:scale-100">
                  <div className="glass-card p-6 rounded-[32px] w-64 card-3d shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <BarChart3 size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analysis Lab</span>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xl font-bold text-slate-800 tracking-tight">Emotional Clarity</div>
                      <div className="h-1.5 bg-slate-100 rounded-full w-full overflow-hidden">
                        <div className="h-full bg-calm-blue w-[88%] animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-[15%] right-[-5%] z-20 animate-float-slow pointer-events-none scale-75 sm:scale-100" style={{animationDelay: '1.5s'}}>
                  <div className="glass-card p-5 rounded-[28px] w-56 card-3d shadow-2xl border-white/50">
                     <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                       <Gamepad2 size={20} />
                     </div>
                     <div className="text-sm font-black text-slate-800 uppercase tracking-widest mb-1">Neuro-Lab</div>
                     <div className="text-[10px] text-slate-500 font-medium">Cognitive resilience training</div>
                  </div>
                </div>

                {/* Central Brain Visualization - Subtle Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] -z-10 animate-pulse-soft">
                  <Brain size={400} />
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
