import React from 'react';
import { Shield, Lock, FileKey } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const Security: React.FC = () => {
  return (
    <section id="privacy" className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-8 text-calm-blue">
            <Shield size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Privacy First. Always.</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-12">
            Your mental health journey is yours alone. We use bank-grade security protocols to ensure your data never falls into the wrong hands.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Reveal delay={100}>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Lock className="w-8 h-8 text-slate-700 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">AES-256 Encryption</h3>
              <p className="text-sm text-slate-500">All data is encrypted at rest and in transit using the industry standard.</p>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <FileKey className="w-8 h-8 text-slate-700 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Your Data, Your Control</h3>
              <p className="text-sm text-slate-500">Export or delete your entire history at any time with a single click.</p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Shield className="w-8 h-8 text-slate-700 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-slate-500">We adhere to strict standards for handling sensitive health information.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Security;