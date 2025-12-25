
import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronRight, Calendar, Clock, Video, CheckCircle2, ArrowLeft, CreditCard, Download, CalendarPlus, Info, Hash, Mail, Shield, ChevronDown, Loader2, BellRing, ChevronLeft, Sun, Sunset, Moon, Sparkles, Lock, ShieldCheck } from 'lucide-react';
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
  { time: '09:00 AM', period: 'morning' },
  { time: '10:30 AM', period: 'morning' },
  { time: '01:00 PM', period: 'afternoon' },
  { time: '02:30 PM', period: 'afternoon' },
  { time: '04:00 PM', period: 'afternoon' },
  { time: '05:30 PM', period: 'evening' }
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', category: 'Anxiety & Stress', note: '' });
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [confirmationId, setConfirmationId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Calendar State
  const [viewDate, setViewDate] = useState(new Date());

  const calendarData = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Leading empty days
    for (let i = 0; i < firstDay; i++) days.push(null);
    // Month days
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    
    return days;
  }, [viewDate]);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    const d = new Date(selectedDate);
    return date.toDateString() === d.toDateString();
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

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
    else if (step === 'details' && formData.name && paymentData.cardNumber) {
      setIsProcessing(true);
      setProcessingStatus('Authorizing payment...');
      await new Promise(r => setTimeout(r, 800));
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
    setPaymentData({ cardNumber: '', expiry: '', cvv: '' });
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
    if (step === 'details') return !formData.name || !formData.email || !paymentData.cardNumber || isProcessing;
    return false;
  };

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return '';
    return new Date(selectedDate).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  }, [selectedDate]);

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full h-full sm:h-[95vh] md:h-[90vh] lg:h-[85vh] sm:max-w-2xl lg:max-w-5xl sm:rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col lg:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
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
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 lg:pb-0">
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Select Date & Time</h4>
                      <p className="text-sm sm:text-base text-slate-500 font-medium">Choose a convenient slot for your spatial session.</p>
                    </div>
                    
                    <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16">
                      {/* Interactive Calendar */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                           <h5 className="font-black text-slate-900 text-lg">
                             {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                           </h5>
                           <div className="flex gap-2">
                             <button onClick={handlePrevMonth} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                               <ChevronLeft size={20} />
                             </button>
                             <button onClick={handleNextMonth} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                               <ChevronRight size={20} />
                             </button>
                           </div>
                        </div>

                        <div className="bg-slate-50/50 rounded-[32px] p-6 border border-slate-100 shadow-inner">
                          <div className="grid grid-cols-7 gap-1 mb-4">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                              <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest p-2">
                                {d}
                              </div>
                            ))}
                            {calendarData.map((date, idx) => {
                              const disabled = isDateDisabled(date);
                              const selected = isDateSelected(date);
                              return (
                                <button
                                  key={idx}
                                  disabled={disabled}
                                  onClick={() => date && setSelectedDate(date.toISOString())}
                                  className={`aspect-square flex items-center justify-center rounded-2xl text-sm font-bold transition-all relative ${
                                    !date ? 'pointer-events-none' : 
                                    selected ? 'bg-calm-blue text-white shadow-xl scale-110 z-10' : 
                                    disabled ? 'text-slate-300 pointer-events-none' : 
                                    'text-slate-600 hover:bg-white hover:shadow-md active:scale-95'
                                  }`}
                                >
                                  {date?.getDate()}
                                  {selected && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-calm-blue rounded-full animate-bounce"></div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Prominent Time Slots with Real-time Summary */}
                      <div className="space-y-8">
                        {/* Real-time Selection Summary Bar */}
                        <div className={`p-6 rounded-[32px] border-2 transition-all duration-500 overflow-hidden relative ${
                          selectedDate || selectedTime 
                          ? 'bg-blue-50 border-calm-blue/30 shadow-lg translate-y-0 opacity-100' 
                          : 'bg-slate-50 border-slate-100 opacity-60'
                        }`}>
                          <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                              selectedDate && selectedTime ? 'bg-calm-blue text-white shadow-lg' : 'bg-white text-slate-300'
                            }`}>
                              {selectedDate && selectedTime ? <Sparkles size={28} /> : <CalendarPlus size={28} />}
                            </div>
                            <div className="flex-1">
                              <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Current Selection</h5>
                              <div className="flex flex-col">
                                <span className={`text-base font-black transition-all ${selectedDate ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                                  {formattedSelectedDate || 'Pick a date...'}
                                </span>
                                <span className={`text-sm font-bold transition-all ${selectedTime ? 'text-calm-blue' : 'text-slate-400 italic'}`}>
                                  {selectedTime ? `at ${selectedTime}` : 'Pick a time slot...'}
                                </span>
                              </div>
                            </div>
                          </div>
                          {selectedDate && selectedTime && (
                             <div className="absolute top-2 right-2 animate-in zoom-in duration-500">
                               <div className="p-1 bg-green-500 text-white rounded-lg">
                                 <CheckCircle2 size={16} />
                               </div>
                             </div>
                          )}
                        </div>

                        <div className="space-y-8">
                          {/* Grouping times by period for better UX */}
                          {['morning', 'afternoon', 'evening'].map(period => {
                            const slots = timeSlots.filter(s => s.period === period);
                            if (slots.length === 0) return null;
                            return (
                              <div key={period} className={`space-y-4 transition-all duration-500 ${!selectedDate ? 'opacity-30 blur-[2px] pointer-events-none' : 'opacity-100 blur-0'}`}>
                                <div className="flex items-center gap-2 text-slate-400">
                                  {period === 'morning' ? <Sun size={14} /> : period === 'afternoon' ? <Sunset size={14} /> : <Moon size={14} />}
                                  <span className="text-[10px] font-black uppercase tracking-widest">{period}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  {slots.map(s => (
                                    <button 
                                      key={s.time}
                                      onClick={() => setSelectedTime(s.time)}
                                      className={`p-4 sm:p-5 rounded-2xl font-black text-sm transition-all active:scale-95 flex flex-col items-center gap-1 border-2 relative overflow-hidden ${
                                        selectedTime === s.time 
                                        ? 'bg-gradient-to-tr from-calm-blue to-soft-lavender border-transparent text-white shadow-xl scale-[1.05] z-10' 
                                        : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                                      }`}
                                    >
                                      {selectedTime === s.time && (
                                        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                                      )}
                                      <span className="text-base relative z-10">{s.time}</span>
                                      <span className={`text-[8px] font-bold uppercase tracking-tight relative z-10 ${selectedTime === s.time ? 'text-white/80' : 'text-slate-400'}`}>
                                        Available Slot
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {!selectedDate && (
                           <div className="p-6 bg-orange-50/50 rounded-3xl border border-orange-100 flex items-center gap-4 text-orange-600 animate-in fade-in slide-in-from-top-2">
                              <Info size={20} />
                              <p className="text-xs font-bold">Please select a date on the calendar to unlock time slots.</p>
                           </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 'details' && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div>
                        <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Secure Checkout</h4>
                        <p className="text-sm sm:text-base text-slate-500 font-medium">Finalize your clinical reservation.</p>
                      </div>
                      <div className="inline-flex items-center gap-3 px-5 py-3 bg-green-50 text-green-700 rounded-2xl border border-green-100 shadow-sm">
                        <Lock size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">SSL Encrypted</span>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                      {/* Personal Details */}
                      <div className="space-y-8">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                          <Mail size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Contact Information</span>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Legal Name</label>
                            <input 
                              type="text" 
                              placeholder="Jane Doe"
                              className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-calm-blue text-base pointer-events-auto transition-all focus:bg-white"
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Email Address</label>
                            <input 
                              type="email" 
                              placeholder="jane@example.com"
                              className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-calm-blue text-base pointer-events-auto transition-all focus:bg-white"
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Notes (Optional)</label>
                            <textarea 
                              rows={3}
                              placeholder="Any specific focus areas?"
                              className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-calm-blue text-base pointer-events-auto resize-none transition-all focus:bg-white"
                              value={formData.note}
                              onChange={e => setFormData({...formData, note: e.target.value})}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* Payment Information Placeholder */}
                      <div className="space-y-8">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                          <CreditCard size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Payment Gateway</span>
                        </div>
                        
                        <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-10 -mt-10 rounded-full"></div>
                          <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-start">
                              <div className="w-12 h-10 bg-white/10 rounded-lg backdrop-blur-md border border-white/10 flex items-center justify-center">
                                <div className="w-6 h-4 bg-yellow-400/80 rounded-sm"></div>
                              </div>
                              <CreditCard size={28} className="text-white/20" />
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-[8px] font-black uppercase tracking-widest text-white/40">Card Number</label>
                                <input 
                                  type="text" 
                                  maxLength={19}
                                  placeholder="0000 0000 0000 0000"
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-mono tracking-widest outline-none focus:border-white/30 transition-all"
                                  value={paymentData.cardNumber}
                                  onChange={e => setPaymentData({...paymentData, cardNumber: e.target.value})}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[8px] font-black uppercase tracking-widest text-white/40">Expiry</label>
                                  <input 
                                    type="text" 
                                    placeholder="MM/YY"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono outline-none focus:border-white/30 transition-all"
                                    value={paymentData.expiry}
                                    onChange={e => setPaymentData({...paymentData, expiry: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[8px] font-black uppercase tracking-widest text-white/40">CVV</label>
                                  <input 
                                    type="password" 
                                    maxLength={3}
                                    placeholder="***"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono outline-none focus:border-white/30 transition-all"
                                    value={paymentData.cvv}
                                    onChange={e => setPaymentData({...paymentData, cvv: e.target.value})}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 flex items-start gap-4">
                          <ShieldCheck size={20} className="text-calm-blue mt-0.5" />
                          <p className="text-[10px] leading-relaxed text-blue-900 font-bold">
                            Your payment is handled by our PCI-compliant clinical processor. MindLens does not store your full card data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 'success' && (
                  <div className="text-center py-12 flex flex-col items-center">
                    {/* Primary Animated Success Mark */}
                    <div className="relative mb-12">
                      <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping-slow scale-150"></div>
                      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center relative shadow-inner animate-in zoom-in duration-500 ease-out">
                        <CheckCircle2 size={56} className="animate-[scale-up_0.4s_cubic-bezier(0.34,1.56,0.64,1)]" />
                      </div>
                    </div>

                    <div className="space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
                      <h4 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Confirmed!</h4>
                      <p className="text-slate-500 text-base sm:text-lg max-w-sm mx-auto font-medium leading-relaxed">
                        Thank you, <span className="font-black text-slate-900">{formData.name.split(' ')[0]}</span>. Your clinical slot is officially secured.
                      </p>
                    </div>

                    <div className="w-full max-w-md bg-slate-50/80 backdrop-blur-sm rounded-[32px] p-8 border border-slate-100 mb-12 text-left animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both shadow-sm">
                       <div className="flex items-center gap-4 mb-6 border-b border-slate-200/50 pb-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-calm-blue shadow-sm">
                           <Hash size={18} />
                         </div>
                         <div className="font-black text-slate-700 tracking-widest text-sm uppercase">{confirmationId}</div>
                       </div>
                       <div className="space-y-3">
                         <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                           <Mail size={14} className="text-calm-blue" />
                           Session link sent to {formData.email}
                         </div>
                         <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                           <BellRing size={14} className="text-calm-blue" />
                           24h reminder notification activated
                         </div>
                       </div>
                    </div>

                    <div className="w-full max-w-xs animate-in fade-in zoom-in-95 duration-700 delay-700 fill-mode-both">
                      <Button variant="primary" className="w-full py-5 rounded-[20px] shadow-xl text-lg font-black" onClick={handleClose}>
                        Return to Dashboard
                      </Button>
                    </div>
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
                    {step === 'details' ? <><CreditCard size={22} /> Confirm & Pay {selectedService?.price}</> : <>Next Step <ChevronRight size={22} /></>}
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
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-500 ${selectedService ? 'bg-calm-blue text-white' : 'bg-white text-slate-200'}`}>
                <Video size={22} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Service</div>
                <div className={`text-base font-bold transition-colors ${selectedService ? 'text-slate-900' : 'text-slate-200'}`}>{selectedService?.title || 'Not selected'}</div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-500 ${selectedDate ? 'bg-calm-blue text-white' : 'bg-white text-slate-200'}`}>
                <Calendar size={22} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</div>
                <div className={`text-base font-bold transition-colors ${selectedDate ? 'text-slate-900' : 'text-slate-200'}`}>
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Pending'}
                  {selectedTime ? ` @ ${selectedTime}` : ''}
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-200">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Clinical Fee</div>
               <div className="text-4xl font-black text-calm-blue transition-all duration-500">{selectedService?.price || '$0'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
