
import React, { useState, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { GoogleGenAI } from '@google/genai';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, MessageSquare, HelpCircle, Instagram, Linkedin } from 'lucide-react';
import Button from './ui/Button';

const ContactUsPage: React.FC = () => {
  const [supportImage, setSupportImage] = useState<string>('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    number: '',
    purpose: 'General Inquiry',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const phoneNumber = "+91 93214 08094";
  const cleanPhone = "919321408094";
  const instagramUrl = "https://www.instagram.com/yourmindlens?igsh=Y3hmMXlnZTB6cjRy";
  const linkedinUrl = "https://www.linkedin.com/company/ngcreationsofficial/";

  const generateSupportImage = async () => {
    setIsLoadingImage(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A minimalist, professional workspace with a cup of herbal tea, a sleek tablet showing a calming blue interface with a heart icon, and a small green plant. Soft, warm natural light. 8k resolution, serene and helpful atmosphere, high-end photography style.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] }
      });

      const part = response.candidates[0].content.parts.find((p: any) => p.inlineData);
      if (part) {
        setSupportImage(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (error) {
      console.error("Error generating support image:", error);
      setSupportImage("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200");
    } finally {
      setIsLoadingImage(false);
    }
  };

  useEffect(() => {
    generateSupportImage();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-calm-blue font-bold tracking-wider uppercase text-sm mb-2 block">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">We're Here to <span className="gradient-text">Listen</span>.</h1>
            <p className="text-lg text-slate-600">
              Have questions about MindLens? Whether you're a potential user, a clinician, or a partner, we'd love to hear from you.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Details & Image */}
          <Reveal>
            <div className="space-y-12">
              <div className="relative group rounded-[40px] overflow-hidden shadow-2xl bg-slate-100 aspect-[4/3]">
                {isLoadingImage ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                    <Loader2 size={48} className="animate-spin text-calm-blue" />
                    <p className="font-medium animate-pulse">Visualizing support...</p>
                  </div>
                ) : (
                  <img src={supportImage} alt="MindLens Support Environment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={20} className="text-calm-blue" />
                    <span className="text-xs font-bold uppercase tracking-widest">Our Support Philosophy</span>
                  </div>
                  <p className="text-lg font-medium">Humans first, technology second.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <a href="mailto:info.mindlens@gmail.com" className="flex items-start gap-4 p-6 bg-blue-50/50 rounded-3xl border border-blue-100 transition-all hover:bg-white hover:shadow-xl group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-calm-blue shadow-sm group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Us</h4>
                    <p className="text-sm text-slate-600">info.mindlens@gmail.com</p>
                    <p className="text-xs text-slate-400 mt-1">Response in 24h</p>
                  </div>
                </a>

                <a 
                  href={`https://wa.me/${cleanPhone}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-4 p-6 bg-purple-50/50 rounded-3xl border border-purple-100 transition-all hover:bg-white hover:shadow-xl group"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-soft-lavender shadow-sm group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">WhatsApp Us</h4>
                    <p className="text-sm text-slate-600">{phoneNumber}</p>
                    <p className="text-xs text-slate-400 mt-1">Instant Chat Available</p>
                  </div>
                </a>

                {/* Social Links on Contact Page */}
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-4 p-6 bg-pink-50/50 rounded-3xl border border-pink-100 transition-all hover:bg-white hover:shadow-xl group"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-600 shadow-sm group-hover:scale-110 transition-transform">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Instagram</h4>
                    <p className="text-sm text-slate-600">@yourmindlens</p>
                    <p className="text-xs text-slate-400 mt-1">Daily Wellness Tips</p>
                  </div>
                </a>

                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-4 p-6 bg-blue-50/50 rounded-3xl border border-blue-100 transition-all hover:bg-white hover:shadow-xl group"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-700 shadow-sm group-hover:scale-110 transition-transform">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">LinkedIn</h4>
                    <p className="text-sm text-slate-600">MindLens Official</p>
                    <p className="text-xs text-slate-400 mt-1">Professional Updates</p>
                  </div>
                </a>

                <div className="sm:col-span-2 flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Our Office</h4>
                    <p className="text-sm text-slate-600">Kandivali West,</p>
                    <p className="text-sm text-slate-600">Mumbai, India, 400067</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={200}>
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl p-8 md:p-12">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Enter your full name"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-calm-blue/20 focus:border-calm-blue outline-none transition-all"
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email ID</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-calm-blue/20 focus:border-calm-blue outline-none transition-all"
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">Mobile Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-calm-blue/20 focus:border-calm-blue outline-none transition-all"
                        value={formState.number}
                        onChange={e => setFormState({...formState, number: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Purpose for Contacting</label>
                    <select 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-calm-blue/20 focus:border-calm-blue outline-none transition-all appearance-none cursor-pointer"
                      value={formState.purpose}
                      onChange={e => setFormState({...formState, purpose: e.target.value})}
                    >
                      <option>General Inquiry</option>
                      <option>Therapy Sessions</option>
                      <option>Technical Support</option>
                      <option>Professional Partnership</option>
                      <option>Feedback & Suggestions</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Note for Us</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Tell us a bit more about how we can help..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-calm-blue/20 focus:border-calm-blue outline-none transition-all resize-none"
                      value={formState.note}
                      onChange={e => setFormState({...formState, note: e.target.value})}
                    ></textarea>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full py-5 gap-2 shadow-xl shadow-calm-blue/20"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20} /> Submit Inquiry</>}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Thank You!</h3>
                  <p className="text-slate-600 mb-10 text-lg">
                    We've received your note, {formState.name.split(' ')[0]}. A member of our clinical support team will reach out to you at {formState.email} or {formState.number} shortly.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setIsSuccess(false);
                    setFormState({ name: '', email: '', number: '', purpose: 'General Inquiry', note: '' });
                  }} className="w-full md:w-auto">
                    Send Another Note
                  </Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* FAQ Section */}
        <Reveal>
          <div className="mt-32 pt-20 border-t border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
                <HelpCircle className="text-soft-lavender" /> Common Questions
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 bg-slate-50 rounded-3xl">
                <h4 className="font-bold text-slate-900 mb-3">Is MindLens covered by insurance?</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We are currently finalizing partnerships with several major insurance providers. At this stage, sessions with Dr. Nidhi can be claimed as out-of-network services.
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl">
                <h4 className="font-bold text-slate-900 mb-3">Is my data shared with my counselor?</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Only if you explicitly choose to share it. You can opt-in to providing clinical summaries to your therapist to enhance your sessions.
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl">
                <h4 className="font-bold text-slate-900 mb-3">Can I use MindLens in an emergency?</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-semibold text-red-500">
                  No. MindLens is a wellness and support tool. If you are in immediate danger, please call 911 or your local emergency number immediately.
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl">
                <h4 className="font-bold text-slate-900 mb-3">How does the AI support work?</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our companion uses a fine-tuned clinical LLM to provide active listening and science-based coping strategies (CBT/ACT) in real-time.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ContactUsPage;
