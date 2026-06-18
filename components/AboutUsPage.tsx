
import React, { useState, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, History, Heart, Target, Loader2, RefreshCw, Wand2, Info } from 'lucide-react';
import Button from './ui/Button';

interface AboutUsPageProps {
  onOpenBooking: () => void;
  onOpenScreener: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onOpenBooking, onOpenScreener }) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([false, false]);

  const PROMPTS = {
    psychology: "A high-end conceptual render of a human silhouette filled with a nebula of glowing clinical data, soft blue and lavender tones, minimalist background. Cinematic lighting, 8k resolution, symbolic of deep psychological insight.",
    therapy: "A futuristic therapist's room with floating holographic UI elements representing emotions, high-end materials, soft morning light. Photorealistic, serene, representing the fusion of professional care and technology."
  };

  const generateSingleImage = async (index: number) => {
    const newLoadingStates = [...loadingStates];
    newLoadingStates[index] = true;
    setLoadingStates(newLoadingStates);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = index === 0 ? PROMPTS.psychology : PROMPTS.therapy;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] }
      });

      const part = response.candidates[0].content.parts.find((p: any) => p.inlineData);
      if (part && part.inlineData) {
        setImages(prev => {
          const next = [...prev];
          next[index] = `data:image/png;base64,${part.inlineData.data}`;
          return next;
        });
      }
    } catch (error) {
      console.error(`Error generating image ${index}:`, error);
    } finally {
      setLoadingStates(prev => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };

  const generateBrandImages = async () => {
    setIsLoading(true);
    setLoadingStates([true, true]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const [resp1, resp2] = await Promise.all([
        ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: PROMPTS.psychology }] }
        }),
        ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: PROMPTS.therapy }] }
        })
      ]);

      const getBase64 = (response: any) => {
        const part = response.candidates[0].content.parts.find((p: any) => p.inlineData);
        return part && part.inlineData ? `data:image/png;base64,${part.inlineData.data}` : '';
      };

      const img1 = getBase64(resp1);
      const img2 = getBase64(resp2);

      if (img1 || img2) {
        setImages([img1 || images[0], img2 || images[1]].filter(Boolean));
      } else {
        throw new Error("No images generated");
      }

    } catch (error) {
      console.error("Error generating brand images:", error);
      if (images.length === 0) {
        setImages([
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200"
        ]);
      }
    } finally {
      setIsLoading(false);
      setLoadingStates([false, false]);
    }
  };

  useEffect(() => {
    generateBrandImages();
  }, []);

  const ImagePlaceholder = ({ color }: { color: string }) => (
    <div className="w-full h-full bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-12">
      <div className={`absolute inset-0 bg-gradient-to-tr ${color} opacity-5 animate-pulse-soft`}></div>
      <div className="relative flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-calm-blue animate-spin shadow-inner"></div>
        <div className="space-y-3 text-center">
          <div className="h-2 w-32 bg-slate-200 rounded-full animate-pulse mx-auto"></div>
          <div className="h-1.5 w-20 bg-slate-100 rounded-full animate-pulse mx-auto"></div>
        </div>
      </div>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-[shimmer_2s_infinite]"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-mesh-gradient bg-mesh overflow-hidden">
      {/* Dynamic Animated Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-calm-blue/10 blur-[100px] rounded-full animate-float-slow"></div>
        <div className="absolute top-[60%] right-[10%] w-[500px] h-[500px] bg-soft-lavender/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-blue-300/5 blur-[80px] rounded-full animate-pulse-soft"></div>
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
      </div>

      {/* Dynamic Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 flex items-center justify-center min-h-[60vh] lg:min-h-[70vh]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 sm:mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-white/70 backdrop-blur-md text-calm-blue rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest border border-white shadow-sm">
                  <History size={14} /> The Genesis
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-white/70 backdrop-blur-md text-slate-500 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest border border-white shadow-sm">
                  An Initiative by Gadoya Group Of Companies Pvt Ltd
                </div>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 mb-6 sm:mb-10 leading-[1.1] sm:leading-[1] tracking-tighter">
                A Spatial Leap in <br />
                <span className="gradient-text">Emotional Health.</span>
              </h1>
              <p className="text-lg sm:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto">
                MindLens was founded on the principle that your internal world deserves a clearer, more precise lens through which to be understood.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-6 relative z-10">
        {/* Mission & Vision Section */}
        <Reveal>
          <div className="grid md:grid-cols-2 gap-8 mb-24 sm:mb-40">
            <div className="glass-card p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] border border-white flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300 shadow-[0_30px_60px_-15px_rgba(74,97,173,0.08)]">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-calm-blue mb-6">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">Our Mission</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                  To democratize emotional intelligence and high-caliber psychology care through spatial visualization, immersive evidence-based tools, and clinical transparency. We empower individuals to visualize their emotional states and process them constructively.
                </p>
              </div>
              <div className="text-calm-blue font-black tracking-widest text-[10px] uppercase">Empowering Everyday Minds</div>
            </div>
            
            <div className="glass-card p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] border border-white flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300 shadow-[0_30px_60px_-15px_rgba(113,136,214,0.08)]">
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-soft-lavender mb-6">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">Our Vision</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                  To establish a world where mental well-being is not just active in crisis, but integrated effortlessly into daily human growth. We envision MindLens as the global gold standard for spatial-enhanced cognitive therapy and clinical AI integration.
                </p>
              </div>
              <div className="text-soft-lavender font-black tracking-widest text-[10px] uppercase">Reimagining Cognitive Evolution</div>
            </div>
          </div>
        </Reveal>

        <div className="space-y-24 sm:space-y-40">
          {/* Psychology AI Section */}
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-6 flex items-center justify-center lg:justify-start gap-4">
                  <Heart className="text-calm-blue" size={32} />
                  Precision Clinical Care
                </h2>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-xl text-slate-500 leading-relaxed font-medium">
                  <p>Our platform isn't just an interface; it's a calibrated environment. We've taken decades of clinical research and applied spatial design thinking to make healing feel intuitive.</p>
                  <p>By merging CBT protocols with immersive feedback loops, we help users visualize progress in real-time, making internal growth tangible.</p>
                </div>
              </div>
              <div className="relative group perspective-1000">
                <div className="absolute -inset-4 bg-gradient-to-tr from-calm-blue to-soft-lavender opacity-10 blur-3xl rounded-[40px] sm:rounded-[60px]"></div>
                <div className="relative rounded-[32px] sm:rounded-[50px] overflow-hidden bg-white shadow-xl border-2 sm:border-4 border-white card-3d aspect-square group">
                  {loadingStates[0] || !images[0] ? (
                    <ImagePlaceholder color="from-calm-blue" />
                  ) : (
                    <>
                      <img src={images[0]} alt="Psychology AI" className="w-full h-full object-cover transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button 
                          variant="white" 
                          size="sm" 
                          className="gap-2 rounded-xl" 
                          onClick={() => generateSingleImage(0)}
                          disabled={loadingStates[0]}
                        >
                          <RefreshCw size={16} className={loadingStates[0] ? 'animate-spin' : ''} />
                          Regenerate Visual
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Future Therapy Section */}
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 relative group perspective-1000">
                <div className="absolute -inset-4 bg-gradient-to-bl from-soft-lavender to-calm-blue opacity-10 blur-3xl rounded-[40px] sm:rounded-[60px]"></div>
                <div className="relative rounded-[32px] sm:rounded-[50px] overflow-hidden bg-white shadow-xl border-2 sm:border-4 border-white card-3d aspect-square group">
                  {loadingStates[1] || !images[1] ? (
                    <ImagePlaceholder color="from-soft-lavender" />
                  ) : (
                    <>
                      <img src={images[1]} alt="Future Therapy" className="w-full h-full object-cover transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button 
                          variant="white" 
                          size="sm" 
                          className="gap-2 rounded-xl" 
                          onClick={() => generateSingleImage(1)}
                          disabled={loadingStates[1]}
                        >
                          <RefreshCw size={16} className={loadingStates[1] ? 'animate-spin' : ''} />
                          Regenerate Visual
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-6 flex items-center justify-center lg:justify-start gap-4">
                  <Target className="text-soft-lavender" size={32} />
                  The Next Human Interface
                </h2>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-xl text-slate-500 leading-relaxed font-medium">
                  <p>We believe the future of therapy is hybrid. A seamless hand-off between high-resolution clinical tracking and deep human empathy.</p>
                  <p>MindLens acts as the connective tissue, ensuring that no data point is lost and no emotional nuance is overlooked during your wellness journey.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* AI Visuals Lab Call to Action */}
        <Reveal>
          <div className="mt-24 sm:mt-40 mb-20 sm:mb-32 bg-slate-900 rounded-[40px] sm:rounded-[80px] p-10 sm:p-20 text-white text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-mesh-gradient opacity-10 animate-mesh bg-mesh"></div>
             <div className="relative z-10 max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-3 px-4 py-2 bg-calm-blue/20 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-8 border border-calm-blue/30">
                 <Wand2 size={16} /> AI Visuals Lab
               </div>
               <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 leading-tight">Visualizing the Ineffable.</h3>
               <p className="text-sm sm:text-xl text-slate-400 mb-8 sm:mb-12 font-medium">
                 Our brand is as dynamic as the minds we serve. Experience our real-time visual evolution powered by Gemini 2.5 Image Engine.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Button 
                  variant="white" 
                  size="lg" 
                  onClick={generateBrandImages} 
                  disabled={isLoading}
                  className="gap-3 shadow-2xl w-full sm:w-auto px-10 py-5 rounded-3xl"
                 >
                   {isLoading ? <Loader2 className="animate-spin" size={22} /> : <RefreshCw size={22} />}
                   {isLoading ? 'Synthesizing...' : 'Regenerate Entire Gallery'}
                 </Button>
                 
                 <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <Info size={14} className="text-calm-blue" /> Unique variations every time
                 </div>
               </div>
             </div>
          </div>
        </Reveal>

        {/* Call to Action Section */}
        <Reveal>
          <div className="mt-20 py-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Start Your Healing Journey Today.</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Take our standardized clinical screener to establish your baseline or book a direct premium session with Psychologist Nidhi Gadoya.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button onClick={onOpenScreener} variant="outline" className="w-full sm:w-auto py-5 px-8 rounded-2xl font-bold border-slate-200 hover:border-calm-blue hover:text-calm-blue">Launch Free Screener</Button>
              <Button onClick={onOpenBooking} variant="primary" className="w-full sm:w-auto py-5 px-8 rounded-2xl font-black shadow-xl shadow-calm-blue/20">Book Clinical Session</Button>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;
