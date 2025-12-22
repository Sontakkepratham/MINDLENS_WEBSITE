
import React from 'react';
import Button from './ui/Button';
import { BarChart3, Gamepad2, ClipboardCheck, Sparkles } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface HeroProps {
  onOpenScreener: () => void;
  onOpenEarlyAccess: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenScreener, onOpenEarlyAccess }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-32 overflow-hidden bg-mesh-gradient bg-mesh">
      
      {/* Animated Background Blobs - Explicitly low z-index */}
      <div className="blob w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-400/20 top-[-5%] right-[-5%] animate-pulse-soft pointer-events-none -z-10"></div>
      <div className="blob w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-purple-400/10 bottom-[-5%] left-[-5%] animate-pulse-soft pointer-events-none -z-10" style={{animationDelay: '2s'}}></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <div className="max-w-2xl relative z-20 text-center lg:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm mb-6 sm:mb-8 mx-auto lg:mx-0">
              <Sparkles className="text-calm-blue w-3.5 h-3.5 sm:w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold text-slate-600 tracking-tight">Next-Gen Mental Health Lab</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15] lg:leading-[1.1] text-slate-900 mb-6 sm:mb-8">
              Experience Your <br className="hidden sm:block" />
              <span className="gradient-text">Mind in 3D.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Unlock spatial insights into your emotional well-being. From immersive PHQ-9 assessments to direct clinical guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start relative z-30">
              <Button onClick={(e) => { e.stopPropagation(); onOpenEarlyAccess(); }} size="lg" className="shadow-2xl w-full sm:w-auto">
                Get Early Access
              </Button>
              <Button variant="outline" onClick={(e) => { e.stopPropagation(); onOpenScreener(); }} size="lg" className="glass-card w-full sm:w-auto">
                <ClipboardCheck className="mr-2" size={20} /> Start Screener
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center perspective-1000 z-10">
            {/* The Main 3D Stage */}
            <div className="relative w-full h-full flex items-center justify-center preserve-3d">
              
              {/* Floating Element 1: Results Card */}
              <div className="absolute top-[5%] left-[-5%] sm:left-0 z-20 animate-float scale-75 sm:scale-100 pointer-events-none">
                <div className="glass-card p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] w-52 sm:w-64 card-3d">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                      <BarChart3 size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analysis</span>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="text-lg sm:text-2xl font-bold text-slate-800">Clear Clarity</div>
                    <div className="h-1 bg-slate-200/50 rounded-full w-full overflow-hidden">
                      <div className="h-full bg-calm-blue w-[75%] animate-pulse"></div>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">Progress tracked via Gemini Engine</p>
                  </div>
                </div>
              </div>

              {/* Central Hero Visual */}
              <div className="relative z-30 group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-calm-blue to-soft-lavender rounded-[34px] sm:rounded-[44px] blur-xl opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none"></div>
                <div className="relative bg-white p-3 sm:p-4 rounded-[32px] sm:rounded-[40px] shadow-2xl border border-white card-3d preserve-3d">
                  <div className="overflow-hidden rounded-[24px] sm:rounded-[30px] w-[240px] h-[300px] sm:w-[320px] sm:h-[400px]">
                    <img 
                      src="https://drive.google.com/thumbnail?id=1RT3NZdXzPcur9x7nuxtj_X987b8sNEKN&sz=w1000" 
                      className="w-full h-full object-cover bg-slate-100" 
                      alt="Lead Counselor"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white shadow-2xl scale-90 sm:scale-100">
                     <div className="text-[10px] sm:text-xs font-bold text-calm-blue mb-0.5 sm:mb-1">Miss. Nidhi Gadoya</div>
                     <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium">Lead Clinical Psychologist</div>
                  </div>
                </div>
              </div>

              {/* Floating Element 3: Game Card */}
              <div className="absolute bottom-[5%] left-[0%] sm:left-[5%] z-20 animate-float-slow scale-75 sm:scale-100 pointer-events-none">
                <div className="glass-card p-4 sm:p-5 rounded-2xl sm:rounded-[28px] w-48 sm:w-56 card-3d" style={{animationDelay: '1.5s'}}>
                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-2 sm:mb-3 shadow-lg shadow-purple-500/20">
                     <Gamepad2 size={16} />
                   </div>
                   <div className="text-xs sm:text-sm font-bold text-slate-800">Neuro-Game Lab</div>
                   <div className="text-[9px] sm:text-[10px] text-slate-500">Training resilience through play</div>
                </div>
              </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
