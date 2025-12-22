
import React from 'react';
import { Reveal } from './ui/Reveal';
import { Target, Smile, Zap, ArrowUpRight } from 'lucide-react';

const SkillLab: React.FC = () => {
  const skills = [
    {
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8 text-calm-blue" />,
      title: "Cognitive Shift",
      desc: "Reframe negative thought patterns using clinical spatial visualization.",
      bg: "bg-blue-50/50",
      accent: "text-calm-blue"
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-soft-lavender" />,
      title: "Behavioral Drive",
      desc: "Gamified goal tracking that syncs with your emotional cycles.",
      bg: "bg-purple-50/50",
      accent: "text-soft-lavender"
    },
    {
      icon: <Smile className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />,
      title: "EQ Mastery",
      desc: "Deepen emotional vocabulary with interactive mood mapping.",
      bg: "bg-green-50/50",
      accent: "text-green-500"
    }
  ];

  return (
    <section id="skill-lab" className="py-16 sm:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 sm:mb-20 gap-6 sm:gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <span className="text-calm-blue font-black tracking-widest uppercase text-[10px] sm:text-xs mb-2 sm:mb-3 block">Immersive Training</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">The Lab: Interactive <br className="hidden sm:block" />Emotional Workouts.</h2>
            </div>
            <p className="text-slate-500 text-base sm:text-lg max-w-xs font-medium">
              We turn traditional therapy homework into engaging digital experiences.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-10 perspective-1000">
          {skills.map((skill, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div className={`group relative p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] ${skill.bg} border border-white/50 card-3d preserve-3d`}>
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-slate-300 group-hover:text-slate-900 transition-colors scale-75 sm:scale-100">
                  <ArrowUpRight size={32} />
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-6 sm:mb-10 group-hover:scale-105 transition-transform duration-500">
                  {skill.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4">{skill.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {skill.desc}
                </p>
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200/50">
                  <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${skill.accent}`}>Interactive Session</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillLab;
