
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CoreInsight from './components/CoreInsight';
import SkillLab from './components/SkillLab';
import AISupport from './components/AISupport';
import Security from './components/Security';
import AboutUs from './components/AboutUs';
import Counselors from './components/Counselors';
import PHQScreener from './components/PHQScreener';
import EarlyAccessModal from './components/EarlyAccessModal';
import BookingModal from './components/BookingModal';
import MessagingModal from './components/MessagingModal';
import AIChatBot from './components/AIChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import AboutUsPage from './components/AboutUsPage';
import ContactUsPage from './components/ContactUsPage';
import LegalModal from './components/LegalModal';
import { ArrowUp } from 'lucide-react';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScreenerOpen, setIsScreenerOpen] = useState(false);
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>('home');
  
  // Legal State
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'hipaa' | null>(null);

  // Body Scroll Lock logic for mobile
  useEffect(() => {
    const isAnyModalOpen = isScreenerOpen || isEarlyAccessOpen || isBookingOpen || isMessagingOpen || !!legalType;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isScreenerOpen, isEarlyAccessOpen, isBookingOpen, isMessagingOpen, legalType]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => window.scrollTo(0, 0), [currentPage]);

  const renderContent = () => {
    switch (currentPage) {
      case 'about': return <AboutUsPage />;
      case 'contact': return <ContactUsPage />;
      default: return (
        <>
          <Hero onOpenScreener={() => setIsScreenerOpen(true)} onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)} />
          <CoreInsight onOpenScreener={() => setIsScreenerOpen(true)} />
          <SkillLab />
          <AISupport />
          <Counselors onOpenBooking={() => setIsBookingOpen(true)} onOpenMessaging={() => setIsMessagingOpen(true)} />
          <AboutUs onNavigateAbout={() => setCurrentPage('about')} />
          <Security />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased overflow-x-hidden selection:bg-calm-blue/10 selection:text-calm-blue">
      <Header 
        onOpenScreener={() => setIsScreenerOpen(true)} onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
        onNavigateHome={() => setCurrentPage('home')} onNavigateAbout={() => setCurrentPage('about')}
        onNavigateContact={() => setCurrentPage('contact')} currentPage={currentPage}
      />
      
      <main className="relative">{renderContent()}</main>
      
      <Footer 
        onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)} 
        onNavigateAbout={() => setCurrentPage('about')}
        onNavigateContact={() => setCurrentPage('contact')}
        onOpenTerms={() => setLegalType('terms')}
        onOpenPrivacy={() => setLegalType('privacy')}
      />
      
      <PHQScreener isOpen={isScreenerOpen} onClose={() => setIsScreenerOpen(false)} />
      <EarlyAccessModal isOpen={isEarlyAccessOpen} onClose={() => setIsEarlyAccessOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <MessagingModal isOpen={isMessagingOpen} onClose={() => setIsMessagingOpen(false)} />
      <LegalModal isOpen={!!legalType} type={legalType || 'terms'} onClose={() => setLegalType(null)} />

      <AIChatBot />
      <WhatsAppButton />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-calm-blue hover:bg-blue-600 text-white p-4 rounded-2xl shadow-2xl transition-all duration-500 z-[4000] ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>
    </div>
  );
};

export default App;
