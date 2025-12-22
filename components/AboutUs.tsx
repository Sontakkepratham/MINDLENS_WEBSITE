
import React from 'react';
import { Reveal } from './ui/Reveal';
import { Users, BookOpen, HeartHandshake, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

interface AboutUsTeaserProps {
  onNavigateAbout?: () => void;
}

const AboutUs: React.FC<AboutUsTeaserProps> = ({ onNavigateAbout }) => {
  return (
    <section id="about-us" className="py-16 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#f8fafc_100%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="bg-white rounded-[40px] sm:rounded-[60px] p-8 sm:p-12 md:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-calm-blue font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6">
                <span className="w-6 sm:w-8 h-px bg-calm-blue"></span> Mission Statement
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-6 sm:mb-8 leading-tight">
                Science Meets <br className="hidden sm:block" />
                <span className="gradient-text">Human Soul.</span>
              </h2>
              <p className="text-base sm:text-xl text-slate-500 leading-relaxed mb-8 sm:mb-12 font-medium">
                We're not just building an app. We're engineering a new medium for mental clarity, merging the precision of clinical science with the warmth of human connection.
              </p>
              <Button size="lg" variant="outline" className="glass-card w-full sm:w-auto" onClick={onNavigateAbout}>
                Explore Our Ecosystem <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full">
              <div className="glass-card p-6 sm:p-10 rounded-3xl sm:rounded-[40px] transform lg:hover:-translate-y-4 transition-transform duration-500">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-calm-blue mb-4 sm:mb-6">
                  <Users size={24} />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Expert Led</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Licensed clinical guidance in every pixel.</p>
              </div>

              <div className="glass-card p-6 sm:p-10 rounded-3xl sm:rounded-[40px] transform sm:translate-y-6 lg:translate-y-12 lg:hover:-translate-y-4 transition-transform duration-500">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-soft-lavender mb-4 sm:mb-6">
                  <BookOpen size={24} />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Evidence-Based</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Methodologies proven to rewire resilience.</p>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutUs;
