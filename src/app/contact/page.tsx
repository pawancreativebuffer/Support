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
    <div className="bg-slate-50/50 pb-10">
      {/* Dynamic Sub-header Banner */}
      <div className="relative w-full bg-slate-50 border-b border-slate-200 py-10 mb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/40 via-slate-50 to-slate-50 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-3">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Support Center
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-950 font-semibold">Contact Us</span>
          </nav>

          {/* Banner Title */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">
            Contact Customer Care
          </h1>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-2xl">
            Choose your preferred channel below. Our systems and agents are live and secure.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Sleek Tab Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100/50 overflow-hidden">
          {/* Advanced styled headers */}
          <div className="flex border-b border-slate-200 bg-slate-50/30 p-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('live-chat')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === 'live-chat'
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100/80'
                }`}
            >
              <MessageCircle className="w-4.5 h-4.5" />
              Live Chat
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('send-message')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === 'send-message'
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
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === 'call-us'
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
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${activeTab === 'voice-assistant'
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
