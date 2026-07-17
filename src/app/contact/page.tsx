"use client";

import * as React from 'react';
import { useState, Suspense } from 'react';
import { ChevronRight, MessageCircle, Mail, PhoneCall, Mic } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TOPICS } from '../../data/topics';
import { ContactChatTab } from '../../components/ContactChatTab';
import { ContactMessageTab } from '../../components/ContactMessageTab';
import { ContactCallTab } from '../../components/ContactCallTab';
import { ContactVoiceTab } from '../../components/ContactVoiceTab';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('category') || '';

  // Tab State
  const [activeTab, setActiveTab] = useState<'live-chat' | 'send-message' | 'call-us' | 'voice-assistant'>('live-chat');

  // Compute directly from searchParams during render
  const matched = catParam ? TOPICS.find(t => t.slug === catParam) : null;
  const initialTopic = matched ? matched.label : '';

  return (
    <div className="bg-white pb-12">
      {/* Dynamic Sub-header Banner */}
      <div className="relative w-full border-b border-primary-900/50 py-12 md:py-16 mb-10 overflow-hidden bg-slate-950">
        {/* Deep Theme-Colored Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-slate-950 to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/40 via-transparent to-transparent" />
        
        {/* Elegant Grid Texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] pointer-events-none" />
        
        {/* Dynamic Theme Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-primary-600/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] left-[30%] w-[20%] h-[20%] rounded-full bg-primary-400/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-[15px]">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs md:text-sm text-slate-400 font-medium mb-4">
            <Link href="/" className="hover:text-primary-400 transition-colors whitespace-nowrap">
              Support Center
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <span className="text-white font-semibold whitespace-nowrap">Contact Us</span>
          </nav>

          {/* Banner Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Contact Customer Care
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-[15px]">
        {/* Sleek Tab Container */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          {/* Advanced styled headers with mobile horizontal scrolling */}
          <div className="flex overflow-x-auto md:overflow-visible scrollbar-none border-b border-slate-200 bg-slate-50/30 p-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('live-chat')}
              className={`flex-1 flex-shrink-0 md:flex-shrink flex items-center justify-center gap-2.5 px-4 md:px-2 py-4 rounded-xl text-xs md:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${activeTab === 'live-chat'
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100/80'
                }`}
            >
              <MessageCircle className="w-4 h-4 md:w-4.5 md:h-4.5" />
              Live Chat
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('send-message')}
              className={`flex-1 flex-shrink-0 md:flex-shrink flex items-center justify-center gap-2.5 px-4 md:px-2 py-4 rounded-xl text-xs md:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${activeTab === 'send-message'
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100/80'
                }`}
            >
              <Mail className="w-4.5 h-4.5" />
              Send Message
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('call-us')}
              className={`flex-1 flex-shrink-0 md:flex-shrink flex items-center justify-center gap-2.5 px-4 md:px-2 py-4 rounded-xl text-xs md:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${activeTab === 'call-us'
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100/80'
                }`}
            >
              <PhoneCall className="w-4.5 h-4.5" />
              Call Us
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('voice-assistant')}
              className={`flex-1 flex-shrink-0 md:flex-shrink flex items-center justify-center gap-2.5 px-4 md:px-2 py-4 rounded-xl text-xs md:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${activeTab === 'voice-assistant'
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100/80'
                }`}
            >
              <Mic className="w-4.5 h-4.5" />
              Voice Assistant
            </button>
          </div>

          <div className="p-6 md:p-10">
            {activeTab === 'live-chat' && <ContactChatTab />}
            {activeTab === 'send-message' && (
              <ContactMessageTab topics={TOPICS} initialTopic={initialTopic} />
            )}
            {activeTab === 'call-us' && <ContactCallTab />}
            {activeTab === 'voice-assistant' && <ContactVoiceTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-semibold text-sm">
          Loading contact page...
        </div>
      }
    >
      <ContactFormContent />
    </Suspense>
  );
}
