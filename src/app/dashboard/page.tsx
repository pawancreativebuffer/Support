"use client";

import React, { useState, useEffect } from 'react';
import {
  Ticket,
  MessageCircle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  X,
  AlertCircle,
  CheckSquare,
  ChevronRight,
  Send,
  MessageSquare,
  Mic,
  Calendar,
  History,
  Activity,
  User,
  FileText,
  Sparkles,
  Info,
  Volume2,
  VolumeX,
  Paperclip,
  Trash2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useUploadThing } from '@/lib/uploadthing';

interface TicketItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  description: string;
  status: 'Open' | 'With Client' | 'On Hold' | 'Escalated' | 'Closed' | 'Resolved';
  createdAt: string;
  type?: 'Form' | 'Voice' | 'Live Chat';
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  replies?: {
    sender: 'customer' | 'agent' | 'system';
    text: string;
    time: string;
    attachmentUrl?: string | null;
    attachmentName?: string | null;
  }[];
}

interface ChatItem {
  id: string;
  title: string;
  status: 'Active' | 'Connecting' | 'Closed';
  updatedAt: string;
  messages: { sender: 'user' | 'agent' | 'system'; text: string; time: string }[];
}

interface VoiceLogItem {
  id: string;
  title: string;
  status: 'Completed' | 'Failed';
  createdAt: string;
  duration: string;
  transcript: string;
  confidence: string;
  audioUrl?: string | null;
}

