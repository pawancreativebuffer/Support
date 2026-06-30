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
  AlertTriangle, 
  CheckSquare, 
  ChevronRight,
  Send,
  MessageSquare,
  Mic
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
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [voiceLogs, setVoiceLogs] = useState<VoiceLogItem[]>([]);
  
  // UI Filters & Search
  const [ticketFilter, setTicketFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals / Details Views
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [selectedVoiceLog, setSelectedVoiceLog] = useState<VoiceLogItem | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');
  const [isAdminPreview, setIsAdminPreview] = useState(false);

  const loadStoredData = () => {
    try {
      const storedTickets = localStorage.getItem('nexus_tickets');
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
      
      const storedChats = localStorage.getItem('nexus_chats');
      if (storedChats) {
        setChats(JSON.parse(storedChats));
      }

      const storedVoiceLogs = localStorage.getItem('nexus_voice_logs');
      if (storedVoiceLogs) {
        setVoiceLogs(JSON.parse(storedVoiceLogs));
      }
    } catch (err) {
      console.error('Error loading session data', err);
    }
  };

  // Read auth state and load data on mount
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('nexus_user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } catch {
          window.location.href = '/login';
        }
      } else {
        // Not logged in, redirect
        window.location.href = '/login';
      }
    };

    setTimeout(() => {
      checkUser();
      loadStoredData();
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        setIsAdminPreview(true);
      }
    }, 0);
  }, []);

  // Close ticket / Sort out issue
  const handleResolveTicket = (ticketId: string) => {
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: 'Resolved' as const };
      }
      return t;
    });

    setTickets(updated);
    localStorage.setItem('nexus_tickets', JSON.stringify(updated));
    
    // Sync current open detail modal
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status: 'Resolved' as const } : null);
    }
  };

  // Send reply to agent in ticket discussion
  const handleSendTicketReply = (e: React.FormEvent, ticketId: string) => {
    e.preventDefault();
    if (!ticketReplyText.trim()) return;

    const timeString = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newReply = {
      sender: 'customer' as const,
      text: ticketReplyText,
      time: timeString
    };

    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        const existingReplies = t.replies || [];
        // After customer replies, update ticket status back to 'Open' or keep 'In Progress'
        return {
          ...t,
          status: t.status === 'Resolved' ? ('Open' as const) : t.status,
          replies: [...existingReplies, newReply]
        };
      }
      return t;
    });

    setTickets(updated);
    localStorage.setItem('nexus_tickets', JSON.stringify(updated));
    
    // Sync modal view
    const currentTicket = updated.find(t => t.id === ticketId);
    if (currentTicket) {
      setSelectedTicket(currentTicket);
    }
    
    setTicketReplyText('');

    // Simulate Agent Auto-Response response inside ticket after 2 seconds
    setTimeout(() => {
      const agentReply = {
        sender: 'agent' as const,
        text: "Thank you for the update. We have logged this description in our active diagnostics console. Our accounts administrator will inspect the transactions manually.",
        time: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const withAgentReply = updated.map(t => {
        if (t.id === ticketId) {
          const existingReplies = t.replies || [];
          return {
            ...t,
            status: 'In Progress' as const,
            replies: [...existingReplies, agentReply]
          };
        }
        return t;
      });

      setTickets(withAgentReply);
      localStorage.setItem('nexus_tickets', JSON.stringify(withAgentReply));
      
      const refreshedTicket = withAgentReply.find(t => t.id === ticketId);
      if (refreshedTicket) {
        setSelectedTicket(refreshedTicket);
      }
    }, 2000);
  };

  // Filter & Search logic
  const filteredTickets = tickets.filter(t => {
    const matchesFilter = ticketFilter === 'All' || t.status === ticketFilter;
    const matchesSearch = 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate ticket counts
  const totalTicketsCount = tickets.length;
  const openTicketsCount = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const resolvedTicketsCount = tickets.filter(t => t.status === 'Resolved').length;
  const activeChatsCount = chats.filter(c => c.status === 'Active' || c.status === 'Connecting').length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      {/* Header Banner */}
      <div className="relative w-full bg-slate-900 border-b border-slate-950 py-12 mb-10 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-800/40 via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary-500/20 text-primary-300 border border-primary-500/30 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {user.role} Workspace
                </span>
                {isAdminPreview && (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Admin Redirect Active
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-none">
                Welcome back, {user.name}
              </h1>
              <p className="text-slate-400 text-base mt-2 max-w-xl font-medium">
                Monitor live chat interactions, respond to support agent messages, and close resolved issues.
              </p>
            </div>
            <Link 
              href="/contact?tab=send-message" 
              className="bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create Support Ticket
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Admin Warning Section */}
        {isAdminPreview && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex gap-4 items-start shadow-sm">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-amber-900 text-sm md:text-base">Customer View Dashboard Active (Admin Mode)</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed font-medium">
                You are currently viewing the customer workspace. Under your request, the customer workspace is prioritized first. The admin console for ticket assignment, bulk routing logs, and SLAs will be added in the next phase.
              </p>
            </div>
          </div>
        )}

        {/* Dashboard KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Tickets</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalTicketsCount}</h3>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active/Open</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{openTicketsCount}</h3>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resolved Cases</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{resolvedTicketsCount}</h3>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Chat Sessions</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{activeChatsCount}</h3>
            </div>
          </div>
        </div>

        {/* Dynamic Support Tickets section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Tickets List (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-lg">My Raised Support Queries</h3>
                  <p className="text-slate-500 text-xs font-medium">Click on any ticket to open discussion and resolve issues.</p>
                </div>
                
                {/* Search query input */}
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tickets..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Filtering tabs */}
              <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2 overflow-x-auto scrollbar-none">
                {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setTicketFilter(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      ticketFilter === status
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {status} ({status === 'All' ? tickets.length : tickets.filter(t => t.status === status).length})
                  </button>
                ))}
              </div>

              {/* Tickets Table/List */}
              {filteredTickets.length === 0 ? (
                <div className="p-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">No Tickets Found</h5>
                    <p className="text-slate-500 text-xs mt-1">Submit a query using the contact page to populate this view.</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredTickets.map((ticket) => (
                    <div 
                      key={ticket.id} 
                      onClick={() => setSelectedTicket(ticket)}
                      className="p-6 hover:bg-slate-50/70 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                            {ticket.id}
                          </span>
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                            ticket.type === 'Voice'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : ticket.type === 'Live Chat'
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {ticket.type || 'Form'}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">•</span>
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            {ticket.category}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">•</span>
                          <span className="text-xs text-slate-500 font-medium">
                            {ticket.createdAt}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-[15px] group-hover:text-primary-600">
                          {ticket.description.slice(0, 85)}
                          {ticket.description.length > 85 ? '...' : ''}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-4 justify-between md:justify-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          ticket.status === 'Open'
                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                            : ticket.status === 'In Progress'
                            ? 'bg-amber-50 text-amber-700 border-amber-100'
                            : 'bg-green-50 text-green-700 border-green-100'
                        }`}>
                          {ticket.status}
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-400 hidden md:block" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Chat History Sessions (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-600" />
                  Live Chat Logs
                </h3>
                <p className="text-slate-500 text-xs font-medium">Transcripts of floating assistant widget chats.</p>
              </div>

              {chats.length === 0 ? (
                <div className="p-8 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">No Active Chats</h5>
                    <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                      Initialize support sessions in the contact tab to record history.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {chats.map((chat) => (
                    <div 
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className="border border-slate-200/80 hover:border-slate-300 rounded-2xl p-4 transition-all hover:shadow-sm cursor-pointer space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-800 text-xs truncate">{chat.title}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                          chat.status === 'Active'
                            ? 'bg-green-50 text-green-700 border-green-100 animate-pulse'
                            : chat.status === 'Connecting'
                            ? 'bg-amber-50 text-amber-700 border-amber-100'
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {chat.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 leading-relaxed truncate">
                        Latest: &quot;{chat.messages[chat.messages.length - 1]?.text || 'No messages'}&quot;
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-between">
                        <span>{chat.messages.length} messages</span>
                        <span>{chat.updatedAt.split(' ')[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Assistant Logs Card */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Mic className="w-5 h-5 text-purple-600" />
                  Voice Assistant Logs
                </h3>
                <p className="text-slate-500 text-xs font-medium">Transcripts of microphone speech recognition.</p>
              </div>

              {voiceLogs.length === 0 ? (
                <div className="p-8 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <Mic className="w-8 h-8 text-slate-400 mx-auto" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">No Voice Logs</h5>
                    <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                      Use microphone inputs in support chats or forms to record voice transcripts.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {voiceLogs.map((log) => (
                    <div 
                      key={log.id}
                      onClick={() => setSelectedVoiceLog(log)}
                      className="border border-slate-200/80 hover:border-slate-300 rounded-2xl p-4 transition-all hover:shadow-sm cursor-pointer space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-800 text-xs truncate">{log.title}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                          log.status === 'Completed'
                            ? 'bg-purple-50 text-purple-700 border-purple-100'
                            : 'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 leading-relaxed italic truncate">
                        &quot;{log.transcript}&quot;
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-between">
                        <span>Duration: {log.duration} • Conf: {log.confidence}</span>
                        <span>{log.createdAt.split(' ')[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Details and Discussion Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-fade-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {selectedTicket.id}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                    selectedTicket.type === 'Voice'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : selectedTicket.type === 'Live Chat'
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {selectedTicket.type || 'Form'}
                  </span>
                  <span className="text-slate-300 text-xs font-bold">•</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{selectedTicket.category}</span>
                </div>
                <h3 className="font-bold text-slate-950 text-lg leading-tight">
                  Raised by {selectedTicket.firstName} {selectedTicket.lastName}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setSelectedTicket(null);
                  setTicketReplyText('');
                }}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Original Issue Description */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Original Inquiry Description:</p>
                <p className="text-sm text-slate-700 leading-relaxed select-text font-medium">
                  {selectedTicket.description}
                </p>
                <p className="text-[10px] text-slate-400 pt-2 font-semibold border-t border-slate-200/50">
                  Raised on: {selectedTicket.createdAt}
                </p>
              </div>

              {/* Status Indicator & Resolve Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-500 uppercase">Current Status:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                    selectedTicket.status === 'Open'
                      ? 'bg-blue-50 text-blue-700'
                      : selectedTicket.status === 'In Progress'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-green-50 text-green-700'
                  }`}>
                    {selectedTicket.status}
                  </span>
                </div>
                {selectedTicket.status !== 'Resolved' && (
                  <button
                    type="button"
                    onClick={() => handleResolveTicket(selectedTicket.id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckSquare className="w-4 h-4" /> Mark as Solved
                  </button>
                )}
              </div>

              {/* Discussion Thread */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                  Conversation Thread
                </h4>
                
                {(!selectedTicket.replies || selectedTicket.replies.length === 0) ? (
                  <p className="text-slate-400 text-xs italic text-center py-4">No replies yet. Your ticket is currently queued for support staff assignment.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedTicket.replies.map((reply, idx) => {
                      const isUser = reply.sender === 'customer';
                      return (
                        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                            isUser 
                              ? 'bg-primary-600 text-white rounded-tr-none' 
                              : 'bg-slate-100 text-slate-700 rounded-tl-none border border-slate-200/50'
                          }`}>
                            <p className="leading-relaxed select-text">{reply.text}</p>
                            <span className={`block text-[9px] mt-1 text-right ${isUser ? 'text-primary-200' : 'text-slate-400'}`}>
                              {reply.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer: Quick Reply Form */}
            {selectedTicket.status !== 'Resolved' ? (
              <form 
                onSubmit={(e) => handleSendTicketReply(e, selectedTicket.id)}
                className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2"
              >
                <input
                  type="text"
                  required
                  value={ticketReplyText}
                  onChange={(e) => setTicketReplyText(e.target.value)}
                  placeholder="Type your message update to the support agent..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-primary-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            ) : (
              <div className="p-4 bg-green-50/50 border-t border-slate-100 text-center text-xs text-green-700 font-semibold">
                This inquiry is marked as resolved and closed. Replying will reopen this ticket.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Transcript Modal */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[75vh] animate-fade-in">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800 text-sm truncate">{selectedChat.title}</h3>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{selectedChat.status} session transcript</p>
              </div>
              <button 
                onClick={() => setSelectedChat(null)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Transcript Messages Body */}
            <div className="flex-1 p-5 overflow-y-auto bg-slate-50/30 space-y-3">
              {selectedChat.messages.map((msg, idx) => {
                if (msg.sender === 'system') {
                  return (
                    <div key={idx} className="text-center">
                      <span className="inline-block bg-slate-200/80 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {msg.text}
                      </span>
                    </div>
                  );
                }
                const isUser = msg.sender === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                      isUser ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                    }`}>
                      <p className="select-text">{msg.text}</p>
                      <span className={`block text-[9px] mt-0.5 text-right ${isUser ? 'text-primary-200' : 'text-slate-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-white text-center text-[10px] text-slate-400 font-semibold">
              Live chat session logged and encrypted.
            </div>
          </div>
        </div>
      )}

      {/* Voice Log Details Modal */}
      {selectedVoiceLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[75vh] animate-fade-in">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800 text-sm truncate">{selectedVoiceLog.title}</h3>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{selectedVoiceLog.id} speech session log</p>
              </div>
              <button 
                onClick={() => setSelectedVoiceLog(null)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 bg-slate-50/30 space-y-6">
              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Microphone Input Transcript:</p>
                <p className="text-sm text-slate-700 font-medium italic leading-relaxed select-text">
                  &quot;{selectedVoiceLog.transcript}&quot;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Duration</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedVoiceLog.duration}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Confidence</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedVoiceLog.confidence} Match</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Session Status</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                  selectedVoiceLog.status === 'Completed'
                    ? 'bg-purple-50 text-purple-700 border-purple-100'
                    : 'bg-red-50 text-red-700 border-red-100'
                }`}>
                  {selectedVoiceLog.status}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-white text-center text-[10px] text-slate-400 font-semibold">
              Voice recognition speech logs synced.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
