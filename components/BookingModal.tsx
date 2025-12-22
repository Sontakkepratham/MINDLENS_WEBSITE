
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Calendar, Clock, Video, CheckCircle2, ArrowLeft, CreditCard, Download, CalendarPlus, Info, Hash, Mail, Shield, ChevronDown, Loader2, BellRing } from 'lucide-react';
import Button from './ui/Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'service' | 'datetime' | 'details' | 'success';

const services = [
  { id: 'individual', title: 'Individual Therapy', duration: '50 mins', price: '$80', icon: <Video size={24} />, description: 'One-on-one session using CBT/ACT techniques.' },
  { id: 'couple', title: 'Couple Counseling', duration: '75 mins', price: '$120', icon: <Video size={24} />, description: 'Improving communication and relationship dynamics.' },
  { id: 'diagnostic', title: 'Clinical Review', duration: '30 mins', price: '$50', icon: <Video size={24} />, description: 'Expert analysis of your MindLens assessments.' },
];

const timeSlots = [
  '09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', category: 'Anxiety & Stress', note: '' });
  const [confirmationId, setConfirmationId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  if (!isOpen) return null;

  const generateConfirmationId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'ML-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleNext = async () => {
    if (step === 'service' && selectedService) setStep('datetime');
    else if (step === 'datetime' && selectedDate && selectedTime) setStep('details');
    else if (step === 'details' && formData.name) {
      setIsProcessing(true);
      setProcessingStatus('Securing session link...');
      await new Promise(r => setTimeout(r, 600));
      setProcessingStatus('Syncing clinical intake...');
      await new Promise(r => setTimeout(r, 600));
      setProcessingStatus('Scheduling 24h reminder...');
      await new Promise(r => setTimeout(r, 600));
      setProcessingStatus('Sending confirmation...');
      await new Promise(r => setTimeout(r, 600));
      setConfirmationId(generateConfirmationId());
      setIsProcessing(false);
      setStep('success');
    }
  };

  const handleBack = () => {
    if (step === 'datetime') setStep('service');
    else if (step === 'details') setStep('datetime');
  };

  const reset = () => {
    setStep('service');
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setFormData({ name: '', email: '', category: 'Anxiety & Stress', note: '' });
    setConfirmationId('');
    setIsProcessing(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 500);
  };

  const isNextDisabled = () => {
    if (step === 'service') return !selectedService;
    if (step === 'datetime') return !selectedDate || !selectedTime;
    if (step === 'details') return !formData.name || !formData.email || isProcessing;
    return false;
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full h-full sm:h-[90vh] md:h-[80vh] lg:h-[85vh] sm:max-w-2xl lg:max-w-5xl sm:rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col lg:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Main Interface Flow */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          
          {/* Header */}
          <div className="p-5 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0 z-[60]">
            <div className="flex items-center gap-4">
              {step !== 'service' && step !== 'success' && !isProcessing && (
                <button onClick={handleBack} className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-900 transition-all active:scale-90 pointer-events-auto">
                  <ArrowLeft size={22} />
                </button>
              )}
              <div>
                <h3 className="font-black text-lg sm:text-xl text-slate-900">
                  {isProcessing ? 'Finalizing...' : 'Book Session'}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-orange-400 animate-spin' : 'bg-calm-blue animate-pulse'}`}></span>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">MindLens Clinical v2.2</p>
                </div>
              </div>
            </div>
            {!isProcessing && (
              <button onClick={handleClose} className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-all active:scale-90 pointer-events-auto">
                <X size={22} />
              </button>
            )}
          </div>

          {/* Progress Indicator */}
          {step !== 'success' && (
            <div className="h-1 w-full bg-slate-100 shrink-0 z-50">
              <div 
                className="h-full bg-calm-blue transition-all duration-700 ease-in-out" 
                style={{ width: step === 'service' ? '33.33%' : step === 'datetime' ? '66.66%' : '100%' }}
              />
            </div>
          )}

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-14 pb-12 sm:pb-10 custom-scrollbar relative z-10">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in fade-in duration-500 py-12">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-slate-50 border-t-calm-blue rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield size={24} className="text-calm-blue/30" />
                  </div>
                </div>
                <div className="text-center px-4">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">{processingStatus}</h4>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Clinical Security Active</p>
                </div>
              </div>
            ) : (
              <>
                {step === 'service' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">How can we help?</h4>
                      <p className="text-sm sm:text-base text-slate-500 font-medium">Select a specialized clinical approach to begin.</p>
                    </div>
                    <div className="grid gap-4 sm:gap-6">
                      {services.map(s => (
                        <button 
                          key={s.id}
                          onClick={() => setSelectedService(s)}
                          className={`p-6 sm:p-7 rounded-[32px] sm:rounded-[36px] border-2 text-left flex items-center justify-between transition-all active:scale-[0.98] pointer-events-auto ${
                            selectedService?.id === s.id ? 'border-calm-blue bg-blue-50/50 shadow-xl' : 'border-slate-100 hover:border-blue-200 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-4 sm:gap-6 pointer-events-none">
                            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all ${
                              selectedService?.id === s.id ? 'bg-calm-blue text-white' : 'bg-slate-50 text-slate-400'
                            }`}>
                              {s.icon}
                            </div>
                            <div>
                              <div className="font-black text-slate-900 text-base sm:text-lg">{s.title}</div>
                              <p className="text-[10px] sm:text-sm text-slate-500 mt-1">{s.description}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0 pointer-events-none ml-4">
                            <div className="font-black text-calm-blue text-base sm:text-xl">{s.price}</div>
                            <div className="text-[9px] text-slate-400 font-black uppercase">{s.duration}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 'datetime' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Pick a slot</h4>
                      <p className="text-sm sm:text-base text-slate-500 font-medium">Dr. Nidhi is available for the following times.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">1. Select Date</label>
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                          <Calendar size={22} className="text-calm-blue" />
                          <input 
                            type="date" 
                            className="bg-transparent font-bold text-slate-900 outline-none flex-1 cursor-pointer w-full text-base pointer-events-auto"
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            value={selectedDate}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">2. Select Time</label>
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map(t => (
                            <button 
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={`p-4 rounded-2xl font-bold text-xs sm:text-sm transition-all active:scale-95 pointer-events-auto ${
                                selectedTime === t ? 'bg-calm-blue text-white shadow-xl' : 'bg-white border border-slate-100 text-slate-600'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 'details' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Finalize Booking</h4>
                      <p className="text-sm sm:text-base text-slate-500 font-medium">Your information is protected by clinical privacy laws.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Legal Name</label>
                        <input 
                          type="text" 
                          placeholder="Jane Doe"
                          className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-calm-blue text-base pointer-events-auto"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="jane@example.com"
                          className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-calm-blue text-base pointer-events-auto"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Optional Note</label>
                      <textarea 
                        rows={4}
                        placeholder="Anything Dr. Nidhi should know beforehand..."
                        className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] outline-none focus:border-calm-blue text-base pointer-events-auto resize-none"
                        value={formData.note}
                        onChange={e => setFormData({...formData, note: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                )}

                {step === 'success' && (
                  <div className="text-center py-12 animate-in zoom-in-95 duration-700">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                      <CheckCircle2 size={48} />
                    </div>
                    <h4 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Confirmed!</h4>
                    <p className="text-slate-500 text-base sm:text-lg mb-10 max-w-sm mx-auto">
                      Thank you, <span className="font-bold text-slate-900">{formData.name.split(' ')[0]}</span>. Your session is locked in.
                    </p>
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-10 text-left max-w-md mx-auto">
                       <div className="flex items-center gap-4 mb-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-calm-blue shadow-sm">
                           <Hash size={18} />
                         </div>
                         <div className="font-black text-slate-700 tracking-widest">{confirmationId}</div>
                       </div>
                       <p className="text-xs text-slate-500 leading-relaxed">Check your inbox for the secure link and intake forms. We'll send a reminder 24 hours before.</p>
                    </div>
                    <Button variant="primary" className="w-full max-w-xs py-5 rounded-2xl" onClick={handleClose}>Done</Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sticky Mobile Action Bar */}
          {step !== 'success' && !isProcessing && (
            <div className="sticky bottom-0 left-0 right-0 p-5 sm:p-8 bg-white/95 backdrop-blur-xl border-t border-slate-100 z-[100] pointer-events-auto pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
               <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto sm:max-w-none">
                  <Button 
                    disabled={isNextDisabled()}
                    className="w-full py-5 rounded-[24px] gap-3 shadow-2xl shadow-calm-blue/30 text-lg font-black pointer-events-auto"
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  >
                    {step === 'details' ? <><CreditCard size={22} /> Confirm & Book</> : <>Next Step <ChevronRight size={22} /></>}
                  </Button>
                  <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest sm:hidden mt-2">
                    Step {step === 'service' ? '1' : step === 'datetime' ? '2' : '3'} of 3
                  </p>
               </div>
            </div>
          )}
        </div>

        {/* Desktop Sidebar Summary */}
        <div className="hidden lg:flex w-96 bg-slate-50 border-l border-slate-100 flex-col p-12 shrink-0 overflow-y-auto">
          <div className="mt-8 space-y-12">
            <h5 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Session Summary</h5>
            
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${selectedService ? 'bg-calm-blue text-white' : 'bg-white text-slate-200'}`}>
                <Video size={22} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Service</div>
                <div className={`text-base font-bold ${selectedService ? 'text-slate-900' : 'text-slate-200'}`}>{selectedService?.title || 'Not selected'}</div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${selectedDate ? 'bg-calm-blue text-white' : 'bg-white text-slate-200'}`}>
                <Calendar size={22} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</div>
                <div className={`text-base font-bold ${selectedDate ? 'text-slate-900' : 'text-slate-200'}`}>
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Pending'}
                  {selectedTime ? ` @ ${selectedTime}` : ''}
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-200">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Clinical Fee</div>
               <div className="text-4xl font-black text-calm-blue">{selectedService?.price || '$0'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
