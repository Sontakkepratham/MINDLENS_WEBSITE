
import React from 'react';
import { Reveal } from './ui/Reveal';
import { Star, Video, MessageSquare, Calendar, Globe, Award, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';

interface CounselorsProps {
  onOpenBooking: () => void;
  onOpenMessaging: () => void;
}

const Counselors: React.FC<CounselorsProps> = ({ onOpenBooking, onOpenMessaging }) => {
  return (
    <section id="counselors" className="py-16 lg:py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-calm-blue font-bold tracking-wider uppercase text-[10px] sm:text-sm mb-2 block">Our Primary Expert</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">Science-Backed Care from Dr. Nidhi Gadoya</h2>
            <p className="text-base sm:text-lg text-slate-600">
              Personalized mental health support led by clinical expertise. Connect directly with our lead consultant for guided wellness.
            </p>
          </div>
        </Reveal>

        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(94,120,204,0.15)] overflow-hidden flex flex-col lg:flex-row items-stretch relative">
              
              {/* Image Section */}
              <div className="lg:w-2/5 relative overflow-hidden group h-[400px] sm:h-[500px] lg:h-auto">
                <img 
                  src="https://drive.google.com/thumbnail?id=1RT3NZdXzPcur9x7nuxtj_X987b8sNEKN&sz=w1000" 
                  alt="Dr. Nidhi Gadoya" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-slate-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800&h=1200';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-slate-900/90 to-transparent text-white">
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                     <span className="text-[10px] font-bold tracking-widest uppercase">Available for Sessions</span>
                   </div>
                   <h4 className="text-lg sm:text-xl font-bold">Nidhi Gadoya.</h4>
                   <p className="text-xs sm:text-sm text-white/70 font-medium">Lead Clinical Psychologist</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-8 sm:p-10 lg:p-14 flex flex-col justify-center bg-white">
                <div className="mb-8">
                  <div className="flex items-center gap-1.5 text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    <span className="text-slate-400 text-[10px] sm:text-sm ml-2 font-black uppercase tracking-widest">(250+ Sessions)</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-slate-900 mb-6 italic leading-snug tracking-tight">
                    "I believe in creating a safe, cognitive lens through which you can view and overcome life's hurdles."
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-calm-blue shadow-sm shrink-0">
                      <Globe size={16} />
                    </div>
                    <div>
                      <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Languages</div>
                      <div className="text-[10px] sm:text-sm font-bold text-slate-700">English, Hindi</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-soft-lavender shadow-sm shrink-0">
                      <Award size={16} />
                    </div>
                    <div>
                      <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Clinical Style</div>
                      <div className="text-[10px] sm:text-sm font-bold text-slate-700">CBT & ACT</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 relative z-20">
                  <Button 
                    variant="primary" 
                    className="flex-1 gap-3 py-5 sm:py-4 shadow-2xl shadow-calm-blue/30 w-full text-lg font-black pointer-events-auto" 
                    onClick={onOpenBooking}
                  >
                    <Video size={22} className="shrink-0" /> Book Online Session
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-3 py-5 sm:py-4 border-slate-200 text-slate-600 hover:text-calm-blue hover:border-calm-blue w-full font-bold pointer-events-auto" 
                    onClick={onOpenMessaging}
                  >
                    <MessageSquare size={20} className="shrink-0" /> Message Directly
                  </Button>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
        
        {/* Verification Badges */}
        <Reveal>
          <div className="mt-16 sm:mt-20 flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2 font-black text-slate-900 tracking-[0.2em] text-[8px] sm:text-xs uppercase"><ShieldCheck size={16} className="text-calm-blue" /> HIPAA COMPLIANT</div>
            <div className="flex items-center gap-2 font-black text-slate-900 tracking-[0.2em] text-[8px] sm:text-xs uppercase"><Award size={16} className="text-calm-blue" /> CLINICALLY VALIDATED</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Counselors;
