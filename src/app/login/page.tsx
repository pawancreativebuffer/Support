"use client";

import React, { useState } from 'react';
import { LayoutDashboard, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Eye, EyeOff, MessageSquare, FileText, Mic } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (selectedRole: 'customer' | 'admin') => {
    setRole(selectedRole);
    if (selectedRole === 'customer') {
      setEmail('customer@example.com');
    } else {
      setEmail('admin@example.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const user = {
        name: role === 'customer' ? 'Jane Doe' : 'Alex Mercer',
        email: email,
        role: role === 'customer' ? 'Customer' : 'Admin'
      };

      try {
        localStorage.setItem('nexus_user', JSON.stringify(user));

        // Seed some demo tickets and chats if they don't exist
        const demoTickets = [
          {
            id: "NX-104928",
            firstName: "Jane",
            lastName: "Doe",
            email: "customer@example.com",
            category: "Debit Card Activation",
            description: "I received my physical debit card but when I click activation it gives an API timeout error code 500.",
            status: "Open",
            createdAt: "Jun 29, 2026 04:10 PM",
            type: "Form"
          },
          {
            id: "NX-291823",
            firstName: "Jane",
            lastName: "Doe",
            email: "customer@example.com",
            category: "Receive Payments",
            description: "My payout is delayed. It was supposed to settle yesterday morning. Can you please check the transfer reference?",
            status: "In Progress",
            createdAt: "Jun 28, 2026 09:12 AM",
            type: "Form"
          },
          {
            id: "NX-991822",
            firstName: "Jane",
            lastName: "Doe",
            email: "customer@example.com",
            category: "Voice Assistant",
            description: "Voice command inquiry: 'Show status of my visa checkout activation'. Speech recognition input logs verified.",
            status: "Resolved",
            createdAt: "Jun 27, 2026 11:30 AM",
            type: "Voice"
          },
          {
            id: "NX-882710",
            firstName: "Jane",
            lastName: "Doe",
            email: "customer@example.com",
            category: "Live Support Chat",
            description: "Chat inquiry regarding credit limit increase. Logged session details sync complete.",
            status: "Resolved",
            createdAt: "Jun 24, 2026 03:45 PM",
            type: "Live Chat"
          }
        ];

        const demoVoiceLogs = [
          {
            id: "VO-918231",
            title: "Card Activation Query",
            status: "Completed",
            createdAt: "Jun 29, 2026 10:14 AM",
            duration: "0:05",
            transcript: "please check if my debit card is activated",
            confidence: "98%"
          },
          {
            id: "VO-382910",
            title: "Microphone Settings Test",
            status: "Completed",
            createdAt: "Jun 28, 2026 02:22 PM",
            duration: "0:08",
            transcript: "testing voice assistant speech recognition error logs",
            confidence: "94%"
          }
        ];

        const existingTicketsRaw = localStorage.getItem('nexus_tickets');
        let ticketsToSet = demoTickets;
        if (existingTicketsRaw) {
          try {
            const parsed = JSON.parse(existingTicketsRaw);
            if (Array.isArray(parsed)) {
              const existingIds = new Set(parsed.map((t: { id: string }) => t.id));
              const missingDemo = demoTickets.filter(t => !existingIds.has(t.id));
              ticketsToSet = [...missingDemo, ...parsed];
            }
          } catch (e) {
            console.error(e);
          }
        }
        localStorage.setItem('nexus_tickets', JSON.stringify(ticketsToSet));

        const existingVoiceRaw = localStorage.getItem('nexus_voice_logs');
        let voiceToSet = demoVoiceLogs;
        if (existingVoiceRaw) {
          try {
            const parsed = JSON.parse(existingVoiceRaw);
            if (Array.isArray(parsed)) {
              const existingIds = new Set(parsed.map((v: { id: string }) => v.id));
              const missingVoice = demoVoiceLogs.filter(v => !existingIds.has(v.id));
              voiceToSet = [...missingVoice, ...parsed];
            }
          } catch (e) {
            console.error(e);
          }
        }
        localStorage.setItem('nexus_voice_logs', JSON.stringify(voiceToSet));

        // Trigger header update
        window.dispatchEvent(new CustomEvent('auth-change'));

        // Redirect based on role
        if (role === 'customer') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/admin';
        }
      } catch {
        setError('Storage security policy blocked session initiation.');
      }
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background glowing mesh blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container Card: Split 12-Column Layout */}
      <div className="relative w-full max-w-5xl bg-white rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(99,102,241,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10">

        {/* Left Side: Ticket Support System Panel (5 Columns) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-primary-900 via-primary-850 to-primary-800 p-8 lg:p-10 flex flex-col justify-start space-y-6 text-white relative overflow-hidden">
          {/* Subtle decoration lines inside the left panel */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full border-4 border-white" />
            <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full border-2 border-white border-dashed" />
          </div>

          <div className="space-y-4 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-white hover:opacity-90 transition-opacity">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-primary-600 shadow-md">
                <LayoutDashboard className="w-4.5 h-4.5" />
              </span>
              <span className="text-sm font-bold uppercase tracking-wider">Ticket Support</span>
            </Link>
            <div className="space-y-2 pt-4">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Ticket support system</h2>
              <p className="text-xs lg:text-sm text-primary-200/90 font-medium leading-relaxed">
                An AI-powered support suite designed to streamline queries, chats, and speech recognition into a unified interface.
              </p>
            </div>
          </div>

          {/* Channel Integration Infographic */}
          <div className="relative z-10 w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-6 shadow-xl">
            <div className="text-center">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Unified Query Pipeline</h4>
            </div>

            <div className="relative flex flex-col items-center py-2">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-primary-600 shadow-lg border border-primary-100">
                  <LayoutDashboard className="w-5.5 h-5.5" />
                </div>
                <span className="absolute -bottom-2 text-[10px] font-bold bg-primary-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">Support Hub</span>
              </div>

              {/* Connecting Vector Lines SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-[120px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Connection from Hub to bottom left (Live Chat) */}
                  <path d="M 100 45 L 40 100" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
                  {/* Connection from Hub to bottom middle (Form Query) */}
                  <path d="M 100 45 L 100 100" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
                  {/* Connection from Hub to bottom right (Voice Assistant) */}
                  <path d="M 100 45 L 160 100" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* The Three Connector Nodes */}
              <div className="flex justify-between w-full mt-10 relative z-10 px-1">
                {/* Node 1: Live Chat */}
                <div className="flex flex-col items-center space-y-2 w-1/3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-emerald-300 shadow-md">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-white leading-tight">Live Chat</div>
                    <div className="text-[11px] text-primary-200/70">Real-time support</div>
                  </div>
                </div>

                {/* Node 2: Form Query */}
                <div className="flex flex-col items-center space-y-2 w-1/3 mt-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-sky-300 shadow-md">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-white leading-tight">Form Query</div>
                    <div className="text-[11px] text-primary-200/70">Secure ticketing</div>
                  </div>
                </div>

                {/* Node 3: Voice Assistant */}
                <div className="flex flex-col items-center space-y-2 w-1/3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-amber-300 shadow-md">
                    <Mic className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-white leading-tight">Voice Assistant</div>
                    <div className="text-[11px] text-primary-200/70">Speech analysis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form Panel (7 Columns) */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-white relative">

          {/* Circular decorative networks line background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-45">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-slate-100" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-slate-100/80 border-dashed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-slate-100" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-slate-200/50" />
          </div>

          <div className="max-w-sm mx-auto w-full space-y-6 relative z-10">
            {/* Header Greeting */}
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Hello, Ticket Support</h3>
              <p className="text-sm text-slate-500 font-medium">Select your portal and enter your credentials to proceed.</p>
            </div>

            {/* Role Selector Tabs */}
            <div className="grid grid-cols-2 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/50">
              <button
                type="button"
                onClick={() => handleRoleSelect('customer')}
                className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-0 focus-visible:outline-none border border-transparent ${role === 'customer'
                  ? 'bg-white text-primary-600 shadow-sm border-slate-200/20'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <UserCheck className="w-4 h-4" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-0 focus-visible:outline-none border border-transparent ${role === 'admin'
                  ? 'bg-white text-primary-600 shadow-sm border-slate-200/20'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Portal
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-xs font-semibold leading-relaxed animate-shake">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Mail className="w-4.5 h-4.5" />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Lock className="w-4.5 h-4.5" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 py-3.5 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm rounded-full transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                {loading ? 'Securing Session...' : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Helper Banner */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 text-xs text-slate-500 leading-relaxed text-center font-medium">
              <span className="font-bold text-slate-800">Quick Test Credentials:</span> Simply press sign in. Mock data will seed in your browser session storage automatically.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

