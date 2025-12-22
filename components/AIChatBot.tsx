
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, Mic, MicOff, Volume2, Waves, ShieldCheck } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';
import Button from './ui/Button';

// Audio Helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Hello! I am your MindLens Assistant. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Live API Refs
  const liveSessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const [voiceVolume, setVoiceVolume] = useState(0);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSendText = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: { systemInstruction: "You are MindLens AI. Compassionate, clinical, helpful." }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm listening." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "Service temporarily unavailable." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const startLiveSession = async () => {
    try {
      setIsLiveActive(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const outCtx = audioContextRef.current;
      const outNode = outCtx.createGain();
      outNode.connect(outCtx.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            const inCtx = new AudioContext({ sampleRate: 16000 });
            const source = inCtx.createMediaStreamSource(stream);
            const processor = inCtx.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              sessionPromise.then(s => s.sendRealtimeInput({ 
                media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } 
              }));
            };
            source.connect(processor);
            processor.connect(inCtx.destination);
          },
          onmessage: async (msg) => {
            const base64 = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const buf = await decodeAudioData(decode(base64), outCtx, 24000, 1);
              const src = outCtx.createBufferSource();
              src.buffer = buf;
              src.connect(outNode);
              src.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buf.duration;
              setVoiceVolume(1);
              src.onended = () => setVoiceVolume(0);
            }
          },
          onclose: () => stopLiveSession(),
          onerror: () => stopLiveSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
          systemInstruction: "You are MindLens Live. A warm clinical psychologist providing immediate emotional grounding."
        }
      });
      liveSessionRef.current = await sessionPromise;
    } catch (e) {
      console.error(e);
      stopLiveSession();
    }
  };

  const stopLiveSession = () => {
    setIsLiveActive(false);
    setVoiceVolume(0);
    if (liveSessionRef.current) liveSessionRef.current.close();
    if (audioContextRef.current) audioContextRef.current.close();
  };

  return (
    <div className="fixed bottom-6 left-6 z-[5500] pointer-events-none w-fit">
      <section className={`mb-4 w-[calc(100vw-3rem)] sm:w-[420px] glass-card rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[550px] transition-all duration-500 transform origin-bottom-left pointer-events-auto ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}`}>
        
        {/* Chat Header */}
        <div className="bg-calm-blue p-6 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <span className="font-black text-sm tracking-tight block">MindLens Live</span>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                {isLiveActive ? 'Live Clinical Session' : 'Secured Portal'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { stopLiveSession(); setMode(mode === 'text' ? 'voice' : 'text'); }} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              {mode === 'text' ? <Mic size={20} /> : <MessageSquare size={20} />}
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {mode === 'text' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/50 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-[24px] max-w-[85%] text-sm font-medium ${m.role === 'user' ? 'bg-calm-blue text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="flex justify-start"><div className="p-4 rounded-2xl bg-white shadow-sm flex gap-1 animate-pulse"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div></div></div>}
            </div>
            <div className="p-5 bg-white border-t border-slate-100 flex gap-3">
              <input type="text" className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-calm-blue/20" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendText()} placeholder="Type message..." />
              <button onClick={handleSendText} className="bg-calm-blue text-white p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"><Send size={18} /></button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-900 text-white relative">
            <div className={`w-40 h-40 rounded-full border-4 flex items-center justify-center transition-all duration-700 ${isLiveActive ? 'border-calm-blue ring-[20px] ring-calm-blue/10 animate-pulse' : 'border-slate-700'}`}>
              {isLiveActive ? (
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-1 bg-calm-blue rounded-full animate-bounce" style={{ height: `${20 + (voiceVolume ? Math.random() * 60 : 0)}px`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              ) : <Mic size={48} className="text-slate-700" />}
            </div>
            
            <div className="text-center mt-12 space-y-4">
              <h4 className="text-2xl font-black">{isLiveActive ? 'Listening...' : 'Start Voice Session'}</h4>
              <p className="text-slate-400 text-sm max-w-[240px] mx-auto leading-relaxed">
                Connect directly for clinical grounding. Your voice is encrypted and processed in real-time.
              </p>
            </div>

            <div className="mt-16 flex gap-4">
              {isLiveActive ? (
                <Button onClick={stopLiveSession} variant="primary" className="bg-red-500 hover:bg-red-600 border-none px-10 py-5 rounded-full">End Session</Button>
              ) : (
                <Button onClick={startLiveSession} variant="primary" className="px-10 py-5 rounded-full shadow-2xl shadow-calm-blue/40">Enter Live Lab</Button>
              )}
            </div>

            <div className="absolute bottom-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
              <ShieldCheck size={14} className="text-green-500" /> End-to-End Encrypted Link
            </div>
          </div>
        )}
      </section>

      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-calm-blue text-white rounded-[24px] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all pointer-events-auto relative group">
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping-slow"></div>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default AIChatBot;
