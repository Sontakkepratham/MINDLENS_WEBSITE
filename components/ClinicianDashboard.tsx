
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, Wallet, ArrowUpRight, 
  CheckCircle2, Clock, Landmark, MoreHorizontal, Search, Filter, 
  ArrowLeft, RefreshCw, Download, ExternalLink, LogOut, ShieldCheck
} from 'lucide-react';
import { getBookings, Booking } from '../utils/mockDb';
import Button from './ui/Button';

interface ClinicianDashboardProps {
  onBack: () => void;
}

const ClinicianDashboard: React.FC<ClinicianDashboardProps> = ({ onBack }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setBookings(getBookings());
      setIsRefreshing(false);
    }, 800);
  };

  const totalRevenueINR = bookings
    .filter(b => b.currency === 'INR')
    .reduce((acc, b) => acc + parseInt(b.amount.replace(/[^0-9]/g, '')), 0);
  
  const totalRevenueUSD = bookings
    .filter(b => b.currency === 'USD')
    .reduce((acc, b) => acc + parseInt(b.amount.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-[100]">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-xl transition-colors group">
              <LogOut size={20} className="text-slate-400 group-hover:text-red-500" />
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div>
              <h1 className="text-xl font-black text-slate-900">Clinical Merchant Hub</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MindLens Financial Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" className="gap-2 rounded-xl border-slate-200" onClick={refreshData}>
               <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> Refresh Ledger
             </Button>
             <div className="w-10 h-10 rounded-full bg-calm-blue text-white flex items-center justify-center font-black shadow-lg">NG</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-calm-blue">
                <TrendingUp size={24} />
              </div>
              <span className="flex items-center gap-1 text-green-500 text-xs font-black">
                <ArrowUpRight size={14} /> +12%
              </span>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue (USD)</div>
            <div className="text-3xl font-black text-slate-900">${totalRevenueUSD.toLocaleString()}</div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <Landmark size={24} />
              </div>
              <span className="flex items-center gap-1 text-green-500 text-xs font-black">
                <ArrowUpRight size={14} /> +8.4%
              </span>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue (INR)</div>
            <div className="text-3xl font-black text-slate-900">₹{totalRevenueINR.toLocaleString()}</div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                <Users size={24} />
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Patients</div>
            <div className="text-3xl font-black text-slate-900">{bookings.length}</div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                <Wallet size={24} />
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Next Settlement</div>
            <div className="text-xl font-black text-slate-900">Tomorrow, 10 AM</div>
            <p className="text-[10px] text-slate-400 mt-1">Institutional Bank Link Active</p>
          </div>
        </div>

        {/* Transaction Ledger */}
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">Payment Ledger</h3>
              <p className="text-xs text-slate-500">Live feed from payment gateways</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search patient or ID..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 text-sm outline-none focus:border-calm-blue" />
              </div>
              <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100"><Filter size={18} /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Type</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Gateway</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.length > 0 ? bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-mono text-xs font-bold text-slate-500 tracking-wider">{booking.id}</div>
                      <div className="text-[9px] text-slate-400 mt-1">{new Date(booking.timestamp).toLocaleString()}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{booking.name}</div>
                      <div className="text-xs text-slate-500">{booking.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xs font-black text-calm-blue px-3 py-1 bg-blue-50 rounded-lg inline-block uppercase tracking-tight">
                        {booking.serviceTitle}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-900">{booking.amount}</div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Tax Inc.</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                         <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{booking.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-green-600 font-black text-[10px] uppercase tracking-widest">
                        <CheckCircle2 size={14} /> Captured
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button className="p-2 text-slate-400 hover:text-slate-900"><MoreHorizontal size={20} /></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-slate-400">
                        <Clock size={40} className="opacity-20" />
                        <p className="font-bold">No transactions recorded in current billing cycle.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Company Bank & Settlement Info */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 transition-transform group-hover:scale-110"><Landmark size={140} /></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest mb-6">Linked Disbursement Account</div>
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h4 className="text-2xl font-black">HDFC Bank •••• 9231</h4>
                    <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Settlement Destination: MindLens Health Ecosystem</p>
                  </div>
                  {/* Fixed error in file components/ClinicianDashboard.tsx on line 203: Added ShieldCheck to imports */}
                  <ShieldCheck size={32} className="text-green-500" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                   <div>
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Last Settlement</div>
                     <div className="font-bold">May 12, 2024</div>
                   </div>
                   <div>
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Batch Frequency</div>
                     <div className="font-bold">T + 2 Cycles</div>
                   </div>
                   <div>
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Auto-Withdraw</div>
                     <div className="font-bold text-green-400">Enabled</div>
                   </div>
                </div>
              </div>
           </div>
           
           <div className="bg-white rounded-[40px] border border-slate-200 p-10 flex flex-col">
             <h4 className="font-black text-slate-900 mb-6">Management Panel</h4>
             <div className="space-y-4 flex-1">
               <button className="w-full p-5 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-slate-100 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-600"><Download size={18} /></div>
                   <span className="text-sm font-bold text-slate-700">Export GSTR-3B Report</span>
                 </div>
                 <ArrowUpRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
               </button>
               <button className="w-full p-5 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-slate-100 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-600"><ExternalLink size={18} /></div>
                   <span className="text-sm font-bold text-slate-700">Gateway Dashboard</span>
                 </div>
                 <ArrowUpRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
               </button>
             </div>
             <p className="mt-8 text-[9px] text-slate-400 font-black uppercase text-center leading-relaxed">
               Secure Access Only. <br /> MindLens Clinical Compliance RC-12.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicianDashboard;
