
import React, { useState } from 'react';
import { X, Send, ShieldCheck, Heart, User, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import Button from './ui/Button';

interface MessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tags = ['Session Inquiry', 'Follow-up', 'Resource Request', 'Clinical Feedback', 'Other'];
const urgencies = [
  { label: 'Normal', desc: 'Standard (24h)', color: 'bg-slate-100 text-slate-600' },
  { label: 'Urgent', desc: 'Priority (8h)', color: 'bg-orange-50 text-orange-600 border-orange-100' }
];

const MessagingModal: React.FC<MessagingModalProps> = ({ isOpen, onClose }) => {
  const [selectedTag, setSelectedTag] = useState('Session Inquiry');
  const [urgency, setUrgency] = useState('Normal');
  const [replyMethod, setReplyMethod] = useState('Email');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSent(false);
      setMessage('');
      setSelectedTag('Session Inquiry');
      setUrgency('Normal');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      {/* 
        Device Sizing Standards:
        Mobile: Full viewport
        Tablet: max-w-lg (512px)
        Desktop: max-w-2xl (672px)
      */}
      <div className="bg-white w-full h-full md:h-auto md:max-w-lg lg:max-w-2xl md:rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col max-h-[100dvh] md:max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30 shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white group">
              <img src="https://drive.google.com/thumbnail?id=1RT3NZdXzPcur9x7nuxtj_X987b8sNEKN&sz=w100" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Nidhi Gadoya" />
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-900 leading-tight">Direct Messaging</h3>
              <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> End-to-End Encrypted
              </div>
            </div>
          </div>
          <button onClick={handleClose} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-slate-900 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-14 space-y-12 custom-scrollbar">
          {!isSent ? (
            <>
              {/* Category & Urgency */}
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em]">Message Type</label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(t => (
                      <button 
                        key={t}
                        onClick={() => setSelectedTag(t)}
                        className={`px-4 py-2.5 rounded-xl text-[10px] font-black transition-all ${
                          selectedTag === t ? 'bg-calm-blue text-white shadow-lg scale-105' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em]">Clinical Priority</label>
                  <div className="flex gap-3">
                    {urgencies.map(u => (
                      <button 
                        key={u.label}
                        onClick={() => setUrgency(u.label)}
                        className={`flex-1 p-3 rounded-2xl border-2 transition-all text-center ${
                          urgency === u.label 
                          ? (u.label === 'Urgent' ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-md' : 'bg-blue-50 border-calm-blue text-calm-blue shadow-md')
                          : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        <div className="text-[11px] font-black uppercase tracking-widest">{u.label}</div>
                        <div className={`text-[9px] font-bold opacity-60`}>{u.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-4">
                <div className="flex justify-between items-end ml-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Your Note</label>
                  <span className={`text-[10px] font-black ${message.length > 450 ? 'text-red-500' : 'text-slate-300'}`}>{message.length} / 500</span>
                </div>
                <div className="relative group">
                  <textarea 
                    rows={8}
                    maxLength={500}
                    placeholder="Briefly describe your inquiry..."
                    className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-[40px] outline-none focus:border-calm-blue focus:bg-white transition-all resize-none shadow-inner text-base leading-relaxed"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                  <div className="absolute bottom-6 right-8 flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-green-500" /> AES-256 Protocol
                  </div>
                </div>
              </div>

              {/* Reply Preferences */}
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em]">Preferred contact channel</label>
                 <div className="grid grid-cols-2 gap-4">
                    {['Email', 'WhatsApp'].map(method => (
                      <button 
                        key={method}
                        onClick={() => setReplyMethod(method)}
                        className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${
                          replyMethod === method ? 'border-calm-blue bg-blue-50/50 text-calm-blue' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        Reach me via {method}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="p-8 bg-blue-50/50 rounded-[40px] border border-blue-100 flex gap-6">
                 <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-calm-blue shadow-md">
                   <AlertCircle size={24} />
                 </div>
                 <p className="text-xs text-blue-800 leading-relaxed font-bold">
                   This channel is for clinical inquiries and non-emergency support. In the event of an emotional crisis, please contact your local emergency hotline immediately.
                 </p>
              </div>

              <Button 
                className="w-full py-6 rounded-[32px] gap-3 shadow-2xl shadow-calm-blue/30 text-lg"
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
              >
                {isLoading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : <><Send size={22} /> Transmit Securely</>}
              </Button>
            </>
          ) : (
            <div className="text-center py-16 animate-in zoom-in-95 duration-700">
              <div className="w-32 h-32 bg-blue-50 text-calm-blue rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner ring-[12px] ring-blue-50/50">
                <CheckCircle2 size={64} />
              </div>
              <h4 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Sent Successfully</h4>
              <p className="text-slate-500 mb-12 text-xl leading-relaxed max-w-sm mx-auto font-medium">
                Your clinical note is in Nidhi's secure vault. Expect a reply via <span className="font-bold text-slate-900">{replyMethod}</span> within <span className="font-bold text-slate-900">{urgency === 'Urgent' ? '8 hours' : '24 hours'}</span>.
              </p>
              <div className="flex flex-col gap-4">
                 <Button variant="outline" className="w-full py-5 rounded-2xl gap-3 text-lg" onClick={handleClose}>
                   <MessageSquare size={22} /> Exit Portal
                 </Button>
              </div>
            </div>
          )}
        </div>

        {/* Branding Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-12 shrink-0">
           <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">
             <ShieldCheck size={12}/> HIPAA Vault
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">
             <User size={12}/> Direct Line
           </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingModal;
