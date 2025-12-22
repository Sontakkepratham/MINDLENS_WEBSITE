
import React, { useState } from 'react';
import { X, CheckCircle2, Send, ShieldCheck, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import { saveSignup } from '../utils/mockDb';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    purpose: 'General Wellness',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      saveSignup(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
    >
      <div className="bg-white w-full h-full md:h-auto md:max-w-xl md:rounded-[48px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-all z-10 p-2 rounded-full focus:ring-4 focus:ring-calm-blue/10"
          aria-label="Close Modal"
        >
          <X size={28} />
        </button>

        <div className="p-8 md:p-14 lg:p-16 flex-1 overflow-y-auto custom-scrollbar">
          {!isSuccess ? (
            <>
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-calm-blue rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6">
                  <Sparkles size={14} /> VIP Waitlist
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight" id="waitlist-title">Join Early Access</h3>
                <p className="text-slate-500 text-lg font-medium">Experience the next generation of mental health before anyone else.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="full-name" className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Full Name</label>
                    <input 
                      required
                      id="full-name"
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-calm-blue/10 focus:border-calm-blue focus:bg-white outline-none transition-all font-medium"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="mobile-num" className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Mobile Number</label>
                    <input 
                      required
                      id="mobile-num"
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-calm-blue/10 focus:border-calm-blue focus:bg-white outline-none transition-all font-medium"
                      value={formData.mobile}
                      onChange={e => setFormData({...formData, mobile: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email-addr" className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Email Address</label>
                  <input 
                    required
                    id="email-addr"
                    type="email" 
                    placeholder="jane@example.com"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-calm-blue/10 focus:border-calm-blue focus:bg-white outline-none transition-all font-medium"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="visit-purpose" className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Primary Interest</label>
                  <select 
                    id="visit-purpose"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-calm-blue/10 focus:border-calm-blue focus:bg-white outline-none transition-all appearance-none cursor-pointer font-medium"
                    value={formData.purpose}
                    onChange={e => setFormData({...formData, purpose: e.target.value})}
                  >
                    <option>General Wellness</option>
                    <option>Anxiety Support</option>
                    <option>Depression Screening</option>
                    <option>CBT Exercises</option>
                    <option>Professional Counseling</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="visit-note" className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Additional Notes</label>
                  <textarea 
                    id="visit-note"
                    rows={4}
                    placeholder="Tell us what you're looking for..."
                    className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-[32px] focus:ring-4 focus:ring-calm-blue/10 focus:border-calm-blue focus:bg-white outline-none transition-all resize-none shadow-inner font-medium"
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full py-6 mt-4 gap-3 shadow-2xl shadow-calm-blue/20"
                >
                  {isSubmitting ? 'Registering...' : <><Send size={22} /> Confirm Reservation</>}
                </Button>

                <div className="pt-6 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">
                   <ShieldCheck size={14} /> Data encrypted via SSL
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-16 animate-in zoom-in-95 duration-700">
              <div className="w-32 h-32 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner ring-[12px] ring-green-50/50">
                <CheckCircle2 size={64} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">You're on the List!</h3>
              <p className="text-slate-500 text-xl leading-relaxed mb-12 font-medium max-w-sm mx-auto">
                Thank you, <span className="font-black text-slate-900">{formData.name.split(' ')[0]}</span>! We've reserved your spot. Watch your inbox for your exclusive access token.
              </p>
              <Button variant="outline" onClick={onClose} className="w-full py-5 rounded-2xl text-lg">
                Return Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessModal;
