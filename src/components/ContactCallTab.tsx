import React from 'react';
import { Globe, Clock, Info } from 'lucide-react';

export const ContactCallTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-800">Support Operations Telephone Hotlines</h3>
          <p className="text-sm text-slate-500 mt-1">Direct global dial lines to our primary queue centers.</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Hotlines Operational
        </div>
      </div>

      {/* Region cards layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card US */}
        <div className="border border-slate-200 rounded-2xl p-5 hover:border-primary-200 hover:shadow-md hover:shadow-slate-100/50 transition-all flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">United States & Canada</h4>
            <a href="tel:+18002519588" className="block text-xl md:text-2xl font-semibold text-primary-600 font-sans hover:underline">
              +1 (800) 251-9588
            </a>
            <p className="text-[13px] text-slate-500 flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-slate-400" /> 24 Hours / 7 Days a week
            </p>
          </div>
        </div>

        {/* Card UK */}
        <div className="border border-slate-200 rounded-2xl p-5 hover:border-primary-200 hover:shadow-md hover:shadow-slate-100/50 transition-all flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">United Kingdom</h4>
            <a href="tel:+442036080610" className="block text-xl md:text-2xl font-semibold text-primary-600 font-sans hover:underline">
              +44 (20) 3608-0610
            </a>
            <p className="text-[13px] text-slate-500 flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-slate-400" /> Mon - Fri, 8:00 AM - 6:00 PM GMT
            </p>
          </div>
        </div>

        {/* Card Euro */}
        <div className="border border-slate-200 rounded-2xl p-5 hover:border-primary-200 hover:shadow-md hover:shadow-slate-100/50 transition-all flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">Eurozone Countries</h4>
            <a href="tel:+3224011422" className="block text-xl md:text-2xl font-semibold text-primary-600 font-sans hover:underline">
              +32 (2) 401-1422
            </a>
            <p className="text-[13px] text-slate-500 flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-slate-400" /> Mon - Fri, 9:00 AM - 6:00 PM CET
            </p>
          </div>
        </div>

        {/* Card APAC */}
        <div className="border border-slate-200 rounded-2xl p-5 hover:border-primary-200 hover:shadow-md hover:shadow-slate-100/50 transition-all flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">Asia-Pacific & Rest of World</h4>
            <a href="tel:+16462246990" className="block text-xl md:text-2xl font-semibold text-primary-600 font-sans hover:underline">
              +1 (646) 224-6990
            </a>
            <p className="text-[13px] text-slate-500 flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-slate-400" /> Mon - Fri, 9:00 AM - 6:00 PM EST
            </p>
          </div>
        </div>
      </div>

      {/* Priority Bypass Banner */}
      <div className="flex gap-3.5 p-5 bg-gradient-to-r from-primary-500/5 to-indigo-500/5 rounded-2xl border border-primary-100/60 mt-6">
        <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-slate-800 text-sm mb-1">Queue Priority Bypass Pin</h4>
          <p className="text-slate-600 text-xs leading-relaxed">
            You can find your 2FA telephone verification PIN in your Dashboard Security Console. Call priority bypass is available for Premium, Enterprise, and VIP account tiers.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ContactCallTab;
