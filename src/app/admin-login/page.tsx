"use client";

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Lock, Mail, ArrowRight, Eye, EyeOff, MessageSquare, FileText, ShieldAlert, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('nexus_user');
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        if (parsed.role === 'Admin') {
          window.location.href = '/admin';
        } else if (parsed.role === 'Agent') {
          window.location.href = '/agent';
        } else {
          window.location.href = '/dashboard';
        }
      } catch (err) {}
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      const user = data.user;

      try {
        localStorage.setItem('nexus_user', JSON.stringify(user));

        // Trigger header update
        window.dispatchEvent(new CustomEvent('auth-change'));

        // Redirect to admin dashboard
        window.location.href = '/admin';
      } catch {
        setError('Storage security policy blocked session initiation.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background glowing mesh blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container Card: Split 12-Column Layout */}
      <div className="relative w-full max-w-5xl bg-white rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(99,102,241,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10">

        {/* Left Side: Admin Support System Panel (5 Columns) */}
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
              <span className="text-sm font-bold uppercase tracking-wider">Admin Console</span>
            </Link>
            <div className="space-y-2 pt-4">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Admin Dashboard</h2>
              <p className="text-xs lg:text-sm text-primary-200/90 font-medium leading-relaxed">
                Log in to view customer metrics, monitor support tickets status, and oversee system resolutions.
              </p>
            </div>
          </div>

          {/* Channel Integration Infographic */}
          <div className="relative z-10 w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-6 shadow-xl">
            <div className="text-center">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Admin Workspace</h4>
            </div>

            <div className="relative flex flex-col items-center py-2">
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-primary-600 shadow-lg border border-primary-100">
                  <LayoutDashboard className="w-5.5 h-5.5" />
                </div>
                <span className="absolute -bottom-2 text-[10px] font-bold bg-primary-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">Admin Panel</span>
              </div>

              {/* Connecting Vector Lines SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-[120px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 100 45 L 100 100" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* The Connector Node */}
              <div className="flex justify-center w-full mt-10 relative z-10 px-1">
                {/* Node: Form Query */}
                <div className="flex flex-col items-center space-y-2 w-1/2">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-sky-300 shadow-md">
                    <ShieldAlert className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-white leading-tight">System KPIs</div>
                    <div className="text-[11px] text-primary-200/70">Oversee support status</div>
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
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Hello, Administrator</h3>
              <p className="text-sm text-slate-500 font-medium">Enter your registered admin credentials to proceed.</p>
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
                  <label className="block text-sm font-medium capitalize text-slate-700 mb-2">Username / Login ID</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Mail className="w-4.5 h-4.5" />
                    </span>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-[46px] bg-slate-50 border border-slate-300 rounded-[8px] pl-11 pr-4 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all"
                      placeholder="Enter your login username"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium capitalize text-slate-700">Password</label>
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
                      className="w-full h-[46px] bg-slate-50 border border-slate-300 rounded-[8px] pl-11 pr-11 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:bg-white focus:outline-none transition-all"
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
                className="w-full bg-primary-600 hover:bg-slate-50 text-white hover:text-primary-600 border border-transparent hover:border-primary-200 text-sm font-medium px-8 h-[46px] flex items-center justify-center gap-2 rounded-[8px] transition-all duration-300 cursor-pointer focus:outline-none"
              >
                {loading ? 'Securing Session...' : (
                  <>
                    <LogIn className="w-4 h-4" /> Sign In
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
