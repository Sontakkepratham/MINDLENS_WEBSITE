
import React, { useState, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, History, Heart, Target, Loader2, RefreshCw, Wand2, Info } from 'lucide-react';
import Button from './ui/Button';

const AboutUsPage: React.FC = () => {
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
      if (part) {
        const newImages = [...images];
        newImages[index] = `data:image/png;base64,${part.inlineData.data}`;
        setImages(newImages);
      }
    } catch (error) {
      console.error(`Error generating image ${index}:`, error);
    } finally {
      const resetLoadingStates = [...loadingStates];
      resetLoadingStates[index] = false;
      setLoadingStates(resetLoadingStates);
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
        return part ? `data:image/png;base64,${part.inlineData.data}` : '';
      };

      const result = [getBase64(resp1), getBase64(resp2)].filter(Boolean);
      if (result.length > 0) setImages(result);
      else throw new Error("No images generated");

    } catch (error) {
      console.error("Error generating brand images:", error);
      // Fallback images from Unsplash if API fails
      setImages([
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200"
      ]);
    } finally {
      setIsLoading(false);
      setLoadingStates([false, false]);
    }
  };

  useEffect(() => {
    generateBrandImages();
  }, []);

  return (
    <div className="pt-20 pb-20 lg:pb-32 bg-white overflow-hidden">
      {/* Dynamic Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-32 flex items-center justify-center min-h-[60vh] lg:min-h-[70vh] bg-mesh-gradient bg-mesh">
        <div className="absolute inset-0 perspective-1000 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-calm-blue/10 blur-[60px] sm:blur-[100px] animate-pulse-soft"></div>
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 sm:w-96 sm:h-96 bg-soft-lavender/10 blur-[80px] sm:blur-[120px] animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-white/50 backdrop-blur-md text-calm-blue rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6 sm:mb-10 border border-white/50 shadow-sm">
                <History size={14} /> The Genesis
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

      <div className="container mx-auto px-6 mt-16 sm:mt-32">
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
                <div className="relative rounded-[32px] sm:rounded-[50px] overflow-hidden bg-slate-100 shadow-xl border-2 sm:border-4 border-white card-3d aspect-square group">
                  {loadingStates[0] ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                      <Loader2 size={48} className="animate-spin text-calm-blue" />
                      <p className="font-black text-[10px] uppercase tracking-widest">Rendering Vision...</p>
                    </div>
                  ) : (
                    <>
                      <img src={images[0]} alt="Psychology AI" className="w-full h-full object-cover" />
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
                <div className="relative rounded-[32px] sm:rounded-[50px] overflow-hidden bg-slate-100 shadow-xl border-2 sm:border-4 border-white card-3d aspect-square group">
                  {loadingStates[1] ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                      <Loader2 size={48} className="animate-spin text-soft-lavender" />
                      <p className="font-black text-[10px] uppercase tracking-widest">Synthesizing Care...</p>
                    </div>
                  ) : (
                    <>
                      <img src={images[1]} alt="Future Therapy" className="w-full h-full object-cover" />
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
          <div className="mt-24 sm:mt-40 bg-slate-900 rounded-[40px] sm:rounded-[80px] p-10 sm:p-20 text-white text-center relative overflow-hidden group">
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
      </div>
    </div>
  );
};

export default AboutUsPage;
