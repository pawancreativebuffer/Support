import React from 'react';
import { Settings, Shield, Zap, Layers, MessageCircle, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const ServicesSection: React.FC = () => {
  const services = [
    { title: "Technical Support", icon: <Settings className="w-6 h-6 text-white" />, description: "Get elite help with technical issues and system errors. We're here 24/7.", span: "col-span-1 lg:col-span-2", bg: "bg-slate-900 border-slate-800", text: "text-slate-300", titleColor: "text-white", iconBg: "bg-white/10 border-white/20" },
    { title: "Account & Billing", icon: <Shield className="w-6 h-6 text-primary-600" />, description: "Manage your invoices and payments securely.", span: "col-span-1 lg:col-span-1", bg: "bg-white border-slate-200", text: "text-slate-600", titleColor: "text-slate-900", iconBg: "bg-slate-50 border-slate-100" },
    { title: "Performance", icon: <Zap className="w-6 h-6 text-primary-700" />, description: "Optimize your app for maximum speed.", span: "col-span-1 lg:col-span-1", bg: "bg-primary-50 border-primary-100", text: "text-primary-700", titleColor: "text-primary-900", iconBg: "bg-white border-primary-200" },
    { title: "API Integrations", icon: <Layers className="w-6 h-6 text-primary-600" />, description: "Connect with third-party services smoothly.", span: "col-span-1 lg:col-span-2", bg: "bg-white border-slate-200", text: "text-slate-600", titleColor: "text-slate-900", iconBg: "bg-slate-50 border-slate-100" },
    { title: "Live Chat", icon: <MessageCircle className="w-6 h-6 text-white" />, description: "Chat directly with our team in real-time.", span: "col-span-1 lg:col-span-2", bg: "bg-primary-600 border-primary-500", text: "text-primary-100", titleColor: "text-white", iconBg: "bg-white/20 border-white/30" },
    { title: "Documentation", icon: <BookOpen className="w-6 h-6 text-primary-600" />, description: "Browse our detailed guides and tutorials.", span: "col-span-1 lg:col-span-1", bg: "bg-white border-slate-200", text: "text-slate-600", titleColor: "text-slate-900", iconBg: "bg-slate-50 border-slate-100" },
  ];

  return (
    <div id="solutions" className="w-full max-w-7xl mb-32 scroll-mt-24">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3 h-3 text-primary-500" /> Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Explore specialized teams.
          </h2>
        </div>
        <button className="hidden lg:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 cursor-pointer group px-5 py-2.5 bg-primary-50 rounded-full">
          View all services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <Link
            key={i}
            href={`/article/${service.title.toLowerCase().replace(/ /g, '-')}`}
            className={`relative flex flex-col p-8 min-h-[280px] rounded-[2rem] border ${service.bg} ${service.span} hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 group overflow-hidden`}
          >
            {/* Decorative element for the big dark card */}
            {i === 0 && <div className="absolute -right-20 -top-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />}

            <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 shadow-sm relative z-10 ${service.iconBg}`}>
              {service.icon}
            </div>
            <h3 className={`text-2xl font-bold mb-3 relative z-10 ${service.titleColor}`}>{service.title}</h3>
            <p className={`leading-relaxed text-base relative z-10 ${service.text}`}>
              {service.description}
            </p>
            <div className="mt-auto pt-4 flex justify-end relative z-10">
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm
                ${i === 0 || i === 4 ? 'bg-white/10 border-white/20 text-white group-hover:bg-white group-hover:text-primary-900' : 'bg-primary-600 border-primary-600 text-white group-hover:bg-primary-700'}`}>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