const parseVoiceTranscript = (text: string, createdAtStr: string) => {
  if (!text) return [];
  const lines = text.split('\n');
  const parsed: { sender: 'user' | 'agent'; text: string; time: string }[] = [];

  let baseTime = new Date();
  if (createdAtStr) {
    const parsedDate = Date.parse(createdAtStr);
    if (!isNaN(parsedDate)) {
      baseTime = new Date(parsedDate);
    }
  }

  let elapsedSeconds = 0;

  const formatTimeStr = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const hoursStr = hours < 10 ? '0' + hours : hours;
    return `${hoursStr}:${minutesStr} ${ampm}`;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let sender: 'user' | 'agent' = 'agent';
    let content = trimmed;

    if (trimmed.startsWith('Customer:')) {
      sender = 'user';
      content = trimmed.slice('Customer:'.length).trim();
    } else if (trimmed.startsWith('Agent:')) {
      sender = 'agent';
      content = trimmed.slice('Agent:'.length).trim();
    } else if (trimmed.startsWith('User:')) {
      sender = 'user';
      content = trimmed.slice('User:'.length).trim();
    } else if (trimmed.startsWith('Assistant:')) {
      sender = 'agent';
      content = trimmed.slice('Assistant:'.length).trim();
    } else {
      if (parsed.length > 0) {
        parsed[parsed.length - 1].text += ' ' + trimmed;
        const wordCount = trimmed.split(/\s+/).length;
        elapsedSeconds += Math.ceil(wordCount * 0.4);
        const msgTime = new Date(baseTime.getTime() + elapsedSeconds * 1000);
        parsed[parsed.length - 1].time = formatTimeStr(msgTime);
        continue;
      }
    }

    const wordCount = content.split(/\s+/).length;
    const duration = Math.max(3, Math.ceil(wordCount * 0.4));

    const msgTime = new Date(baseTime.getTime() + elapsedSeconds * 1000);
    parsed.push({
      sender,
      text: content,
      time: formatTimeStr(msgTime)
    });

    elapsedSeconds += duration + 2;
  }
  return parsed;
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [voiceLogs, setVoiceLogs] = useState<VoiceLogItem[]>([]);

  // UI Tab System: 'overview' | 'tickets' | 'chats' | 'voice'
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'chats' | 'voice'>('overview');

  // Filters & Search
  const [ticketFilter, setTicketFilter] = useState<'All' | 'Open' | 'With Client' | 'On Hold' | 'Escalated' | 'Closed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination & Limits
  const [visibleActivities, setVisibleActivities] = useState(5);
  const [ticketsPage, setTicketsPage] = useState(1);
  const ticketsPerPage = 5;
  const [chatsPage, setChatsPage] = useState(1);
  const chatsPerPage = 6;
  const [voicePage, setVoicePage] = useState(1);
  const voicePerPage = 6;

  // Reset page numbers on filter/search change
  useEffect(() => {
    setTicketsPage(1);
  }, [searchQuery, ticketFilter]);

  // Modals / Details
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [selectedVoiceLog, setSelectedVoiceLog] = useState<VoiceLogItem | null>(null);
  const [audioPlaybackError, setAudioPlaybackError] = useState(false);
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

      // Note 2 (E5, arpeggio arpeggio note)
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

  const [replyAttachment, setReplyAttachment] = useState<{ url: string; name: string } | null>(null);
  const [replyUploading, setReplyUploading] = useState(false);

  const { startUpload: startReplyUpload } = useUploadThing("ticketAttachment", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setReplyAttachment({
          url: res[0].url,
          name: res[0].name
        });
      }
      setReplyUploading(false);
    },
    onUploadError: (error: Error) => {
      alert(`Upload failed: ${error.message}`);
      setReplyUploading(false);
    },
    onUploadBegin: () => {
      setReplyUploading(true);
    }
  });

  useEffect(() => {
    setAudioPlaybackError(false);
  }, [selectedVoiceLog]);

  const loadDatabaseData = async (email: string, silent = false) => {
    if (!silent) setIsRefreshing(true);
    try {
      const ticketsRes = await fetch(`/api/tickets?email=${encodeURIComponent(email)}`);
      if (ticketsRes.ok) {
        const data: TicketItem[] = await ticketsRes.json();

        // If silent refresh and we have previous tickets, detect updates
        if (silent && tickets.length > 0) {
          data.forEach(freshT => {
            const oldT = tickets.find(o => o.id === freshT.id);
            if (oldT) {
              const freshRepliesCount = freshT.replies?.length || 0;
              const oldRepliesCount = oldT.replies?.length || 0;
              if (freshRepliesCount > oldRepliesCount) {
                const latestReply = freshT.replies?.[freshRepliesCount - 1];
                if (latestReply && latestReply.sender === 'agent') {
                  triggerToast(`Support agent replied to ticket ${freshT.id}!`);
                }
              }
              if (oldT.status !== freshT.status) {
                triggerToast(`Ticket ${freshT.id} status updated to ${freshT.status}!`);
              }
            }
          });
        }

        setTickets(data);

        // Update selected modal state if open
        if (selectedTicket) {
          const updated = data.find(t => t.id === selectedTicket.id);
          if (updated) setSelectedTicket(updated);
        }
      }

      const chatsRes = await fetch(`/api/chats?email=${encodeURIComponent(email)}`);
      if (chatsRes.ok) {
        const data = await chatsRes.json();
        setChats(data);
      }

      const voiceRes = await fetch(`/api/voice-logs?email=${encodeURIComponent(email)}`);
      if (voiceRes.ok) {
        const data = await voiceRes.json();
        setVoiceLogs(data);
      }
    } catch (err) {
      console.error('Error loading database data:', err);
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  };

  // Real-time notifications via SSE
  useEffect(() => {
    if (!user) return;

    const eventSource = new EventSource('/api/ticket-events?all=true');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'new_reply' || data.type === 'new_ticket' || data.type === 'status_update') {
          loadDatabaseData(user.email, true);
        }
      } catch (err) {}
    };

    return () => eventSource.close();
  }, [user, tickets, selectedTicket]);

  // Read auth state and load data on mount
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('nexus_user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed.role === 'Admin') {
            window.location.href = '/admin';
            return;
          }
          if (parsed.role === 'Agent') {
            window.location.href = '/agent';
            return;
          }
          setUser(parsed);
          loadDatabaseData(parsed.email);
        } catch {
          window.location.href = '/login';
        }
      } else {
        window.location.href = '/login';
      }
    };

    setTimeout(() => {
      checkUser();
    }, 0);
  }, []);

  // Close ticket / Sort out issue
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
          setSelectedTicket(prev => prev ? { ...prev, status: 'Closed' as const } : null);
        }
      }
    } catch (err) {
      console.error('Failed to resolve ticket:', err);
    }
  };

  // Send reply to agent in ticket discussion
  const handleSendTicketReply = async (e: React.FormEvent, ticketId: string) => {
    e.preventDefault();
    if (!ticketReplyText.trim() || !user) return;

    const replyMsg = ticketReplyText;
    setTicketReplyText('');

    // Pre-insert locally for responsiveness
    const timeString = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const localReply = {
      sender: 'customer' as const,
      text: replyMsg,
      time: timeString,
      attachmentUrl: replyAttachment?.url || null,
      attachmentName: replyAttachment?.name || null
    };

    if (selectedTicket) {
      const existingReplies = selectedTicket.replies || [];
      setSelectedTicket({
        ...selectedTicket,
        status: selectedTicket.status === 'Resolved' ? 'Open' : selectedTicket.status,
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
          text: replyMsg,
          attachmentUrl: replyAttachment?.url || null,
          attachmentName: replyAttachment?.name || null
        })
      });

      if (res.ok) {
        setReplyAttachment(null);
        const email = user.email;
        const freshRes = await fetch(`/api/tickets?email=${encodeURIComponent(email)}`);
        if (freshRes.ok) {
          const freshData = await freshRes.json();
          setTickets(freshData);
          const currentTicket = freshData.find((t: any) => t.id === ticketId);
          if (currentTicket) {
            setSelectedTicket(currentTicket);
          }
        }
      }
    } catch (err) {
      console.error('Failed to send reply:', err);
    }
  };

  // Unified Chronological Activity History Generator
  const getActivitiesList = () => {
    const activities: {
      id: string;
      type: 'ticket' | 'chat' | 'voice';
      title: string;
      subtitle: string;
      description: string;
      status: string;
      date: Date;
      displayDate: string;
      rawItem: any;
    }[] = [];

    // Add tickets to timeline
    tickets.forEach(t => {
      activities.push({
        id: t.id,
        type: 'ticket',
        title: `Support Ticket Submitted`,
        subtitle: `ID: ${t.id}`,
        description: t.description,
        status: t.status,
        date: new Date(t.createdAt),
        displayDate: t.createdAt,
        rawItem: t
      });
    });

    // Add chats to timeline
    chats.forEach(c => {
      let chatDate = new Date(c.updatedAt);
      if (isNaN(chatDate.getTime())) {
        chatDate = new Date();
      }
      activities.push({
        id: c.id,
        type: 'chat',
        title: `Live Chat Assistant Session`,
        subtitle: `${c.messages.length} messages exchanged`,
        description: c.messages[c.messages.length - 1]?.text || 'Chat session initiated.',
        status: c.status,
        date: chatDate,
        displayDate: c.updatedAt,
        rawItem: c
      });
    });

    // Add voice logs to timeline
    voiceLogs.forEach(v => {
      let voiceDate = new Date(v.createdAt);
      if (isNaN(voiceDate.getTime())) {
        voiceDate = new Date();
      }
      activities.push({
        id: v.id,
        type: 'voice',
        title: `Voice Call with AI Assistant`,
        subtitle: `Duration: ${v.duration}`,
        description: v.transcript,
        status: v.status,
        date: voiceDate,
        displayDate: v.createdAt,
        rawItem: v
      });
    });

    return activities.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  // Filters for Ticket list view
  const filteredTickets = tickets.filter(t => {
    const matchesFilter = ticketFilter === 'All' || t.status === ticketFilter;
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status !== 'Closed' && t.status !== 'Resolved').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Closed' || t.status === 'Resolved').length;
  const chatSessionsCount = chats.length;
  const voiceSessionsCount = voiceLogs.length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          <p className="text-slate-500 text-xs font-semibold tracking-wider">Syncing Workspace Session...</p>
        </div>
      </div>
    );
  }

  const activities = getActivitiesList();

  return (
    <div className="bg-slate-50/50 text-slate-800 min-h-screen font-sans selection:bg-primary-600 selection:text-white flex">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex w-[280px] bg-white border-r border-slate-200 flex-col items-center p-[20px] fixed top-[77px] bottom-0 left-0 overflow-y-auto shadow-sm z-20">
        <div className="flex flex-col items-center text-center mt-4 w-full">
          <div className="w-20 h-20 rounded-full bg-primary-600 text-white flex items-center justify-center border border-primary-700 mb-4 shadow-sm">
            <User className="w-10 h-10" />
          </div>
          <span className="text-[10px] font-semibold tracking-widest text-primary-500 uppercase mb-2 text-center">Customer Workspace</span>
          <h2 className="text-xl font-bold text-slate-800 leading-tight">Welcome, <br/> {user.name}</h2>
          <div className="mt-5 w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl flex items-center justify-center overflow-hidden">
            <span className="text-[11px] font-normal text-slate-500 truncate w-full text-center" title={user.email}>{user.email}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 w-full mt-8 mb-8 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 p-3 rounded-[8px] transition-all text-left cursor-pointer w-full group ${activeTab === 'overview'
              ? 'bg-primary-600 text-white font-medium shadow-md shadow-primary-200'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
          >
            <History className={`w-5 h-5 transition-colors ${activeTab === 'overview' ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
            <span className="text-sm">Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center gap-3 p-3 rounded-[8px] transition-all text-left cursor-pointer w-full group ${activeTab === 'tickets'
              ? 'bg-primary-600 text-white font-medium shadow-md shadow-primary-200'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
          >
            <Ticket className={`w-5 h-5 transition-colors ${activeTab === 'tickets' ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
            <span className="text-sm">Support Tickets</span>
          </button>

          <button
            onClick={() => setActiveTab('chats')}
            className={`flex items-center gap-3 p-3 rounded-[8px] transition-all text-left cursor-pointer w-full group ${activeTab === 'chats'
              ? 'bg-primary-600 text-white font-medium shadow-md shadow-primary-200'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
          >
            <MessageCircle className={`w-5 h-5 transition-colors ${activeTab === 'chats' ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
            <span className="text-sm">Live Chats</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-3 p-3 rounded-[8px] transition-all text-left cursor-pointer w-full group ${activeTab === 'voice'
              ? 'bg-primary-600 text-white font-medium shadow-md shadow-primary-200'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
          >
            <Mic className={`w-5 h-5 transition-colors ${activeTab === 'voice' ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
            <span className="text-sm">Voice AI</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto py-4 -mx-[20px] -mb-[20px] bg-slate-50 border-t border-slate-200 w-[calc(100%+40px)] text-center text-sm text-slate-500 font-normal">
          © 2026 All rights reserved.
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[280px] overflow-x-hidden pb-20">
      {/* Welcome Banner */}
      <div className="w-full px-6 pt-6">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-50/40 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
                <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                <span className="text-[10px] font-bold text-primary-700 uppercase tracking-widest">Workspace Dashboard</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                Monitor Your Support Operations
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => loadDatabaseData(user.email)}
                className="flex items-center justify-center gap-2 text-sm text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white"
                disabled={isRefreshing}
              >
                <Activity className={`w-4 h-4 text-primary-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh Records'}
              </button>
              <Link
                href="/contact?tab=send-message"
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-5 sm:px-8 h-[46px] rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" /> File New Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="w-full px-6 mt-6 space-y-6">

        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 border border-primary-100/50">
              <Ticket className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h4 className="text-slate-500 text-sm font-medium">Total Cases</h4>
              <div className="text-2xl font-bold text-slate-800 leading-none mt-1">{totalTickets}</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 border border-amber-100/50">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="text-slate-500 text-sm font-medium">Active / Open</h4>
              <div className="text-2xl font-bold text-slate-800 leading-none mt-1">{openTickets}</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 border border-emerald-100/50">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-slate-500 text-sm font-medium">Resolved</h4>
              <div className="text-2xl font-bold text-slate-800 leading-none mt-1">{resolvedTickets}</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0 border border-sky-100/50">
              <MessageCircle className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <h4 className="text-slate-500 text-sm font-medium">Chats Recorded</h4>
              <div className="text-2xl font-bold text-slate-800 leading-none mt-1">{chatSessionsCount}</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all col-span-2 md:col-span-1 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 border border-primary-100/50">
              <Mic className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <h4 className="text-slate-500 text-sm font-medium">Voice Sessions</h4>
              <div className="text-2xl font-bold text-slate-800 leading-none mt-1">{voiceSessionsCount}</div>
            </div>
          </div>
        </section>

        {/* Tab Contents */}
        <section className="w-full">

          {/* TAB 1: OVERVIEW TIMELINE */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
              {/* Left timeline column (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white border border-slate-200 p-6 rounded-xl relative shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div>
                      <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                        <History className="w-5 h-5 text-primary-600" /> Chronological Interaction History
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">A real-time audit log of every ticket raised, voice transcript logged, and chat started.</p>
                    </div>
                  </div>

                  {activities.length === 0 ? (
                    <div className="p-16 text-center space-y-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mx-auto text-slate-400 border border-slate-100">
                        <Activity className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-600 text-sm">No Activities Registered</h5>
                        <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">Complete a support form, initiate a chat session, or talk to our Voice Assistant to populate your history timeline.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative pl-6 border-l border-slate-200 space-y-8 ml-2 py-2">
                      {activities.slice(0, visibleActivities).map((act, index) => {
                        let dotColor ="bg-primary-500 ring-primary-100";
                        let typeLabel ="Ticket";
                        let typeColor ="text-primary-650 bg-primary-50 border-primary-100";

                        if (act.type === 'chat') {
                          dotColor ="bg-sky-500 ring-sky-100";
                          typeLabel ="Live Chat";
                          typeColor ="text-sky-600 bg-sky-50 border-sky-100";
                        } else if (act.type === 'voice') {
                          dotColor ="bg-blue-500 ring-blue-100";
                          typeLabel ="Voice AI";
                          typeColor ="text-blue-650 bg-blue-50 border-blue-100";
                        }

                        return (
                          <div key={index} className="relative group">
                            {/* Dot indicator */}
                            <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full ${dotColor} border-2 border-white ring-4 transition-all group-hover:scale-125`} />

                            <div className="space-y-1.5">
                              {/* Meta information */}
                              <div className="flex items-center gap-3 flex-wrap">
                                <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${typeColor}`}>
                                  {typeLabel}
                                </span>
                                <span className="text-slate-300 text-xs font-semibold">•</span>
                                <span className="text-xs text-slate-400 font-semibold">{act.displayDate}</span>
                              </div>

                              {/* Title / Header */}
                              <h4 className="text-sm font-bold text-slate-800 select-text">
                                {act.title}
                              </h4>

                              {/* Description body */}
                              <div className="bg-white border border-slate-200/80 p-5 rounded-xl mt-2.5 group-hover:border-slate-350 hover:shadow-sm transition-all max-w-full space-y-3.5">
                                {act.type === 'ticket' && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60">
                                      Category
                                    </span>
                                    <span className="text-xs font-bold text-slate-700">
                                      {act.rawItem.category}
                                    </span>
                                  </div>
                                )}
                                <p className="text-sm text-slate-600 leading-relaxed font-medium select-text">
                                  {act.description}
                                </p>
                                <div className="flex items-center justify-between border-t border-slate-100 mt-3 pt-3 text-xs">
                                  <span className="font-bold text-slate-400">{act.subtitle}</span>

                                  <button
                                    onClick={() => {
                                      if (act.type === 'ticket') setSelectedTicket(act.rawItem);
                                      if (act.type === 'chat') setSelectedChat(act.rawItem);
                                      if (act.type === 'voice') setSelectedVoiceLog(act.rawItem);
                                    }}
                                    className="font-bold text-primary-600 hover:text-primary-700 flex items-center gap-0.5 cursor-pointer"
                                  >
                                    View Full Context <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {visibleActivities < activities.length && (
                        <div className="pt-4 flex justify-center">
                          <button
                            onClick={() => setVisibleActivities(prev => prev + 5)}
                            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-6 h-[46px] rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm mt-2"
                          >
                            Load More Activity
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right widgets column (4 cols) */}
              <div className="lg:col-span-4 space-y-6">

                {/* Voice Launcher Widget */}
                <div className="bg-gradient-to-tr from-slate-900 via-slate-950 to-primary-950 border border-slate-900 p-6 rounded-xl relative overflow-hidden shadow-md text-white">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-xl pointer-events-none" />

                  <div className="space-y-4">
                    <Sparkles className="w-8 h-8 text-primary-400 animate-pulse" />
                    <h3 className="font-bold text-white text-base sm:text-lg">Need instant assistance?</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Consult Sarah, our AI Voice Assistant. Speak directly about store layouts, orders, or support queries.
                    </p>
                    <Link
                      href="/contact?tab=voice-assistant"
                      className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-6 h-[46px] rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm w-full"
                    >
                      <Mic className="w-4 h-4" /> Start Voice Consultation
                    </Link>
                  </div>
                </div>

                {/* Customer Support Info Guide Card */}
                <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-6 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-6">
                    <Info className="w-4 h-4 text-primary-600" />
                    <h4 className="font-bold text-slate-800 text-base sm:text-lg">Portal Guidelines</h4>
                  </div>
                  <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed">
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                      <p>Click on any activity item in your timeline or ticket row to see full transcripts and updates.</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                      <p>Mark queries as resolved to close tickets. Replying will reopen a closed ticket thread automatically.</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                      <p>Use the microphone widget in the Contact center to log hands-free voice assistance logs.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: SUPPORT TICKETS DETAILS */}
          {activeTab === 'tickets' && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-fade-in">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Registered Support Tickets</h3>
                  <p className="text-xs text-slate-400 mt-1">Review raised cases, check reply threads, and close solved issues.</p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tickets..."
                      className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:bg-white focus:outline-none transition-all w-60"
                    />
                  </div>

                  {/* Status Filters Dropdown */}
                  <div className="relative">
                    <select
                      value={ticketFilter}
                      onChange={(e) => setTicketFilter(e.target.value as any)}
                      className="h-[46px] px-4 rounded-[8px] border border-slate-200 bg-white text-slate-700 hover:border-primary-200 focus:border-primary-500 focus:outline-none transition-all text-sm cursor-pointer shadow-sm"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Open">Open</option>
                      <option value="With Client">With Client</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Escalated">Escalated</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tickets Table/List */}
              {filteredTickets.length === 0 ? (
                <div className="p-16 text-center space-y-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-600 text-sm">No Tickets Matched</h5>
                    <p className="text-slate-400 text-xs mt-1">No ticket data matches your search query or filter settings.</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 pt-4 space-y-4">
                  {filteredTickets.slice((ticketsPage - 1) * ticketsPerPage, ticketsPage * ticketsPerPage).map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className="bg-slate-50/50 border border-slate-200/80 p-5 rounded-xl hover:bg-white hover:border-primary-400 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs font-bold text-primary-700 bg-primary-50 border border-primary-100 px-2.5 py-0.5 rounded">
                            {ticket.id}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${ticket.type === 'Voice'
                            ? 'bg-blue-50 text-blue-650 border-blue-100'
                            : ticket.type === 'Live Chat'
                              ? 'bg-sky-50 text-sky-650 border-sky-100'
                              : 'bg-emerald-50 text-emerald-650 border-emerald-100'
                            }`}>
                            {ticket.type || 'Form'}
                          </span>
                          <span className="text-slate-300 text-xs">•</span>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            {ticket.category}
                          </span>
                          <span className="text-slate-300 text-xs">•</span>
                          <span className="text-xs text-slate-450 font-medium">
                            {ticket.createdAt}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal group-hover:text-slate-800 transition-colors line-clamp-2 select-text">
                          {ticket.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100/60">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${ticket.status === 'Open'
                          ? 'bg-slate-50 text-slate-700 border-slate-200'
                          : ticket.status === 'With Client' || ticket.status === 'On Hold'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : ticket.status === 'Escalated'
                              ? 'bg-slate-50 text-slate-800 border-slate-200'
                              : ticket.status === 'Closed' || ticket.status === 'Resolved'
                                ? 'bg-emerald-50 text-emerald-750 border-emerald-200'
                                : 'bg-slate-50 text-slate-600 border-slate-100'
                          }`}>
                          <span className="text-[8px] leading-none">
                            {ticket.status === 'Open'
                              ? '⚪'
                              : ticket.status === 'With Client' || ticket.status === 'On Hold'
                                ? '🟠'
                                : ticket.status === 'Escalated'
                                  ? '⚪'
                                  : '🟢'}
                          </span>
                          <span className="ml-1">{ticket.status}</span>
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all hidden md:block" />
                      </div>
                    </div>
                  ))}

                  {/* Pagination Controls */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                    <span className="text-xs text-slate-500 font-bold">
                      Showing {Math.min(filteredTickets.length, (ticketsPage - 1) * ticketsPerPage + 1)} to {Math.min(filteredTickets.length, ticketsPage * ticketsPerPage)} of {filteredTickets.length} tickets
                    </span>
                    <div className="flex gap-2">
                      <button
                        disabled={ticketsPage === 1}
                        onClick={() => setTicketsPage(prev => prev - 1)}
                        className="flex items-center justify-center gap-2 text-sm text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed select-none"
                      >
                        Previous
                      </button>
                      <button
                        disabled={ticketsPage * ticketsPerPage >= filteredTickets.length}
                        onClick={() => setTicketsPage(prev => prev + 1)}
                        className="flex items-center justify-center gap-2 text-sm text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed select-none"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIVE CHATS */}
          {activeTab === 'chats' && (
            <div className="space-y-6 animate-fade-in w-full">
              {chats.length === 0 ? (
                <div className="bg-white border border-slate-200 p-16 text-center rounded-xl space-y-4 shadow-sm">
                  <MessageSquare className="w-14 h-14 text-slate-400 mx-auto border border-slate-100 p-2.5 rounded-xl" />
                  <div>
                    <h5 className="font-bold text-slate-600 text-sm">No Live Chats Initiated</h5>
                    <p className="text-slate-400 text-xs mt-1">Start a conversation in our active support widget to track history.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chats.slice((chatsPage - 1) * chatsPerPage, chatsPage * chatsPerPage).map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className="bg-slate-50/50 border border-slate-200/80 hover:bg-white hover:border-primary-400 rounded-xl p-5 transition-all hover:shadow-md cursor-pointer space-y-4 group flex flex-col justify-between"
                      >
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2 truncate">
                              <span className="p-1 rounded-lg bg-primary-50 text-primary-600 border border-primary-100 flex-shrink-0">
                                <MessageCircle className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-extrabold text-slate-800 text-xs truncate group-hover:text-primary-600 transition-all">
                                {chat.title}
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border flex-shrink-0 ${chat.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-650 border-emerald-100 animate-pulse'
                              : 'bg-slate-100 text-slate-450 border-slate-200/60'
                              }`}>
                              {chat.status}
                            </span>
                          </div>

                          <p className="text-sm text-slate-555 leading-relaxed font-normal line-clamp-2 select-text">
                            &quot;{chat.messages[chat.messages.length - 1]?.text || 'Chat session initiated.'}&quot;
                          </p>
                        </div>

                        <div className="text-[10px] text-slate-400 font-bold flex items-center justify-between border-t border-slate-100/60 pt-3">
                          <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]">
                            {chat.messages.length} messages
                          </span>
                          <span className="text-slate-450 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {chat.updatedAt}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chats Pagination */}
                  <div className="flex items-center justify-between bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex-wrap gap-4">
                    <span className="text-xs text-slate-500 font-bold">
                      Showing {Math.min(chats.length, (chatsPage - 1) * chatsPerPage + 1)} to {Math.min(chats.length, chatsPage * chatsPerPage)} of {chats.length} chat sessions
                    </span>
                    <div className="flex gap-2">
                      <button
                        disabled={chatsPage === 1}
                        onClick={() => setChatsPage(prev => prev - 1)}
                        className="flex items-center justify-center gap-2 text-sm text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed select-none"
                      >
                        Previous
                      </button>
                      <button
                        disabled={chatsPage * chatsPerPage >= chats.length}
                        onClick={() => setChatsPage(prev => prev + 1)}
                        className="flex items-center justify-center gap-2 text-sm text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed select-none"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 4: VOICE LOGS */}
          {activeTab === 'voice' && (
            <div className="space-y-6 animate-fade-in w-full">
              {voiceLogs.length === 0 ? (
                <div className="bg-white border border-slate-200 p-16 text-center rounded-xl space-y-4 shadow-sm">
                  <Mic className="w-14 h-14 text-slate-400 mx-auto border border-slate-100 p-2.5 rounded-xl" />
                  <div>
                    <h5 className="font-bold text-slate-600 text-sm">No Voice Calls Tracked</h5>
                    <p className="text-slate-400 text-xs mt-1">Connect to our AI voice assistant to consult live and record calls.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {voiceLogs.slice((voicePage - 1) * voicePerPage, voicePage * voicePerPage).map((log) => (
                      <div
                        key={log.id}
                        onClick={() => setSelectedVoiceLog(log)}
                        className="bg-slate-50/50 border border-slate-200/80 hover:bg-white hover:border-primary-400 rounded-xl p-5 transition-all hover:shadow-md cursor-pointer space-y-4 group flex flex-col justify-between"
                      >
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2 truncate">
                              <span className="p-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex-shrink-0">
                                <Mic className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-extrabold text-slate-800 text-xs truncate group-hover:text-primary-600 transition-all">
                                Voice Session
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border flex-shrink-0 ${log.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-650 border-emerald-100'
                              : 'bg-slate-100 text-slate-450 border-slate-200/60'
                              }`}>
                              {log.status}
                            </span>
                          </div>

                          <p className="text-sm text-slate-555 leading-relaxed font-normal line-clamp-2 select-text">
                            &quot;{log.transcript}&quot;
                          </p>
                        </div>

                        <div className="text-[10px] text-slate-400 font-bold flex items-center justify-between border-t border-slate-100/60 pt-3">
                          <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]">
                            Duration: {log.duration}
                          </span>
                          <span className="text-slate-450 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {log.createdAt}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Voice Pagination */}
                  <div className="flex items-center justify-between bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex-wrap gap-4">
                    <span className="text-xs text-slate-500 font-bold">
                      Showing {Math.min(voiceLogs.length, (voicePage - 1) * voicePerPage + 1)} to {Math.min(voiceLogs.length, voicePage * voicePerPage)} of {voiceLogs.length} voice calls
                    </span>
                    <div className="flex gap-2">
                      <button
                        disabled={voicePage === 1}
                        onClick={() => setVoicePage(prev => prev - 1)}
                        className="flex items-center justify-center gap-2 text-sm text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed select-none"
                      >
                        Previous
                      </button>
                      <button
                        disabled={voicePage * voicePerPage >= voiceLogs.length}
                        onClick={() => setVoicePage(prev => prev + 1)}
                        className="flex items-center justify-center gap-2 text-sm text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed select-none"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

        </section>

      </div>

      {/* MODAL 1: TICKET CONVERSATION THREAD */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">

            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded border border-primary-100 shadow-sm">
                  {selectedTicket.id}
                </span>
                <h3 className="font-extrabold text-slate-800 text-lg select-text">
                  Discussion Thread
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
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 rounded-[8px] transition-all cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-full p-6 min-h-0">

                {/* Left Column: 5 cols (Inquiry Description & Status/Resolution) */}
                <div className="md:col-span-5 space-y-6 flex flex-col justify-start overflow-y-auto pr-2 pb-6 min-h-0 scrollbar-thin">

                  {/* Original Inquiry Description */}
                  <div className="bg-slate-50 rounded-xl p-5 space-y-3 shadow-inner">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Inquiry Description</p>
                    <div className="max-h-[160px] overflow-y-auto pr-1.5 scrollbar-thin">
                      <p className="text-sm md:text-[15px] text-slate-650 leading-relaxed select-text font-normal">
                        {selectedTicket.description}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 pt-2 border-t border-slate-200/60">
                      Raised on: {selectedTicket.createdAt}
                    </p>
                  </div>

                  {/* Ticket Attachments */}
                  {selectedTicket.attachmentUrl && (
                    <div className="bg-slate-50 rounded-xl p-5 space-y-3 shadow-inner flex flex-col">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Ticket Attachments</p>
                      <div className="flex flex-wrap gap-2.5">
                        <a
                          href={selectedTicket.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-sm max-w-full"
                        >
                          <FileText className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                          <span className="truncate text-slate-800">{selectedTicket.attachmentName || 'View Attachment'}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Status Indicator & Resolve Action */}
                  <div className="flex flex-col gap-4 p-5 rounded-xl bg-slate-50/50">
                    <div className="flex items-center justify-between border-b border-slate-200/40 pb-3">
                      <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Ticket Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${selectedTicket.status === 'Open'
                        ? 'bg-slate-50 text-slate-700 border-slate-200'
                        : selectedTicket.status === 'With Client' || selectedTicket.status === 'On Hold'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : selectedTicket.status === 'Escalated'
                            ? 'bg-slate-50 text-slate-800 border-slate-200'
                            : selectedTicket.status === 'Closed' || selectedTicket.status === 'Resolved'
                              ? 'bg-emerald-50 text-emerald-750 border-emerald-200'
                              : 'bg-slate-50 text-slate-600 border-slate-100'
                        }`}>
                        {selectedTicket.status}
                      </span>
                    </div>
                    {selectedTicket.status !== 'Resolved' && selectedTicket.status !== 'Closed' && (
                      <button
                        type="button"
                        onClick={() => handleResolveTicket(selectedTicket.id)}
                        className="w-full justify-center flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-6 h-[46px] rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm"
                      >
                        <CheckSquare className="w-4 h-4" /> Mark as Resolved
                      </button>
                    )}
                  </div>

                </div>

                {/* Right Column: 7 cols (Conversation Thread & Reply Input) */}
                <div className="md:col-span-7 flex flex-col h-full overflow-hidden border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 min-h-0">

                  {/* Fixed Header for Conversation Thread */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4 shrink-0">
                    <h4 className="font-bold text-slate-750 text-sm flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-primary-50 text-primary-600 border border-primary-100">
                        <MessageSquare className="w-4 h-4" />
                      </span>
                      Conversation Thread
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200/40">
                      Live responses
                    </span>
                  </div>

                  {/* Discussion Thread container */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4 flex flex-col min-h-0 scrollbar-thin">

                    {(!selectedTicket.replies || selectedTicket.replies.length === 0) ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-xl space-y-3.5 my-4">
                        <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shadow-sm animate-pulse">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-bold text-slate-700 text-sm">Queued for Assignment</h5>
                          <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                            No replies yet. Your ticket is currently in queue and our support agents will respond to you shortly.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedTicket.replies.map((reply, idx) => {
                          if (reply.sender === 'system') {
                            return (
                              <div key={idx} className="text-center my-2">
                                <span className="inline-block bg-slate-100 border border-slate-200/60 text-slate-500 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                  {reply.text}
                                </span>
                              </div>
                            );
                          }
                          const isUser = reply.sender === 'customer';
                          return (
                            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[85%] rounded-xl px-4.5 py-3 text-sm md:text-[15px] leading-relaxed font-normal shadow-sm ${isUser
                                ? 'bg-primary-600 text-white rounded-tr-none border border-primary-500/20'
                                : 'bg-slate-100 border border-slate-200/80 text-slate-800 rounded-tl-none'
                                }`}>
                                <p className="select-text">{reply.text}</p>

                                {reply.attachmentUrl && (
                                  <div className={`mt-2 pt-2 border-t ${isUser ? 'border-white/20' : 'border-slate-200'} flex`}>
                                    <a
                                      href={reply.attachmentUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all truncate max-w-full ${isUser
                                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-250'
                                        }`}
                                    >
                                      <FileText className="w-3.5 h-3.5 shrink-0" />
                                      <span className="truncate">{reply.attachmentName || 'View Attachment'}</span>
                                    </a>
                                  </div>
                                )}

                                <span className={`block text-[11px] font-semibold mt-1.5 text-right ${isUser ? 'text-white/80' : 'text-slate-500'}`}>
                                  {reply.time}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Modal Footer Reply Form */}
                  {selectedTicket.status !== 'Resolved' ? (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                      {replyAttachment && (
                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2.5 shadow-sm animate-fade-in">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-primary-600 shrink-0" />
                            <span className="text-xs font-bold text-slate-700 truncate max-w-[200px] sm:max-w-xs">{replyAttachment.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setReplyAttachment(null)}
                            className="p-1 text-red-500 hover:bg-red-55 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {replyUploading && (
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                          <Loader2 className="w-3.5 h-3.5 text-primary-600 animate-spin" />
                          Uploading reply file...
                        </div>
                      )}

                      <form
                        onSubmit={(e) => handleSendTicketReply(e, selectedTicket.id)}
                        className="flex gap-2.5"
                      >
                        <input
                          type="file"
                          id="reply-file-upload"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) startReplyUpload([file]);
                          }}
                        />
                        <label
                          htmlFor="reply-file-upload"
                          className="w-12 h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-all shrink-0 hover:border-primary-400"
                          title="Attach file"
                        >
                          <Paperclip className="w-5 h-5 text-slate-500 hover:text-primary-600" />
                        </label>

                        <input
                          type="text"
                          required
                          value={ticketReplyText}
                          onChange={(e) => setTicketReplyText(e.target.value)}
                          placeholder="Type your message update to the support agent..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none text-slate-800 placeholder-slate-400 transition-colors"
                        />
                        <button
                          type="submit"
                          disabled={replyUploading}
                          className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-all cursor-pointer shadow hover:shadow-md hover:scale-105 disabled:bg-primary-400 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4.5 h-4.5" />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="mt-4 p-4.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center text-xs font-bold text-emerald-600">
                      This inquiry has been marked as resolved.
                    </div>
                  )}

                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LIVE CHAT TRANSCRIPT */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[75vh] animate-scale-up">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-primary-50 text-primary-600 border border-primary-100">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-[15px] select-text">
                    {selectedChat.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedChat.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {selectedChat.status} Session Transcript
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedChat(null)}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 rounded-[8px] transition-all cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Transcript Messages Body */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[400px] bg-slate-50/20 space-y-4">
              {selectedChat.messages.map((msg, idx) => {
                if (msg.sender === 'system') {
                  return (
                    <div key={idx} className="text-center my-2">
                      <span className="inline-block bg-slate-100 border border-slate-200/60 text-slate-500 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        {msg.text}
                      </span>
                    </div>
                  );
                }
                const isUser = msg.sender === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-xl px-4.5 py-3 text-sm leading-relaxed shadow-sm ${isUser
                      ? 'bg-primary-600 text-white rounded-tr-none border border-primary-500/20'
                      : 'bg-white border border-slate-200 text-slate-850 rounded-tl-none'
                      }`}>
                      <p className="select-text">{msg.text}</p>
                      <span className={`block text-[11px] font-semibold mt-1.5 text-right ${isUser ? 'text-white/80' : 'text-slate-500'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Live chat session logged and encrypted.
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: VOICE LOG TRANSCRIPT */}
      {selectedVoiceLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">

            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                  <Mic className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base select-text">AI Voice Session Details</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Session ID: {selectedVoiceLog.id} • Called: {selectedVoiceLog.createdAt}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVoiceLog(null)}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 rounded-[8px] transition-all cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/20 min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-full p-6 min-h-0">

                {/* Left Column (5 cols): Call Stats & Live Audio Player */}
                <div className="md:col-span-5 space-y-6 flex flex-col justify-start overflow-y-auto pr-2 pb-6 min-h-0 scrollbar-thin">

                  {/* Status Indicator */}
                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Session Status</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${selectedVoiceLog.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-650 border-emerald-100'
                      : 'bg-slate-105 text-slate-455 border-slate-200/60'
                      }`}>
                      {selectedVoiceLog.status}
                    </span>
                  </div>

                  {/* Call Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Call Duration</span>
                      <span className="text-base font-bold text-slate-800 mt-1 block">{selectedVoiceLog.duration}</span>
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Confidence Score</span>
                      <span className="text-base font-bold mt-1 block text-primary-600">{selectedVoiceLog.confidence} Match</span>
                    </div>
                  </div>

                  {/* Audio Recording Player */}
                  <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-3.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Call Recording</p>
                      {!audioPlaybackError && <Volume2 className="w-4 h-4 text-primary-500 animate-pulse" />}
                    </div>

                    {!audioPlaybackError ? (
                      <div className="space-y-2">
                        <audio
                          controls
                          src={`/api/voice-audio?conversation_id=${selectedVoiceLog.id}`}
                          className="w-full h-9 rounded-lg"
                          onError={() => setAudioPlaybackError(true)}
                        />
                        <span className="block text-[9px] text-slate-400 font-semibold text-center leading-normal">
                          Recorded audio retrieved dynamically from ElevenLabs
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-5 border border-dashed border-slate-250 bg-slate-50/70 rounded-xl text-center space-y-3.5">
                        <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center shadow-sm">
                          <VolumeX className="w-4.5 h-4.5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-extrabold text-slate-750">
                            Audio recording not available
                          </p>
                          <p className="text-[11px] font-semibold text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                            Please verify if ELEVENLABS_API_KEY is configured in your server env, or wait if the call just ended.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Right Column (7 cols): Transcript Chat Thread */}
                <div className="md:col-span-7 flex flex-col h-full overflow-hidden border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 min-h-0">

                  {/* Fixed Header for Chat messages thread */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4 shrink-0">
                    <h4 className="font-bold text-slate-750 text-sm flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                        <MessageSquare className="w-4 h-4" />
                      </span>
                      Call Transcript Thread
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200/40">
                      Speech-To-Text Log
                    </span>
                  </div>

                  {/* Chat messages thread container */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-4 flex flex-col min-h-0 scrollbar-thin">

                    <div className="space-y-4 pt-2">
                      {parseVoiceTranscript(selectedVoiceLog.transcript, selectedVoiceLog.createdAt).length === 0 ? (
                        <p className="text-xs text-slate-400 italic text-center py-8">No transcript entries recorded.</p>
                      ) : (
                        parseVoiceTranscript(selectedVoiceLog.transcript, selectedVoiceLog.createdAt).map((msg, idx) => {
                          const isUser = msg.sender === 'user';
                          return (
                            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[85%] rounded-xl px-4.5 py-3 text-[14px] leading-relaxed font-normal shadow-sm ${isUser
                                ? 'bg-primary-600 text-white rounded-tr-none border border-primary-500/20'
                                : 'bg-slate-100 border border-slate-200/80 text-slate-800 rounded-tl-none'
                                }`}>
                                <span className={`block text-[9px] font-bold uppercase tracking-wider mb-1 ${isUser ? 'text-primary-200' : 'text-slate-455'
                                  }`}>
                                  {isUser ? 'Customer' : 'AI Assistant'}
                                </span>
                                <p className="select-text">{msg.text}</p>
                                <span className={`block text-[11px] font-semibold mt-1.5 text-right ${isUser ? 'text-white/80' : 'text-slate-500'}`}>
                                  {msg.time}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Voice transcription logs synced.
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification Card Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-slate-900 border border-slate-800 text-white rounded-xl px-5 py-4 shadow-xl flex items-center gap-3 max-w-sm animate-slide-in-right">
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
      </div>
    </div>
  );
}
