"use client";

import * as React from 'react';
import { useState, useEffect, Suspense } from 'react';
import {
  ChevronRight,
  CheckCircle,
  Info,
  Mail,
  MessageCircle,
  PhoneCall,
  Send,
  Clock,
  Shield,
  Lock,
  Sparkles,
  HelpCircle,
  Activity,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const TOPICS = [
  { slug: "receive-payments", label: "Receive Payments" },
  { slug: "send-payments-withdraw-to-bank", label: "Send Payments / Withdraw to Bank" },
  { slug: "my-payoneer-account", label: "My Payoneer Account" },
  { slug: "my-payoneer-card", label: "My Payoneer Card" },
  { slug: "refer-a-friend-mobile-app-and-more", label: "Refer a Friend, Mobile App and More" },
  { slug: "technical-support", label: "Technical Support" },
  { slug: "performance", label: "Performance" },
  { slug: "api-integrations", label: "API Integrations" },
  { slug: "live-chat", label: "Live Chat" },
  { slug: "documentation", label: "Documentation" }
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('category') || '';

  // Tab State
  const [activeTab, setActiveTab] = useState<'live-chat' | 'send-message' | 'call-us'>('live-chat');

  // Form State
  const [language, setLanguage] = useState('English');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [comment, setComment] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Pre-fill topic from redirect parameter
  useEffect(() => {
    if (catParam) {
      const matched = TOPICS.find(t => t.slug === catParam);
      if (matched) {
        setTopic(matched.label);
      }
    }
  }, [catParam]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !comment) return;

    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

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
              <MessageCircle className="w-4 h-4" />
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
              <Mail className="w-4 h-4" />
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
              <PhoneCall className="w-4 h-4" />
              Call Us
            </button>
          </div>

          <div className="p-6 md:p-10">

            {/* LIVE CHAT TAB */}
            {activeTab === 'live-chat' && (
              <div className="py-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                  {/* Left Column: Glassmorphic Visual Console */}
                  <div className="lg:col-span-5 relative">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-3xl blur opacity-25"></div>
                    <div className="relative bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden font-sans text-[12px] text-slate-300 space-y-4">

                      {/* Grid overlay styling */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

                      {/* Console Header */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          <span className="text-[12px] font-bold tracking-widest text-green-400 uppercase">CONSOLE STATUS: ACTIVE</span>
                        </div>
                        <span className="text-[12px] text-slate-500 font-semibold tracking-wider">NODE_SECURE: 443</span>
                      </div>

                      {/* Console Body */}
                      <div className="space-y-3.5 relative z-10 text-[12px] leading-relaxed">
                        <div className="text-slate-400">
                          [18:42:15] establishing secure WebSocket connection...
                        </div>
                        <div className="text-slate-400">
                          [18:42:16] handshake verified (TLS_AES_256_GCM_SHA384)
                        </div>
                        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5 shadow-inner">
                          <div className="text-primary-400 font-bold text-[12px] uppercase tracking-wider">Sarah (Nexus Support)</div>
                          <p className="text-slate-300 text-[12px]">
                            Hello! I am logged in and ready. Click the initialize button to begin our session immediately.
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 pl-1">
                          <span className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </span>
                          <span className="italic text-[12px] text-slate-500">Sarah is typing...</span>
                        </div>
                      </div>

                      {/* Console Stats */}
                      <div className="border-t border-slate-900 pt-3 flex justify-between text-[12px] text-slate-500 font-semibold relative z-10">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary-400" />
                          <span>WAIT TIME: &lt; 2 MIN</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span>AES-256 SECURED</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Console Details and Trigger Button */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-primary-500 animate-spin" style={{ animationDuration: '6s' }} /> Next-Generation Chat
                      </div>
                      <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                        Support Connect Terminal
                      </h3>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        Our advanced customer care widget docks floating in the bottom-right. Connect instantly with payment processing experts while keeping your support guides open.
                      </p>
                    </div>

                    <ul className="space-y-2 text-sm text-slate-600 font-semibold">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center border border-green-200 flex-shrink-0">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span><strong>Zero Interruptions:</strong> Browse support guides while you chat.</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center border border-green-200 flex-shrink-0">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span><strong>Draggable & Resizable:</strong> Position or resize the widget anywhere.</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center border border-green-200 flex-shrink-0">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span><strong>Secure Channel:</strong> Safe transmission for transaction logs.</span>
                      </li>
                    </ul>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('open-chat-widget'));
                        }}
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl transition-all hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <MessageCircle className="w-4.5 h-4.5" />
                        Initialize Live Chat Window
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* SEND MESSAGE TAB */}
            {activeTab === 'send-message' && (
              <div className="py-2">
                {formStatus === 'success' ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-slate-900">Message Submitted!</h2>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for contacting customer care. We have created support ticket <strong>#NX-{Math.floor(Math.random() * 900000) + 100000}</strong>. Our agents will respond to your registered email address within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setComment('');
                        setFormStatus('idle');
                      }}
                      className="mt-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Form */}
                    <form onSubmit={handleFormSubmit} className="lg:col-span-8 space-y-6">
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-xl font-bold text-slate-800">Please fill in the form and describe your issue:</h3>
                      </div>


                      {/* First Name & Last Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-600 mb-2">First Name (letters only)</label>
                          <input
                            type="text"
                            required
                            pattern="[A-Za-z\s]+"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="e.g. Jane"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-600 mb-2">Last Name (letters only)</label>
                          <input
                            type="text"
                            required
                            pattern="[A-Za-z\s]+"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="e.g. Doe"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email Address & Topic Selector */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-600 mb-2">Email Address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. customer@example.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-600 mb-2">Relevant Topic / Category</label>
                          <select
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-colors"
                          >
                            <option value="">-- Choose a Category --</option>
                            {TOPICS.map(t => (
                              <option key={t.slug} value={t.label}>{t.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Comment Area */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-bold text-slate-600">Your question or comment:</label>
                          <span className="text-xs text-slate-400 font-mono">{comment.length} / 1000 characters</span>
                        </div>
                        <textarea
                          required
                          maxLength={1000}
                          rows={6}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Please detail your inquiry here..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none resize-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full sm:w-auto px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer disabled:bg-primary-400 flex items-center justify-center gap-2 shadow-sm"
                      >
                        {formStatus === 'loading' ? 'Submitting...' : (
                          <>
                            <Send className="w-4 h-4" /> Submit Inquiry
                          </>
                        )}
                      </button>
                    </form>

                    {/* Right Column: Sidebar Info Cards */}
                    <div className="lg:col-span-4 space-y-6">
                      <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 border-l-4 border-l-primary-600 shadow-md shadow-slate-100/50 rounded-2xl p-6 space-y-6">
                        <h4 className="font-extrabold text-slate-900 text-[16px] flex items-center gap-2 border-b border-slate-100 pb-3">
                          <Shield className="w-5 h-5 text-primary-600" />
                          Security & Response SLA
                        </h4>

                        <div className="space-y-5 text-[14px] text-slate-600 font-medium">
                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-slate-900 text-[14px]">SLA Timeline</p>
                              <p className="mt-1 text-slate-500 text-[14px] font-regular">Tickets are processed by chronological arrival. Average response time is under 24 hours.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Lock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-slate-900 text-[14px]">Encrypted Transit</p>
                              <p className="mt-1 text-slate-500 text-[14px] font-regular">Forms are fully secure. Data payloads are encrypted using SHA-256 SSL transit protocols.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Activity className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-slate-900 text-[14px]">Include details</p>
                              <p className="mt-1 text-slate-500 text-[14px] font-regular">Help us speed up resolution by including transaction IDs, merchant references, and dates in your comments.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CALL US TAB */}
            {activeTab === 'call-us' && (
              <div className="space-y-8">
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

                {/* Region cards layout in place of simple table */}
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
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-semibold text-sm">Loading contact page...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}
