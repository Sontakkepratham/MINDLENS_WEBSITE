
import React, { useState, useEffect } from 'react';
import { MoreVertical, X, ClipboardCheck, ArrowRight, Instagram, Linkedin, CalendarDays } from 'lucide-react';
import Button from './ui/Button';

interface HeaderProps {
  onOpenScreener: () => void;
  onOpenEarlyAccess: () => void;
  onOpenBooking: () => void;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  currentPage: 'home' | 'about' | 'contact';
}

const Header: React.FC<HeaderProps> = ({ 
  onOpenScreener, 
  onOpenEarlyAccess, 
  onOpenBooking,
  onNavigateHome, 
  onNavigateAbout,
  onNavigateContact,
  currentPage 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionNav = (id: string) => {
    if (currentPage !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', onClick: onNavigateHome, active: currentPage === 'home' },
    { name: 'About', onClick: onNavigateAbout, active: currentPage === 'about' },
    { name: 'Counselors', onClick: () => handleSectionNav('counselors'), active: false },
    { name: 'Contact', onClick: onNavigateContact, active: currentPage === 'contact' },
  ];

  const handleMobileClick = (onClick?: () => void) => {
    setIsMobileMenuOpen(false);
    if (onClick) onClick();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[5000] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button onClick={onNavigateHome} className="flex items-center gap-2 group relative z-[5100]">
          <div className="w-10 h-10 flex items-center justify-center bg-calm-blue rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
             <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">MindLens</span>
        </button>

        <nav className="hidden lg:flex items-center space-x-10">
          <div className="flex items-center space-x-8 pr-10 border-r border-slate-200">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={link.onClick} 
                className={`text-sm font-bold transition-all hover:scale-105 origin-center ${link.active ? 'text-calm-blue' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onOpenScreener} className="px-6 rounded-xl border-slate-200 text-slate-600">Screener</Button>
            <Button variant="secondary" size="sm" onClick={onOpenEarlyAccess} className="px-6 rounded-xl">Waitlist</Button>
            <Button variant="primary" size="sm" onClick={onOpenBooking} className="px-6 rounded-xl gap-2 shadow-xl shadow-calm-blue/20">
              <CalendarDays size={16} /> Book Session
            </Button>
          </div>
        </nav>

        <button className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-md active:scale-90 transition-all z-[5100]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <MoreVertical size={24} strokeWidth={2.5} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[5000] lg:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-24 left-6 right-6 bg-white rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-top-10 duration-500">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => handleMobileClick(link.onClick)} className={`w-full text-left p-6 rounded-3xl flex items-center justify-between font-black text-lg ${link.active ? 'bg-calm-blue text-white shadow-xl' : 'bg-slate-50 text-slate-600'}`}>
                  {link.name} <ArrowRight size={20} />
                </button>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100 grid gap-4">
               <Button variant="outline" className="w-full py-5 rounded-3xl text-lg" onClick={() => handleMobileClick(onOpenEarlyAccess)}>Join Early Access</Button>
               <Button variant="primary" className="w-full py-5 rounded-3xl text-lg gap-2 shadow-xl shadow-calm-blue/20" onClick={() => handleMobileClick(onOpenBooking)}>
                 <CalendarDays size={20} /> Book Online Session
               </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
