
import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, BrainCircuit, HeartHandshake, X, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

interface OnboardingCarouselProps {
  isOpen: boolean;
  onComplete: () => void;
}

const slides = [
  {
    id: 'spatial',
    title: 'Spatial Emotional Intelligence',
    subtitle: 'See Your Mind in 3D',
    description: 'Stop guessing how you feel. Our spatial engine maps complex emotions into 3D models, allowing you to visualize and dismantle mental hurdles with surgical precision.',
    icon: <Sparkles size={48} className="text-calm-blue" />,
    color: 'bg-blue-50',
    accent: 'text-calm-blue'
  },
  {
    id: 'ai',
    title: 'Empathetic AI Support',
    subtitle: 'Always Here. Zero Judgment.',
    description: 'Experience a companion that never sleeps. Our clinical AI provides 24/7 grounding exercises, mood tracking, and a safe space to process thoughts at 3 AM.',
    icon: <BrainCircuit size={48} className="text-soft-lavender" />,
    color: 'bg-purple-50',
    accent: 'text-soft-lavender'
  },
  {
    id: 'clinical',
    title: 'Direct Clinical Connection',
    subtitle: 'Locked-in Growth Path',
    description: 'Transition seamlessly from self-care to professional guidance. Direct access to Dr. Nidhi Gadoya ensures your AI insights translate into real-world breakthroughs.',
    icon: <HeartHandshake size={48} className="text-calm-blue" />,
    color: 'bg-indigo-50',
    accent: 'text-calm-blue'
  }
];

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ isOpen, onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0);
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onComplete, 500);
  };

  const activeSlide = slides[currentSlide];

  return (
    <div className={`fixed inset-0 z-[10000] flex items-center justify-center bg-white transition-all duration-700 ease-in-out ${isClosing ? 'opacity-0 translate-y-full' : 'opacity-100'}`}>
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000 ${currentSlide === 0 ? 'bg-blue-400/10' : currentSlide === 1 ? 'bg-purple-400/10' : 'bg-indigo-400/10'}`}></div>
        <div className={`absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] transition-colors duration-1000 ${currentSlide === 0 ? 'bg-soft-lavender/5' : currentSlide === 1 ? 'bg-calm-blue/5' : 'bg-soft-lavender/5'}`}></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        {/* Top Header */}
        <div className="absolute top-8 left-6 right-6 flex justify-between items-center lg:px-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-calm-blue rounded-xl flex items-center justify-center text-white shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="font-black text-lg tracking-tighter text-slate-900">MindLens</span>
          </div>
          <button 
            onClick={handleClose} 
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
          >
            Skip Intro <X size={14} />
          </button>
        </div>

        {/* Content Slider Area */}
        <div className="flex flex-col items-center text-center">
          
          {/* Animated Icon Container */}
          <div key={activeSlide.id} className={`w-32 h-32 sm:w-40 sm:h-40 ${activeSlide.color} rounded-[40px] flex items-center justify-center mb-12 animate-in zoom-in-50 slide-in-from-bottom-8 duration-700 shadow-inner relative group`}>
             <div className="absolute inset-0 bg-white/20 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
             <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
               {activeSlide.icon}
             </div>
          </div>

          {/* Text Content */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div key={activeSlide.title} className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <span className={`text-xs font-black uppercase tracking-[0.4em] ${activeSlide.accent}`}>
                 {activeSlide.subtitle}
               </span>
               <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                 {activeSlide.title}
               </h2>
            </div>
            
            <p key={activeSlide.description} className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
              {activeSlide.description}
            </p>
          </div>

          {/* Controls */}
          <div className="mt-16 w-full max-w-xs space-y-8">
            
            {/* Progress Dots */}
            <div className="flex justify-center gap-3">
              {slides.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-10 bg-calm-blue' : 'w-4 bg-slate-200'}`}
                />
              ))}
            </div>

            <Button 
              size="lg" 
              className="w-full py-6 rounded-3xl shadow-2xl shadow-calm-blue/30 text-lg font-black"
              onClick={handleNext}
            >
              {currentSlide === slides.length - 1 ? (
                <>Get Started <ArrowRight className="ml-2" size={22} /></>
              ) : (
                <>Next Concept <ChevronRight className="ml-2" size={22} /></>
              )}
            </Button>
          </div>
        </div>

        {/* Footnote */}
        <div className="absolute bottom-12 left-0 right-0 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            MindLens Health Ecosystem v2.5.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
