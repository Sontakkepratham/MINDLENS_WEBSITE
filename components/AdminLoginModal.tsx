
import React, { useState } from 'react';
import { X, ShieldCheck, KeyRound, UserCheck, Loader2, Fingerprint, Lock, ChevronRight, Building2 } from 'lucide-react';
import Button from './ui/Button';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    // Simulated corporate validation logic
    setTimeout(() => {
      if (staffId.toLowerCase() === 'admin' || staffId.startsWith('ML-')) {
        onSuccess();
        setIsVerifying(false);
      } else {
        setError('Invalid Staff Credentials. Access Denied.');
        setIsVerifying(false);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[7000] flex items-center justify-center bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 p-2"
        >
          <X size={24} />
        </button>

        <div className="p-10 sm:p-14">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl">
              <Building2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Login</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">MindLens Corporate Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Staff Identification</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  placeholder="e.g. ML-9923"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 transition-all font-bold"
                  value={staffId}
                  onChange={e => setStaffId(e.target.value)}
                />
                <UserCheck size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Secure Passkey</label>
              <div className="relative">
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 transition-all font-bold"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <KeyRound size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
              </div>
            </div>

            {error && (
              <p className="text-xs font-black text-red-500 text-center animate-bounce">{error}</p>
            )}

            <Button 
              type="submit" 
              className="w-full py-5 rounded-2xl bg-slate-900 hover:bg-black shadow-xl shadow-slate-900/20"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <div className="flex items-center gap-3">
                  <Loader2 size={20} className="animate-spin" /> Verifying Tunnel...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Fingerprint size={22} /> Authorize Access <ChevronRight size={18} />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <ShieldCheck size={14} className="text-green-500" /> End-to-End Encrypted
             </div>
             <p className="text-[9px] text-slate-400 text-center leading-relaxed font-medium">
               Access to this portal is logged and monitored for clinical compliance. Unauthorized entry attempts will be reported to IT security.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
