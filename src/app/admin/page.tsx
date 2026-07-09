"use client";

import React, { useState, useEffect } from 'react';
import {
  Ticket,
  CheckCircle,
  Clock,
  Search,
  X,
  CheckSquare,
  ChevronRight,
  Send,
  MessageSquare,
  History,
  Activity,
  User,
  Sparkles,
  Info,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface TicketItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  type?: 'Form' | 'Voice' | 'Live Chat';
  replies?: { sender: 'customer' | 'agent'; text: string; time: string }[];
}

export default function AdminPage() {
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets'>('overview');

  // Filters & Search
  const [ticketFilter, setTicketFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Forms
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  // Sound Synthesizer (Web Audio API)
  const playSupportChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      const gain2 = audioCtx.createGain();

      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      // Note 1 (C5, chime-like)
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2 (E5, delayed arpeggio note)
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.12);
      gain2.gain.setValueAtTime(0.15, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.5);
    } catch (err) {
      console.warn("Web Audio chime synthesis failed:", err);
    }
  };

  const triggerToast = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message }]);
    playSupportChime();
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  // Check if a ticket has actions pending (i.e. status is Open/In Progress AND the last reply is from the customer OR there are no replies yet)
  const needsReply = (t: TicketItem) => {
    if (t.status === 'Resolved') return false;
    if (!t.replies || t.replies.length === 0) return true;
    const lastReply = t.replies[t.replies.length - 1];
    return lastReply.sender === 'customer';
  };

  const loadDatabaseData = async (email: string, silent = false) => {
    if (!silent) setIsRefreshing(true);
    try {
      const ticketsRes = await fetch(`/api/tickets?email=${encodeURIComponent(email)}`);
      if (ticketsRes.ok) {
        const freshTickets: TicketItem[] = await ticketsRes.json();
        
        // If silent refresh and we have previous tickets, detect new customer messages/tickets
        if (silent && tickets.length > 0) {
          freshTickets.forEach(freshT => {
            const oldT = tickets.find(o => o.id === freshT.id);
            if (!oldT) {
              // Entirely new ticket
              triggerToast(`New support ticket ${freshT.id} raised by ${freshT.firstName}!`);
            } else {
              const freshRepliesCount = freshT.replies?.length || 0;
              const oldRepliesCount = oldT.replies?.length || 0;
              if (freshRepliesCount > oldRepliesCount) {
                const latestReply = freshT.replies?.[freshRepliesCount - 1];
                if (latestReply && latestReply.sender === 'customer') {
                  triggerToast(`Customer replied to support ticket ${freshT.id}!`);
                }
              }
            }
          });
        }
        
        setTickets(freshTickets);

        // Update selected modal state if open
        if (selectedTicket) {
          const updated = freshTickets.find(t => t.id === selectedTicket.id);
          if (updated) setSelectedTicket(updated);
        }
      }
    } catch (err) {
      console.error('Error loading database data:', err);
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  };

  // Auth Sync
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('nexus_user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed.role !== 'Agent' && parsed.role !== 'Admin') {
            window.location.href = '/agent-login';
            return;
          }
          setUser(parsed);
          loadDatabaseData(parsed.email);
        } catch {
          window.location.href = '/agent-login';
        }
      } else {
        window.location.href = '/agent-login';
      }
    };
    checkUser();
  }, []);

  // Polling for real-time notifications
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      loadDatabaseData(user.email, true);
    }, 8000);
    return () => clearInterval(interval);
  }, [user, tickets, selectedTicket]);

  const handleResolveTicket = async (ticketId: string) => {
    if (!user) return;
    try {
      const res = await fetch('/api/tickets/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: ticketId,
          action: 'resolve'
        })
      });

      if (res.ok) {
        loadDatabaseData(user.email);
        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket(prev => prev ? { ...prev, status: 'Resolved' } : null);
        }
      }
    } catch (err) {
      console.error('Failed to resolve ticket:', err);
    }
  };

  const handleSendTicketReply = async (e: React.FormEvent, ticketId: string) => {
    e.preventDefault();
    if (!ticketReplyText.trim() || !user) return;

    const replyMsg = ticketReplyText;
    setTicketReplyText('');

    // Pre-insert locally
    const timeString = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const localReply = {
      sender: 'agent' as const,
      text: replyMsg,
      time: timeString
    };

    if (selectedTicket) {
      const existingReplies = selectedTicket.replies || [];
      setSelectedTicket({
        ...selectedTicket,
        status: 'In Progress',
        replies: [...existingReplies, localReply]
      });
    }

    try {
      const res = await fetch('/api/tickets/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: ticketId,
          senderEmail: user.email,
          text: replyMsg
        })
      });

      if (res.ok) {
        loadDatabaseData(user.email);
      }
    } catch (err) {
      console.error('Failed to send reply:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexus_user');
    window.dispatchEvent(new CustomEvent('auth-change'));
    window.location.href = '/agent-login';
  };

  // Generate Activities
  const getActivitiesList = () => {
    const activities: {
      id: string;
      type: 'ticket';
      title: string;
      subtitle: string;
      description: string;
      status: string;
      date: Date;
      displayDate: string;
      rawItem: any;
    }[] = [];

    tickets.forEach(t => {
      activities.push({
        id: t.id,
        type: 'ticket',
        title: `Support Ticket submitted by ${t.firstName} ${t.lastName}`,
        subtitle: `ID: ${t.id} (${t.email})`,
        description: t.description,
        status: t.status,
        date: new Date(t.createdAt),
        displayDate: t.createdAt,
        rawItem: t
      });
    });

    return activities.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const filteredTickets = tickets.filter(t => {
    const matchesFilter = ticketFilter === 'All' 
      ? true 
      : ticketFilter === 'Open'
        ? t.status === 'Open' || t.status === 'In Progress'
        : t.status === ticketFilter;

    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalTickets = tickets.length;
  const activeTicketsCount = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const pendingResponseCount = tickets.filter(needsReply).length;
  const resolvedTicketsCount = tickets.filter(t => t.status === 'Resolved').length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          <p className="text-slate-500 text-xs font-semibold tracking-wider">Syncing Agent Session...</p>
        </div>
      </div>
    );
  }

  const activities = getActivitiesList();

  return (
    <div className="bg-slate-50/50 text-slate-800 min-h-screen font-sans selection:bg-primary-600 selection:text-white pb-20 relative">
      
      {/* Toast Notification Card Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-slate-900 border border-slate-800 text-white rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3 max-w-sm animate-slide-in-right">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary-400">System Notification</p>
              <p className="text-sm font-medium mt-0.5">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-primary-600 uppercase">Agent Workspace</span>
              <h2 className="text-base font-bold text-slate-800">Welcome Back, {user.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary-700 bg-primary-50 border border-primary-200 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm select-all">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse"></span>
              {user.email}
            </span>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-50/40 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
                <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                <span className="text-[10px] font-bold text-primary-700 uppercase tracking-widest">Agent Portal</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                Support Ticket Dispatch Queue
              </h1>
              <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
                Respond to incoming inquiries, view message timelines, and update resolution statuses in real-time.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => loadDatabaseData(user.email)}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                disabled={isRefreshing}
              >
                <Activity className={`w-4 h-4 text-primary-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh records'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-6 mt-10 space-y-10">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <Ticket className="w-5 h-5 text-primary-600" />
            <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-4">Total Cases</h4>
            <div className="text-2xl font-extrabold text-slate-800 mt-1">{totalTickets}</div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <Clock className="w-5 h-5 text-blue-500" />
            <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-4">Active Tickets</h4>
            <div className="text-2xl font-extrabold text-slate-800 mt-1">{activeTicketsCount}</div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              {pendingResponseCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              )}
            </div>
            <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-4">Needs Response</h4>
            <div className="text-2xl font-extrabold text-slate-800 mt-1">{pendingResponseCount}</div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-4">Resolved</h4>
            <div className="text-2xl font-extrabold text-slate-800 mt-1">{resolvedTicketsCount}</div>
          </div>
        </section>

        {/* Tab Switcher */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm ${activeTab === 'overview'
              ? 'bg-primary-600 border-primary-700 text-white shadow-md shadow-primary-200'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${activeTab === 'overview' ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-600'}`}>
              <History className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold">Activity Overview</span>
              <span className={`block text-[10px] ${activeTab === 'overview' ? 'text-white/80' : 'text-slate-400 font-semibold'}`}>Audit trail of issues</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm ${activeTab === 'tickets'
              ? 'bg-primary-600 border-primary-700 text-white shadow-md shadow-primary-200'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${activeTab === 'tickets' ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-600'}`}>
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm font-bold">Tickets Queue</span>
                <span className={`block text-[10px] ${activeTab === 'tickets' ? 'text-white/80' : 'text-slate-400 font-semibold'}`}>Manage client inquiries</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {pendingResponseCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500 text-white rounded-full animate-pulse">
                  {pendingResponseCount} Act
                </span>
              )}
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${activeTab === 'tickets'
                ? 'bg-white/20 text-white border-white/10'
                : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                {totalTickets}
              </span>
            </div>
          </button>
        </section>

        {/* Tab contents */}
        <section>
          {/* TAB 1: OVERVIEW TIMELINE */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-8 items-start animate-fade-in max-w-4xl">
              <div className="bg-white border border-slate-200 p-6 rounded-3xl relative shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                      <History className="w-5 h-5 text-primary-600" /> Chronological Ticket Activity
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">A historical audit log of every support ticket submitted by users.</p>
                  </div>
                </div>

                {activities.length === 0 ? (
                  <div className="p-16 text-center space-y-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-100">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-600 text-sm">No Tickets In Database</h5>
                      <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">When customers submit tickets through the portal, they will automatically appear here.</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative pl-6 border-l border-slate-200 space-y-8 ml-2 py-2">
                    {activities.map((act, index) => {
                      const requiresReply = needsReply(act.rawItem);
                      const dotColor = act.rawItem.status === 'Resolved' 
                        ? "bg-emerald-500 ring-emerald-100" 
                        : requiresReply
                          ? "bg-amber-500 ring-amber-100 animate-pulse"
                          : "bg-blue-500 ring-blue-100";

                      return (
                        <div key={index} className="relative group">
                          <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full ${dotColor} border-2 border-white ring-4 transition-all group-hover:scale-125`} />

                          <div className="space-y-1.5">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${act.rawItem.status === 'Resolved'
                                ? 'text-emerald-600 bg-emerald-50 border-emerald-100'
                                : requiresReply
                                  ? 'text-amber-600 bg-amber-50 border-amber-100 animate-pulse'
                                  : 'text-blue-600 bg-blue-50 border-blue-100'}`}>
                                {act.rawItem.status === 'Resolved' ? 'Resolved' : requiresReply ? 'Customer Replied' : 'Open'}
                              </span>
                              <span className="text-slate-300 text-xs font-semibold">•</span>
                              <span className="text-xs text-slate-400 font-semibold">{act.displayDate}</span>
                            </div>

                            <h4 className="text-sm font-bold text-slate-800 select-text">
                              {act.title}
                            </h4>

                            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl mt-2.5 group-hover:border-slate-355 hover:shadow-sm transition-all max-w-full space-y-3">
                              <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60">
                                    Category
                                  </span>
                                  <span className="text-xs font-bold text-slate-700">
                                    {act.rawItem.category}
                                  </span>
                                </div>
                                <span className="font-mono text-slate-450 font-bold select-all">{act.rawItem.email}</span>
                              </div>
                              
                              <p className="text-sm text-slate-600 leading-relaxed font-medium select-text pt-1">
                                {act.description}
                              </p>
                              
                              <div className="flex items-center justify-between border-t border-slate-100 mt-3 pt-3 text-xs">
                                <span className="font-mono font-bold text-slate-400">{act.subtitle}</span>

                                <button
                                  onClick={() => setSelectedTicket(act.rawItem)}
                                  className="font-bold text-primary-600 hover:text-primary-700 flex items-center gap-0.5 cursor-pointer"
                                >
                                  Open Conversation <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: TICKETS QUEUE TABLE */}
          {activeTab === 'tickets' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-800">Support Ticket Queue</h3>
                  <p className="text-xs text-slate-400 mt-1">Review active submissions, prioritize responses, and manage ticket lifecycles.</p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search queue..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-56 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div className="flex rounded-xl border border-slate-250 bg-slate-50 p-1">
                    {(['All', 'Open', 'Resolved'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setTicketFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${ticketFilter === f
                          ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50'
                          : 'text-slate-400 hover:text-slate-700'
                          }`}
                      >
                        {f === 'Open' ? 'Active' : f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filteredTickets.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-100">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-600 text-sm mt-4">No matching tickets found</h5>
                  <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">Try modifying your search queries or updating your status filter categories.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-4">Ticket ID</th>
                        <th className="py-3 px-4">Submitter Info</th>
                        <th className="py-3 px-4">Inquiry Category</th>
                        <th className="py-3 px-4">Date Submitted</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/60">
                      {filteredTickets.map(ticket => {
                        const requiresReply = needsReply(ticket);
                        return (
                          <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="py-4 px-4 font-mono text-xs font-bold text-slate-500">
                              <span className="flex items-center gap-2">
                                {requiresReply && (
                                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Requires Attention" />
                                )}
                                {ticket.id}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-xs font-bold text-slate-800">{ticket.firstName} {ticket.lastName}</div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{ticket.email}</div>
                            </td>
                            <td className="py-4 px-4 text-xs font-bold text-slate-700">
                              {ticket.category}
                            </td>
                            <td className="py-4 px-4 text-xs text-slate-400 font-semibold">
                              {ticket.createdAt}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${ticket.status === 'Resolved'
                                ? 'bg-emerald-50 text-emerald-650 border-emerald-100'
                                : requiresReply
                                  ? 'bg-amber-50 text-amber-650 border-amber-100 animate-pulse'
                                  : 'bg-blue-50 text-blue-650 border-blue-100'
                                }`}>
                                <span className={`w-1 h-1 rounded-full ${ticket.status === 'Resolved' ? 'bg-emerald-500' : requiresReply ? 'bg-amber-500' : 'bg-blue-500'}`} />
                                {ticket.status === 'Resolved' ? 'Resolved' : requiresReply ? 'Needs Reply' : ticket.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => setSelectedTicket(ticket)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-primary-50 text-slate-600 hover:text-primary-700 rounded-xl border border-slate-200/80 hover:border-primary-200 text-[11px] font-bold transition-all cursor-pointer"
                              >
                                Manage <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* DISCUSSION MODAL THREAD */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">

            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded border border-primary-100 shadow-sm">
                  {selectedTicket.id}
                </span>
                <h3 className="font-extrabold text-slate-800 text-lg">
                  Agent Dispatch Hub
                </h3>
                <span className="text-slate-300 text-sm font-semibold hidden sm:inline">•</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
                  {selectedTicket.category}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedTicket(null);
                  setTicketReplyText('');
                }}
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-450 hover:text-slate-700 transition-colors cursor-pointer border border-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inquiry Metadata & Status */}
                <div className="md:col-span-5 space-y-6 flex flex-col justify-start">
                  
                  {/* Original Inquiry Description */}
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-3 shadow-inner">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Original Inquiry</p>
                    <div className="max-h-[160px] overflow-y-auto pr-1.5 scrollbar-thin">
                      <p className="text-sm md:text-[15px] text-slate-650 leading-relaxed font-normal">
                        {selectedTicket.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-200/60 space-y-1">
                      <p className="text-xs text-slate-500 font-bold">Submitter: {selectedTicket.firstName} {selectedTicket.lastName}</p>
                      <p className="text-[11px] text-slate-400 font-mono select-all">{selectedTicket.email}</p>
                      <p className="text-[10px] text-slate-400 font-mono pt-1">Raised: {selectedTicket.createdAt}</p>
                    </div>
                  </div>

                  {/* Status Indicator & Resolve Action */}
                  <div className="flex flex-col gap-4 p-5 border border-slate-100 rounded-2xl bg-slate-50/50 shadow-inner">
                    <div className="flex items-center justify-between border-b border-slate-200/40 pb-3">
                      <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Ticket Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${selectedTicket.status === 'Open'
                        ? 'bg-blue-50 text-blue-650 border-blue-100'
                        : selectedTicket.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-650 border-amber-100'
                          : 'bg-emerald-50 text-emerald-650 border-emerald-100'
                        }`}>
                        {selectedTicket.status}
                      </span>
                    </div>

                    {selectedTicket.status !== 'Resolved' && (
                      <button
                        type="button"
                        onClick={() => handleResolveTicket(selectedTicket.id)}
                        className="w-full justify-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 border border-emerald-500/20 shadow-md shadow-emerald-500/10"
                      >
                        <CheckSquare className="w-4 h-4" /> Close & Mark Resolved
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: Thread & Reply Form */}
                <div className="md:col-span-7 flex flex-col h-full overflow-hidden border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                  
                  {/* Discussion Thread container */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[380px]">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <h4 className="font-bold text-slate-750 text-sm flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-primary-50 text-primary-600 border border-primary-100">
                          <MessageSquare className="w-4 h-4" />
                        </span>
                        Conversation Thread
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200/40">
                        Live responses
                      </span>
                    </div>

                    {(!selectedTicket.replies || selectedTicket.replies.length === 0) ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl space-y-3.5 my-4">
                        <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shadow-sm animate-pulse">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-bold text-slate-700 text-sm">Awaiting First Reply</h5>
                          <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                            No answers recorded. Provide support details below to start assisting this client.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedTicket.replies.map((reply, idx) => {
                          // For agent view, agent replies go on the right (primary), customer replies on the left (gray)
                          const isAgent = reply.sender === 'agent';
                          return (
                            <div key={idx} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[85%] rounded-2xl px-4.5 py-3 text-sm md:text-[15px] leading-relaxed font-normal shadow-sm ${isAgent
                                ? 'bg-primary-600 text-white rounded-tr-none border border-primary-500/20'
                                : 'bg-slate-100 border border-slate-200/80 text-slate-800 rounded-tl-none'
                                }`}>
                                <div className="text-[10px] font-bold opacity-60 mb-1">
                                  {isAgent ? 'Sarah (Support Agent)' : `${selectedTicket.firstName} ${selectedTicket.lastName}`}
                                </div>
                                <p className="select-text">{reply.text}</p>
                                <span className={`block text-[11px] font-semibold mt-1.5 text-right ${isAgent ? 'text-white/80' : 'text-slate-500'}`}>
                                  {reply.time}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Reply Form */}
                  {selectedTicket.status !== 'Resolved' ? (
                    <form
                      onSubmit={(e) => handleSendTicketReply(e, selectedTicket.id)}
                      className="mt-4 pt-4 border-t border-slate-100 flex gap-2.5"
                    >
                      <input
                        type="text"
                        value={ticketReplyText}
                        onChange={(e) => setTicketReplyText(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
                        placeholder="Type your support reply..."
                      />
                      <button
                        type="submit"
                        disabled={!ticketReplyText.trim()}
                        className="px-5 py-3 bg-primary-600 hover:bg-primary-750 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-primary-600/10 cursor-pointer border border-primary-500/20"
                      >
                        Send <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <div className="mt-4 p-4.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl flex items-center gap-3 text-xs font-bold leading-relaxed">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      This ticket has been marked resolved. Replies are closed.
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
