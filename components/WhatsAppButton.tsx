
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "919321408094";
  const message = encodeURIComponent("Hello MindLens team, I'm interested in learning more about your mental wellness services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-[1000] pointer-events-none w-fit">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer"
        aria-label="WhatsApp Support"
      >
        <MessageCircle size={28} fill="white" className="text-[#25D366]" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
