
import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from './ui/Reveal';
import { GoogleGenAI } from '@google/genai';
import { 
  Zap, 
  Brain, 
  Layers, 
  Wind, 
  Fingerprint, 
  Search, 
  Sparkles, 
  LineChart, 
  ShieldCheck, 
  ChevronRight, 
  PlayCircle,
  Activity,
  Box,
  Cpu,
  X,
  Scan,
  ShieldAlert,
  Dna,
  Terminal,
  Loader2
} from 'lucide-react';
import Button from './ui/Button';

interface HomeLabProps {
  onOpenBooking: () => void;
}

const HomeLab: React.FC<HomeLabProps> = ({ onOpenBooking }) => {
  const [blueprintImg, setBlueprintImg] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewStep, setPreviewStep] = useState<'idle' | 'scanning' | 'result'>('idle');
  const [aiReport, setAiReport] = useState<string>('');
  const [scanProgress, setScanProgress] = useState(0);

  const generateLabVisual = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A clean, clinical blueprint of a human mind made of glowing blue circuit lines and geometric shapes. Minimalist white background, blueprint style, high-tech psychological visualization, 8k, architectural precision.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] }
      });

      const part = response.candidates[0].content.parts.find((p: any) => p.inlineData);
      if (part) {
        setBlueprintImg(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (error) {
      console.error("Error generating lab visual:", error);
      setBlueprintImg("https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateLabVisual();
  }, []);

  const startPreview = async () => {
    setIsPreviewOpen(true);
    setPreviewStep('scanning');
    setScanProgress(0);
    
    // Progress Animation
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // AI Report Generation
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "You are the MindLens Lab Director. Generate a very brief (2-3 sentences) clinical synthesis of a 'Calm High-Beta' mental state. Use professional, futuristic terminology like 'spatial resolution', 'neural plasticity', and 'cognitive frequency'. Keep it authoritative and encouraging.",
        config: { temperature: 0.8 }
      });
      setAiReport(response.text || "Neural synchronization achieved. Spatial resolution indicates high cognitive plasticity.");
    } catch (e) {
      setAiReport("Neural synchronization achieved. Spatial resolution indicates high cognitive plasticity and optimized focus states.");
    }

    setTimeout(() => {
      setPreviewStep('result');
    }, 3000);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewStep('idle');
    setAiReport('');
  };

  const labTools = [
    {
      icon: <Box className="text-calm-blue" />,
      title: "Spatial Mood Vault",
      desc: "Every mood you log is transformed into a 3D geometric 'shard'. Over time, see your emotional landscape as a physical map.",
      badge: "Institutional Grade"
    },
    {
      icon: <Activity className="text-soft-lavender" />,
      title: "Neuro-Sync Games",
      desc: "Gamified CBT exercises designed to rewire neural pathways for resilience. Real-time feedback loops based on your input speed.",
      badge: "CBT Validated"
    },
    {
      icon: <Cpu className="text-calm-blue" />,
      title: "Gemini Synthesis Hub",
      desc: "Advanced AI that looks for patterns in your spatial logs. It builds a 'Clinical Briefing' for your counselor before every session.",
      badge: "AI Powered"
    },
    {
      icon: <Wind className="text-green-500" />,
      title: "Bio-Breathing Chamber",
      desc: "Visual-guided breathing that syncs with your heart rate (via phone sensor). Watch your 3D mood vault stabilize as you breathe.",
      badge: "Real-time Feedback"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white selection:bg-calm-blue/10 selection:text-calm-blue min-h-screen">
      
      {/* Interactive Lab Preview Overlay */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[6000] bg-slate-950 flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="absolute top-8 left-8 flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-calm-blue rounded-xl flex items-center justify-center">
              <Terminal size={20} />
            </div>
            <div>
              <p className="font-black text-xs uppercase tracking-[0.2em]">Neural Protocol</p>
              <p className="text-[10px] text-slate-500 font-bold">Active Lab Simulation</p>
            </div>
          </div>
          
          <button 
            onClick={closePreview}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={24} />
          </button>

          {previewStep === 'scanning' ? (
            <div className="flex flex-col items-center gap-12 text-center animate-in zoom-in-95 duration-700">
              <div className="relative">
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-white/5 flex items-center justify-center relative">
                   <div className="absolute inset-0 border-t-4 border-calm-blue rounded-full animate-spin"></div>
                   <div className="absolute inset-4 border-b-4 border-soft-lavender rounded-full animate-spin duration-[3000ms]"></div>
                   <Scan size={64} className="text-white animate-pulse" />
                </div>
                {/* Circular Scan Progress */}
                <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] -rotate-90">
                  <circle 
                    cx="50%" cy="50%" r="48%" 
                    fill="none" 
                    stroke="rgba(74,97,173,0.2)" 
                    strokeWidth="2"
                  />
                  <circle 
                    cx="50%" cy="50%" r="48%" 
                    fill="none" 
                    stroke="#4a61ad" 
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={100 - scanProgress}
                    className="transition-all duration-100"
                  />
                </svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Initializing Neural Scan...</h3>
                <div className="flex items-center justify-center gap-4 text-slate-500 font-mono text-xs">
                  <span>FREQ: 432Hz</span>
                  <span>LAT: 12ms</span>
                  <span>SYNC: {scanProgress}%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center animate-in slide-in-from-bottom-10 duration-1000">
               {/* 3D Spatial Shard */}
               <div className="relative group aspect-square flex items-center justify-center perspective-1000 preserve-3d">
                  <div className="absolute inset-0 bg-calm-blue/20 blur-[100px] rounded-full animate-pulse-soft"></div>
                  {/* Interactive Shard Concept */}
                  <div className="w-48 h-48 sm:w-64 sm:h-64 bg-white/5 border-2 border-white/20 rounded-[40px] rotate-[30deg] animate-float flex items-center justify-center preserve-3d shadow-[0_0_50px_rgba(74,97,173,0.3)]">
                     <div className="absolute inset-0 bg-gradient-to-tr from-calm-blue/40 to-soft-lavender/40 rounded-[40px] border border-white/20"></div>
                     <Box size={80} className="text-white drop-shadow-2xl" />
                     {/* Floating nodes around the shard */}
                     <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center animate-bounce">
                        <Activity size={20} className="text-calm-blue" />
                     </div>
                     <div className="absolute -bottom-8 -left-4 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center animate-float-slow">
                        <Zap size={24} className="text-soft-lavender" />
                     </div>
                  </div>
               </div>

               {/* AI Synthesis Report */}
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                    <ShieldCheck size={14} /> Analysis Complete
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-black text-white leading-[1.1]">Spatial Shard: <br /><span className="text-calm-blue">Alpha-Beta Resonant</span></h3>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl">
                     <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <Brain size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">Clinical Synthesis</span>
                     </div>
                     {!aiReport ? (
                       <div className="flex items-center gap-3 text-slate-500">
                         <Loader2 className="animate-spin" size={20} />
                         <span className="font-medium">Synthesizing report...</span>
                       </div>
                     ) : (
                       <p className="text-slate-300 text-lg font-medium leading-relaxed italic">
                         "{aiReport}"
                       </p>
                     )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <Button variant="primary" className="rounded-2xl gap-2" onClick={onOpenBooking}>
                        Consult with Nidhi <ChevronRight size={18} />
                     </Button>
                     <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-2xl" onClick={closePreview}>
                        Reset Simulation
                     </Button>
                  </div>
               </div>
            </div>
          )}
        </div>
      )}
      
      {/* Blueprint Hero Section */}
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <Reveal>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">
                <ShieldCheck size={14} className="text-calm-blue" /> Secured Home Lab v2.5
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                Your Personal <br />
                <span className="gradient-text">Emotional R&D.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                The Home Lab is where your daily growth happens. We provide the equipment—from spatial mapping to neuro-workouts—to make wellness tangible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-3xl gap-2 shadow-xl shadow-calm-blue/20" onClick={startPreview}>
                  <PlayCircle size={20} /> Launch Lab Preview
                </Button>
                <Button variant="outline" size="lg" className="rounded-3xl border-slate-200 text-slate-600" onClick={onOpenBooking}>
                   Meet the Lab Director
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative group">
              <div className="absolute -inset-10 bg-calm-blue/5 blur-[100px] rounded-full animate-pulse-soft"></div>
              <div className="relative glass-card rounded-[48px] p-6 border-2 border-white shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                {isGenerating || !blueprintImg ? (
                  <div className="flex flex-col items-center gap-4 text-slate-300">
                    <Brain size={64} className="animate-pulse" />
                    <p className="font-black text-[10px] uppercase tracking-widest">Rendering Blueprint...</p>
                  </div>
                ) : (
                  <img src={blueprintImg} alt="Mind Blueprint" className="w-full h-full object-cover rounded-[32px] opacity-80 group-hover:opacity-100 transition-opacity" />
                )}
                
                {/* Floating Meta-Data */}
                <div className="absolute top-12 left-12 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl scale-90 sm:scale-100">
                   <div className="flex items-center gap-2 mb-1">
                      <LineChart size={14} className="text-calm-blue" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Activity Level</span>
                   </div>
                   <div className="font-black text-slate-900">88% Optimized</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Feature Grid: The Equipment */}
        <Reveal>
          <div className="text-center mb-20">
             <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Laboratory Equipment</h2>
             <p className="text-slate-500 font-medium max-w-xl mx-auto">Standard issue tools for every MindLens user to monitor, analyze, and optimize their mental state.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {labTools.map((tool, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="group bg-slate-50 rounded-[40px] p-10 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-calm-blue/20 transition-all duration-500 flex gap-8 items-start">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                    {React.cloneElement(tool.icon as React.ReactElement, { size: 32 })}
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-black text-slate-900">{tool.title}</h3>
                       <span className="text-[9px] font-black uppercase bg-white px-2 py-1 rounded-md text-slate-400 border border-slate-100">{tool.badge}</span>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed">{tool.desc}</p>
                    <button className="flex items-center gap-2 text-xs font-black text-calm-blue uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                       Learn Protocol <ChevronRight size={14} />
                    </button>
                 </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Integration Section */}
        <Reveal>
          <div className="bg-slate-900 rounded-[60px] p-12 sm:p-20 text-white relative overflow-hidden text-center lg:text-left">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Cpu size={300} /></div>
             <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                      <Layers size={14} /> Ecosystem Sync
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black leading-tight">Sync Your Biology <br />with the Lab.</h2>
                   <p className="text-xl text-slate-400 font-medium leading-relaxed">
                      MindLens Home Lab integrates with Apple Health and Google Fit. We pull your sleep data, heart rate variability (HRV), and activity levels to create a holistic spatial model of your well-being.
                   </p>
                   <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-40">
                      <div className="font-black text-lg tracking-tighter">Apple Health</div>
                      <div className="font-black text-lg tracking-tighter">Google Fit</div>
                      <div className="font-black text-lg tracking-tighter">WHOOP Integration</div>
                   </div>
                </div>
                <div className="lg:w-1/3 flex flex-col gap-4">
                   <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                      <h4 className="font-black text-xl mb-2">Institutional API</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">Export clinical-grade telemetry directly to your primary healthcare provider or insurance carrier.</p>
                   </div>
                   <Button variant="white" size="lg" className="rounded-2xl font-black">Register Device</Button>
                </div>
             </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default HomeLab;
