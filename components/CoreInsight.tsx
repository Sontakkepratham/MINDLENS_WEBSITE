
import React from 'react';
import { ClipboardList, Users, BrainCircuit } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

interface CoreInsightProps {
  onOpenScreener: () => void;
  onOpenBooking: () => void;
}

const CoreInsight: React.FC<CoreInsightProps> = ({ onOpenScreener, onOpenBooking }) => {
  const features = [
    {
      icon: <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-calm-blue" />,
      title: "Clinical Screener",
      description: "Standardized PHQ-9 and GAD-7 assessments tailored to give you a clinical-grade baseline.",
      action: { label: "Try it Now", onClick: onOpenScreener }
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-soft-lavender" />,
      title: "Verified Counselors",
      description: "Direct access to licensed therapists. No referral needed, no waiting lists.",
      action: { label: "Book Now", onClick: onOpenBooking }
    },
    {
      icon: <BrainCircuit className="w-6 h-6 sm:w-8 sm:h-8 text-calm-blue" />,
      title: "AI Synthesis",
      description: "Our AI engine tracks your progress and prepares briefing notes for your counselor.",
      action: { label: "Learn More", onClick: () => document.getElementById('ai-support')?.scrollIntoView({ behavior: 'smooth' }) }
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Professional Tools for Real Growth.</h2>
            <p className="text-base sm:text-lg text-slate-600">
              We provide the framework of a clinical practice with the convenience of a modern app. From self-screening to long-term therapy.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div className="p-6 sm:p-8 bg-gray-50 rounded-[32px] hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-100 flex flex-col h-full">
                <div className="shrink-0 p-2.5 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-sm w-fit mb-5 sm:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 flex-grow">{feature.description}</p>
                <Button variant="outline" size="sm" onClick={feature.action.onClick} className="w-full sm:w-auto">
                  {feature.action.label}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreInsight;
