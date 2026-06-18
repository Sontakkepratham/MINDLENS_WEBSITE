
import React, { useState, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { GoogleGenAI } from '@google/genai';
import { 
  Zap, 
  Brain, 
  Layers, 
  Wind, 
  Fingerprint, 
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
  Terminal,
  Loader2,
  BookOpen,
  Microscope,
  Database,
  Lock,
  ArrowRight,
  Monitor
} from 'lucide-react';
import Button from './ui/Button';

interface PlatformProps {
  onOpenBooking: () => void;
  onOpenScreener: () => void;
}

const Platform: React.FC<PlatformProps> = ({ onOpenBooking, onOpenScreener }) => {
  const [activeTab, setActiveTab] = useState<'science' | 'lab'>('lab');
  const [blueprintImg, setBlueprintImg] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Lab Preview State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewStep, setPreviewStep] = useState<'idle' | 'scanning' | 'result'>('idle');
  const [aiReport, setAiReport] = useState<string>('');
  const [scanProgress, setScanProgress] = useState(0);

  const generateScienceVisual = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = activeTab === 'science' 
        ? "A high-precision architectural blueprint of a neural network, clinical, technical, white background, minimalist blue lines."
        : "A futuristic glowing 3D geometric shape representing a complex human emotion, glass textures, soft volumetric lighting, minimalist.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] }
      });

      const part = response.candidates[0].content.parts.find((p: any) => p.inlineData);
      if (part) {
        setBlueprintImg(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (error) {
      setBlueprintImg("https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateScienceVisual();
  }, [activeTab]);

  const startPreview = async () => {
    setIsPreviewOpen(true);
    setPreviewStep('scanning');
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 2;
      });
    }, 50);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "You are the MindLens Lab Director. Generate a 2-sentence clinical synthesis of a 'Stable Gamma' state for a lab preview report. Use terms like 'high-fidelity', 'neural sync', and 'cognitive bandwidth'.",
      });
      setAiReport(response.text || "Neural synchronization confirmed. Cognitive bandwidth at peak capacity.");
    } catch (e) {
      setAiReport("Neural synchronization achieved. Spatial resolution indicates high cognitive plasticity.");
    }

    setTimeout(() => setPreviewStep('result'), 3000);
  };

  const labTools = [
    { icon: <Box />, title: "Spatial Mood Vault", desc: "Transforms moods into 3D geometric 'shards' stored in an encrypted clinical ledger.", badge: "Institutional" },
    { icon: <Activity />, title: "Neuro-Sync Games", desc: "Gamified CBT exercises designed to rewire neural pathways for resilience.", badge: "Clinical" },
    { icon: <Cpu />, title: "Gemini Synthesis", desc: "Advanced AI patterns used to build clinical briefings for your counselor.", badge: "AI Powered" },
    { icon: <Wind />, title: "Bio-Breathing", desc: "Visual-guided breathing that syncs with your spatial mood stabilization.", badge: "Real-time" }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      
      {/* Interactive Lab Preview Overlay */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[6000] bg-slate-950 flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="absolute top-8 left-8 flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-calm-blue rounded-xl flex items-center justify-center"><Terminal size={20} /></div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest">Neural Protocol</p>
              <p className="text-[10px] text-slate-500 font-bold">Lab Simulation v2.5</p>
            </div>
          </div>
          <button onClick={() => setIsPreviewOpen(false)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"><X size={24} /></button>

          {previewStep === 'scanning' ? (
            <div className="flex flex-col items-center gap-12 text-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full border-4 border-white/5 flex items-center justify-center">
                   <div className="absolute inset-0 border-t-4 border-calm-blue rounded-full animate-spin"></div>
                   <Scan size={64} className="text-white animate-pulse" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-white">Scanning Neural Shard...</h3>
                <div className="text-slate-500 font-mono text-xs">SYNCING: {scanProgress}%</div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center">
               <div className="relative group aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-calm-blue/20 blur-[100px] rounded-full animate-pulse-soft"></div>
                  <div className="w-64 h-64 bg-white/5 border-2 border-white/20 rounded-[40px] rotate-[30deg] animate-float flex items-center justify-center shadow-2xl">
                     <Box size={80} className="text-white" />
                  </div>
               </div>
               <div className="space-y-8 text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">Analysis Complete</div>
                  <h3 className="text-5xl font-black leading-tight">Spatial Shard: <br /><span className="text-calm-blue">Gamma Resonant</span></h3>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl">
                     <p className="text-slate-300 text-lg font-medium leading-relaxed italic">"{aiReport}"</p>
                  </div>
                  <div className="flex gap-4">
                     <Button variant="primary" className="rounded-2xl" onClick={onOpenBooking}>Consult with Nidhi</Button>
                     <Button variant="outline" className="border-white/10 text-white rounded-2xl" onClick={() => setIsPreviewOpen(false)}>Exit</Button>
                  </div>
               </div>
            </div>
          )}
        </div>
      )}

      <div className="container mx-auto px-6">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-24">
          <div className="bg-slate-100 p-2 rounded-[32px] flex items-center gap-2 border border-slate-200 shadow-inner">
            <button 
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-3 px-8 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'lab' ? 'bg-white text-calm-blue shadow-lg scale-105' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Monitor size={16} /> Interactive Lab
            </button>
            <button 
              onClick={() => setActiveTab('science')}
              className={`flex items-center gap-3 px-8 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'science' ? 'bg-white text-calm-blue shadow-lg scale-105' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Microscope size={16} /> Science & Research
            </button>
          </div>
        </div>

        {activeTab === 'lab' ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">
                    <ShieldCheck size={14} className="text-calm-blue" /> Institutional Access Active
                  </div>
                  <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">Your Personal <br /><span className="gradient-text">Emotional R&D.</span></h1>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">Experience the next generation of mental wellness tools. From 3D mood mapping to neuro-plasticity workouts.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="rounded-3xl gap-2 shadow-xl shadow-calm-blue/20" onClick={startPreview}><PlayCircle size={20} /> Launch Lab Preview</Button>
                    <Button variant="outline" size="lg" className="rounded-3xl border-slate-200 text-slate-600" onClick={onOpenBooking}>Connect to Clinical Expert</Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="relative group aspect-square flex items-center justify-center">
                  <div className="absolute -inset-10 bg-calm-blue/5 blur-[100px] rounded-full animate-pulse-soft"></div>
                  <div className="relative glass-card rounded-[48px] p-8 border-2 border-white shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                    {isGenerating || !blueprintImg ? <Loader2 className="animate-spin text-slate-300" size={48} /> : <img src={blueprintImg} alt="Lab Tool" className="w-full h-full object-contain opacity-80" />}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {labTools.map((tool, idx) => (
                <div key={idx} className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-8 text-calm-blue">{tool.icon}</div>
                   <h3 className="text-xl font-black text-slate-900 mb-3">{tool.title}</h3>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{tool.desc}</p>
                   <span className="text-[9px] font-black uppercase bg-slate-100 px-2 py-1 rounded text-slate-400">{tool.badge}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
              <Reveal>
                <div className="space-y-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-calm-blue rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-100"><BookOpen size={14} /> Peer Reviewed Framework</div>
                  <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">Precision Clinical <br />Metaphysics.</h2>
                  <div className="space-y-6">
                    <div className="flex gap-6">
                       <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg"><Database size={20} /></div>
                       <div>
                         <h4 className="font-black text-lg text-slate-900">Cognitive Topology</h4>
                         <p className="text-slate-500 font-medium text-sm leading-relaxed">We map emotions as structural objects in 3D space, based on neuro-plasticity research and cognitive behavioral theory.</p>
                       </div>
                    </div>
                    <div className="flex gap-6">
                       <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg"><Lock size={20} /></div>
                       <div>
                         <h4 className="font-black text-lg text-slate-900">Zero-Knowledge Vaults</h4>
                         <p className="text-slate-500 font-medium text-sm leading-relaxed">Your emotional telemetry is stored using decentralized shards. Only you and your authorized clinician hold the primary keys.</p>
                       </div>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-2xl border-slate-200">Download Whitepaper <ArrowRight size={18} className="ml-2" /></Button>
                </div>
              </Reveal>

              <div className="relative">
                 <div className="bg-slate-50 border border-slate-100 rounded-[60px] p-12 aspect-[4/5] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4a61ad 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                    {isGenerating || !blueprintImg ? <Loader2 className="animate-spin text-slate-200" size={64} /> : <img src={blueprintImg} alt="Science Blueprint" className="relative z-10 w-full h-full object-contain mix-blend-multiply" />}
                 </div>
              </div>
            </div>

            {/* Methodological Foundations */}
            <div className="mb-32">
              <Reveal>
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">
                    <Microscope size={14} className="text-calm-blue" /> Evidence-Based Paradigm
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Core Research Science Pillars</h3>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">
                    Under executive incubation by Gadoya Group of Companies Pvt Ltd, our empirical framework translates neuroscientific feedback into measurable therapeutic outcomes.
                  </p>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100/80 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                  <div className="w-14 h-14 bg-blue-50 text-calm-blue rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300">
                    <Layers size={24} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3">Cognitive Remapping</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-4">
                    Based on CBT & ACT protocols where abstract psychological tensions are restructured as spatial structures, activating parieto-frontal pathways.
                  </p>
                  <span className="text-[8px] font-black uppercase text-calm-blue bg-blue-50/50 px-2.5 py-1 rounded-lg">Clinical CBT+</span>
                </div>

                <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100/80 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                  <div className="w-14 h-14 bg-purple-50 text-soft-lavender rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300">
                    <Fingerprint size={24} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3">Therapeutic Biometrics</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-4">
                    Real-time galvanic response and pulse-rate integration mapped to 3D visual environments to establish homeostatic emotional regulation.
                  </p>
                  <span className="text-[8px] font-black uppercase text-soft-lavender bg-purple-50/50 px-2.5 py-1 rounded-lg">Biometric AI</span>
                </div>

                <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100/80 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                  <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300">
                    <Brain size={24} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3">Neural Synaptic Trails</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-4">
                    Visual telemetry trails representing behavioral activation sequences, facilitating self-directed cognitive reframing over longer durations.
                  </p>
                  <span className="text-[8px] font-black uppercase text-green-600 bg-green-50/50 px-2.5 py-1 rounded-lg">Neuro-Plasticity</span>
                </div>

                <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100/80 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300">
                    <Zap size={24} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3">Hemi-Spatial Synclines</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-4">
                    Rhythmic visual stimuli designed around bilateral simulation parameters to down-regulate hyper-aroused amygdalar activity safely.
                  </p>
                  <span className="text-[8px] font-black uppercase text-amber-600 bg-amber-50/50 px-2.5 py-1 rounded-lg font-mono">Bilateral Stim</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[60px] p-12 sm:p-20 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Sparkles size={300} /></div>
               <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                  <div className="flex-1 space-y-8">
                     <h2 className="text-4xl md:text-5xl font-black leading-tight">Institutional <br />Governance.</h2>
                     <p className="text-xl text-slate-400 font-medium leading-relaxed">MindLens is built in alignment with the World Health Organization (WHO) Comprehensive Mental Health Action Plan. Every AI model is audited for clinical safety and non-diagnostic ethics.</p>
                     <div className="flex gap-8">
                        <div className="text-center">
                           <div className="text-2xl font-black text-calm-blue mb-1">AES-256</div>
                           <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Encryption</div>
                        </div>
                        <div className="text-center">
                           <div className="text-2xl font-black text-calm-blue mb-1">SOC2</div>
                           <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Compliance</div>
                        </div>
                        <div className="text-center">
                           <div className="text-2xl font-black text-calm-blue mb-1">GDPR</div>
                           <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Privacy</div>
                        </div>
                     </div>
                  </div>
                  <Button variant="white" size="lg" className="rounded-2xl font-black">Institutional Partnership Inquiry</Button>
               </div>
            </div>

            {/* Bottom CTA Section to Book or Screen */}
            <Reveal>
              <div className="mt-24 py-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl text-center md:text-left">
                  <h2 className="text-3xl font-black text-slate-900 mb-4">Visualize Your Emotional Baseline</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Ready to see MindLens in full force? Run our standardized clinical screener or schedule an in-depth private consultation session.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <Button onClick={onOpenScreener} variant="outline" className="w-full sm:w-auto py-5 px-8 rounded-2xl font-bold border-slate-200 hover:border-calm-blue hover:text-calm-blue">Launch Free Screener</Button>
                  <Button onClick={onOpenBooking} variant="primary" className="w-full sm:w-auto py-5 px-8 rounded-2xl font-black shadow-xl shadow-calm-blue/20">Book Clinical Session</Button>
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </div>
  );
};

export default Platform;
