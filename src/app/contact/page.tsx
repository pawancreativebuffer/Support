"use client";

import * as React from 'react';
import { useState, useEffect, Suspense } from 'react';
import {
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  Info,
  Home,
  ArrowLeft,
  Mail,
  MessageCircle,
  PhoneCall,
  Send,
  User,
  Clock
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
  const artParam = searchParams.get('article') || '';

  // Tab State
  const [activeTab, setActiveTab] = useState<'live-chat' | 'send-message' | 'call-us'>('send-message');

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

  // Chat Simulation State
  const [chatStatus, setChatStatus] = useState<'idle' | 'connecting' | 'active'>('idle');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'agent' | 'system'; text: string; time: string }[]>([]);
  const [chatInput, setChatInput] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !comment) return;

    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const startChatSimulation = () => {
    setChatStatus('connecting');
    setChatMessages([
      { sender: 'system', text: 'Initializing live secure chat tunnel...', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setTimeout(() => {
      setChatStatus('active');
      setChatMessages(prev => [
        ...prev,
        { sender: 'system', text: 'Sarah from Support has joined the session.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { sender: 'agent', text: `Hello ${firstName || 'there'}! I noticed you were reading our guide on "${artParam.replace(/-/g, ' ') || 'payments'}". How can I help resolve your issue today?`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 2000);
  };

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = chatInput;
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: userMsg, time: userTime }
    ]);
    setChatInput('');

    // Simulated typing response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'agent', text: "Thank you for the explanation. Let me look up your wallet transaction history. I'll resolve this for you in a moment.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Dynamic Sub-header Banner */}
      <div className="relative w-full bg-slate-50 border-b border-slate-200 py-8 mb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/30 via-slate-50 to-slate-50 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-3">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Support Center
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">Contact Us</span>
          </nav>

          {/* Banner Title */}
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Contact Customer Care
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Tabs header matching reference screenshot */}
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button
              type="button"
              onClick={() => setActiveTab('live-chat')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-5 text-sm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${activeTab === 'live-chat'
                ? 'border-primary-500 text-primary-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <MessageCircle className="w-4 h-4" />
              Live Chat
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('send-message')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-5 text-sm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${activeTab === 'send-message'
                ? 'border-primary-500 text-primary-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <Mail className="w-4 h-4" />
              Send Message
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('call-us')}
              className={`flex-1 flex items-center justify-center gap-2.5 py-5 text-sm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${activeTab === 'call-us'
                ? 'border-primary-500 text-primary-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <PhoneCall className="w-4 h-4" />
              Call Us
            </button>
          </div>

          <div className="p-6 md:p-10">

            {/* SEND MESSAGE TAB */}
            {activeTab === 'send-message' && (
              <div className="space-y-6">
                {formStatus === 'success' ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-slate-900">Message Submitted!</h2>
                    <p className="text-slate-600 text-sm max-w-md mx-auto">
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
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="border-b border-slate-100 pb-2">
                      <h3 className="text-base font-bold text-slate-800">Please fill in the form and describe your issue:</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Language field */}
                      <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Select your language:</label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
                        >
                          <option>English</option>
                          <option>Spanish (Español)</option>
                          <option>French (Français)</option>
                          <option>German (Deutsch)</option>
                          <option>Japanese (日本語)</option>
                        </select>
                      </div>

                      {/* Placeholder to keep alignment */}
                      <div className="hidden md:block"></div>
                    </div>

                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">First Name (Please use only alphabetical characters)</label>
                        <input
                          type="text"
                          required
                          pattern="[A-Za-z\s]+"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="e.g. Jane"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Last Name (Please use only alphabetical characters)</label>
                        <input
                          type="text"
                          required
                          pattern="[A-Za-z\s]+"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Doe"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
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
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Relevant Topic / Category</label>
                        <select
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
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
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full md:w-auto px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer disabled:bg-primary-400 flex items-center justify-center gap-2 shadow-sm"
                    >
                      {formStatus === 'loading' ? 'Submitting...' : (
                        <>
                          <Send className="w-4 h-4" /> Submit Inquiry
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* LIVE CHAT TAB */}
            {activeTab === 'live-chat' && (
              <div className="space-y-6">
                {chatStatus === 'idle' ? (
                  <div className="text-center py-10 space-y-6 max-w-md mx-auto">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto text-primary-600">
                      <MessageCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 font-sans">Connect with a Live Agent</h3>
                      <p className="text-sm text-slate-500">
                        Chat directly with our customer care representatives for immediate issues regarding wallet balances, card security, and payment transactions.
                      </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-center gap-6 text-sm font-semibold">
                      <span className="flex items-center gap-1.5 text-green-600">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Agents Online
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" />
                        Wait: &lt; 2 minutes
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={startChatSimulation}
                      className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      Start Live Chat Session
                    </button>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner flex flex-col h-[480px] bg-slate-50">
                    {/* Chat Header */}
                    <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center font-bold text-sm text-primary-700">
                          S
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Sarah</h4>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Customer Care Agent</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200">SECURE LINK</span>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
                      {chatMessages.map((msg, i) => {
                        if (msg.sender === 'system') {
                          return (
                            <div key={i} className="text-center">
                              <span className="inline-block bg-slate-200/60 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full">{msg.text}</span>
                            </div>
                          );
                        }

                        const isUser = msg.sender === 'user';
                        return (
                          <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${isUser ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                              }`}>
                              <p className="leading-relaxed">{msg.text}</p>
                              <span className={`block text-[9px] mt-1 text-right ${isUser ? 'text-primary-200' : 'text-slate-400'}`}>{msg.time}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chat Input Form */}
                    <form onSubmit={sendChatMessage} className="bg-white border-t border-slate-200 p-3 flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        disabled={chatStatus === 'connecting'}
                        placeholder={chatStatus === 'connecting' ? 'Connecting with agent...' : 'Type your message...'}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-primary-500 focus:outline-none disabled:bg-slate-100 disabled:text-slate-400"
                      />
                      <button
                        type="submit"
                        disabled={chatStatus === 'connecting' || !chatInput.trim()}
                        className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors disabled:bg-slate-100 disabled:text-slate-300 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* CALL US TAB */}
            {activeTab === 'call-us' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-800">Support Operations Telephone Hotlines</h3>
                  <p className="text-sm text-slate-500 mt-1">Please have your Customer ID PIN ready before dialing to bypass the queue system.</p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                        <th className="px-5 py-3">Region</th>
                        <th className="px-5 py-3">Phone Number</th>
                        <th className="px-5 py-3">Operating Hours</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-5 py-4 font-semibold text-slate-800">United States & Canada</td>
                        <td className="px-5 py-4 font-mono text-primary-600 font-bold">+1 (800) 251-9588</td>
                        <td className="px-5 py-4 text-slate-500">24 Hours / 7 Days</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 font-semibold text-slate-800">United Kingdom</td>
                        <td className="px-5 py-4 font-mono text-primary-600 font-bold">+44 (20) 3608-0610</td>
                        <td className="px-5 py-4 text-slate-500">Mon - Fri, 8:00 AM - 6:00 PM GMT</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 font-semibold text-slate-800">Eurozone Countries</td>
                        <td className="px-5 py-4 font-mono text-primary-600 font-bold">+32 (2) 401-1422</td>
                        <td className="px-5 py-4 text-slate-500">Mon - Fri, 9:00 AM - 6:00 PM CET</td>
                      </tr>
                      <tr>
                        <td className="px-5 py-4 font-semibold text-slate-800">Asia-Pacific & Rest of World</td>
                        <td className="px-5 py-4 font-mono text-primary-600 font-bold">+1 (646) 224-6990</td>
                        <td className="px-5 py-4 text-slate-500">Mon - Fri, 9:00 AM - 6:00 PM EST</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-3.5 p-5 bg-primary-50 rounded-2xl border border-primary-100 mt-6">
                  <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-primary-900 text-sm mb-1">Queue Priority Bypass</h4>
                    <p className="text-primary-700 text-xs leading-relaxed">
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
