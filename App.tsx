
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
import ClinicianDashboard from './components/ClinicianDashboard';
import Platform from './components/Platform';
import LegalModal from './components/LegalModal';
import OnboardingCarousel from './components/OnboardingCarousel';
import AdminLoginModal from './components/AdminLoginModal';
import QuoteBreak from './components/ui/QuoteBreak';
import FactStrip from './components/ui/FactStrip';
import { ArrowUp, Brain, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScreenerOpen, setIsScreenerOpen] = useState(false);
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'admin' | 'platform'>('home');
  
  // Legal State
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'hipaa' | null>(null);

  // Initial Onboarding Check
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('mindlens_onboarded');
    if (!hasSeenOnboarding) {
      setIsOnboardingOpen(true);
    }
  }, []);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('mindlens_onboarded', 'true');
    setIsOnboardingOpen(false);
  };

  const handleAdminSuccess = () => {
    setIsAdminLoginOpen(false);
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  // Body Scroll Lock logic for mobile
  useEffect(() => {
    const isAnyModalOpen = isScreenerOpen || isEarlyAccessOpen || isBookingOpen || isMessagingOpen || isOnboardingOpen || isAdminLoginOpen || !!legalType;
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
  }, [isScreenerOpen, isEarlyAccessOpen, isBookingOpen, isMessagingOpen, isOnboardingOpen, isAdminLoginOpen, legalType]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => window.scrollTo(0, 0), [currentPage]);

  const renderContent = () => {
    switch (currentPage) {
      case 'about': return <AboutUsPage onOpenBooking={() => setIsBookingOpen(true)} onOpenScreener={() => setIsScreenerOpen(true)} />;
      case 'contact': return <ContactUsPage onOpenBooking={() => setIsBookingOpen(true)} onOpenScreener={() => setIsScreenerOpen(true)} />;
      case 'platform': return <Platform onOpenBooking={() => setIsBookingOpen(true)} onOpenScreener={() => setIsScreenerOpen(true)} />;
      case 'admin': return <ClinicianDashboard onBack={handleLogout} />;
      default: return (
        <>
          <Hero 
            onOpenScreener={() => setIsScreenerOpen(true)} 
            onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)} 
            onOpenBooking={() => setIsBookingOpen(true)}
          />
          <QuoteBreak 
            quote="The mind is not a vessel to be filled, but a fire to be kindled."
            author="Plutarch"
            variant="blue"
          />
          <CoreInsight 
            onOpenScreener={() => setIsScreenerOpen(true)} 
            onOpenBooking={() => setIsBookingOpen(true)}
          />
          <FactStrip 
            facts={[
              { icon: <Brain size={18} />, text: "Visual processing is 60,000x faster than reading text." },
              { icon: <Zap size={18} />, text: "Neural pathways strengthen with consistent visual feedback." },
              { icon: <ShieldCheck size={18} />, text: "All spatial models are zero-knowledge encrypted." }
            ]}
          />
          <SkillLab />
          <QuoteBreak 
            quote="Artificial Intelligence is not a substitute for human intelligence; it is a tool to amplify it."
            author="MindLens Ethos"
            variant="purple"
          />
          <AISupport />
          <QuoteBreak 
            quote="Empathy is a quality of the soul, not just a response of the mind."
            author="Clinical Perspective"
            variant="slate"
          />
          <Counselors onOpenBooking={() => setIsBookingOpen(true)} onOpenMessaging={() => setIsMessagingOpen(true)} />
          <QuoteBreak 
            quote="The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed."
            author="Carl Jung"
            variant="slate"
          />
          <AboutUs onNavigateAbout={() => setCurrentPage('about')} />
          <FactStrip 
            variant="dark"
            facts={[
              { icon: <Sparkles size={18} />, text: "Over 300M people suffer from untreated depression globally." },
              { icon: <ShieldCheck size={18} />, text: "MindLens is aligned with WHO's Mental Health Action Plan." },
              { icon: <Brain size={18} />, text: "Our AI is audited monthly for clinical safety & bias." }
            ]}
          />
          <Security />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased overflow-x-hidden selection:bg-calm-blue/10 selection:text-calm-blue">
      {currentPage !== 'admin' && (
        <OnboardingCarousel isOpen={isOnboardingOpen} onComplete={handleCompleteOnboarding} />
      )}
      
      {currentPage !== 'admin' && (
        <Header 
          onOpenScreener={() => setIsScreenerOpen(true)} 
          onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
          onNavigateHome={() => setCurrentPage('home')} 
          onNavigateAbout={() => setCurrentPage('about')}
          onNavigateContact={() => setCurrentPage('contact')} 
          onNavigatePlatform={() => setCurrentPage('platform')}
          currentPage={currentPage}
        />
      )}
      
      <main className="relative">{renderContent()}</main>
      
      {currentPage !== 'admin' && (
        <Footer 
          onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)} 
          onNavigateAbout={() => setCurrentPage('about')}
          onNavigateContact={() => setCurrentPage('contact')}
          onNavigatePlatform={() => setCurrentPage('platform')}
          onOpenTerms={() => setLegalType('terms')}
          onOpenPrivacy={() => setLegalType('privacy')}
          onOpenAdmin={() => setIsAdminLoginOpen(true)}
        />
      )}
      
      <PHQScreener 
        isOpen={isScreenerOpen} 
        onClose={() => setIsScreenerOpen(false)} 
        onOpenBooking={() => setIsBookingOpen(true)}
      />
      <EarlyAccessModal isOpen={isEarlyAccessOpen} onClose={() => setIsEarlyAccessOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <MessagingModal isOpen={isMessagingOpen} onClose={() => setIsMessagingOpen(false)} />
      <LegalModal isOpen={!!legalType} type={legalType || 'terms'} onClose={() => setLegalType(null)} />
      <AdminLoginModal isOpen={isAdminLoginOpen} onClose={() => setIsAdminLoginOpen(false)} onSuccess={handleAdminSuccess} />

      {currentPage !== 'admin' && <AIChatBot />}
      {currentPage !== 'admin' && <WhatsAppButton />}

      {currentPage !== 'admin' && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 bg-calm-blue hover:bg-blue-600 text-white p-4 rounded-2xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-[4000] hover:scale-110 active:scale-90 group ${
            showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-12 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} strokeWidth={3} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}
    </div>
  );
};

export default App;
