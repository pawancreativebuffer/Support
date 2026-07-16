"use client";

import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
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
  AlertCircle,
  FileText,
  Paperclip,
  Trash2,
  Loader2,
  SlidersHorizontal,
  PlusCircle,
  Lock,
  MessageCircle, Mic, Play, Volume2, VolumeX, Calendar, FileDown
} from 'lucide-react';
import Link from 'next/link';
import { useUploadThing } from '@/lib/uploadthing';
import ReportModal from '@/components/ReportModal';

interface ChatItem {
  id: string;
  title: string;
  status: 'Active' | 'Connecting' | 'Closed';
  customerName?: string | null;
  customerEmail?: string | null;
  updatedAt: string;
  messages: { sender: 'user' | 'agent' | 'system'; text: string; time: string }[];
}

interface VoiceLogItem {
  id: string;
  title: string;
  status: 'Completed' | 'Failed';
  customerName?: string | null;
  customerEmail?: string | null;
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

interface TicketItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  description: string;
  status: 'Open' | 'With Client' | 'On Hold' | 'Escalated' | 'Closed' | 'Resolved';
  agentId?: number | null;
  agent?: { id: number; name: string; email: string } | null;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  type?: 'Form' | 'Voice' | 'Live Chat';
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  mergedTickets?: any[];
  replies?: {
    sender: 'customer' | 'agent' | 'system';
    text: string;
    time: string;
    attachmentUrl?: string | null;
    attachmentName?: string | null;
  }[];
}

export default function AdminPage() {
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'chats' | 'voice' | 'call-logs'>('overview');

  const [chats, setChats] = useState<ChatItem[]>([]);
  const [chatsPage, setChatsPage] = useState(1);
  const chatsPerPage = 6;

  const [voiceLogs, setVoiceLogs] = useState<VoiceLogItem[]>([]);
  const [voicePage, setVoicePage] = useState(1);
  const voicePerPage = 6;

  const [callLogs, setCallLogs] = useState<any[]>([]);
  const [callLogsPage, setCallLogsPage] = useState(1);
  const callLogsPerPage = 6;

  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [selectedVoiceLog, setSelectedVoiceLog] = useState<VoiceLogItem | null>(null);
  const [selectedCallLog, setSelectedCallLog] = useState<any | null>(null);
  const [audioPlaybackError, setAudioPlaybackError] = useState(false);

  const [agents, setAgents] = useState<{ id: number; name: string; email: string; role: string }[]>([]);

  // Filters & Search
  const [ticketFilter, setTicketFilter] = useState<'All' | 'Open' | 'With Client' | 'On Hold' | 'Escalated' | 'Closed'>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [showPriorityFilters, setShowPriorityFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination & Limits
  const [visibleActivities, setVisibleActivities] = useState(5);
  const [ticketsPage, setTicketsPage] = useState(1);
  const ticketsPerPage = 5;

  // Reset page numbers on filter/search change
  useEffect(() => {
    setTicketsPage(1);
  }, [searchQuery, ticketFilter, priorityFilter]);

  // Modals & Forms
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);
  const [showMergedTicketsModal, setShowMergedTicketsModal] = useState(false);
  const [mergedTicketsList, setMergedTicketsList] = useState<any[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);

  // Custom Ticket Creation Form States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTicketEmail, setNewTicketEmail] = useState('');
  const [newTicketFirstName, setNewTicketFirstName] = useState('');
  const [newTicketLastName, setNewTicketLastName] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('API & Developer Tools');
  const [newTicketPriority, setNewTicketPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [newTicketSubmitting, setNewTicketSubmitting] = useState(false);
  const [newTicketAttachment, setNewTicketAttachment] = useState<{ url: string; name: string } | null>(null);
  const [newTicketUploading, setNewTicketUploading] = useState(false);

  const { startUpload: startNewTicketUpload } = useUploadThing("ticketAttachment", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setNewTicketAttachment({
          url: res[0].url,
          name: res[0].name
        });
      }
      setNewTicketUploading(false);
    },
    onUploadError: (error: Error) => {
      alert(`Upload failed: ${error.message}`);
      setNewTicketUploading(false);
    },
    onUploadBegin: () => {
      setNewTicketUploading(true);
    }
  });

  const [ticketReplyText, setTicketReplyText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const loadAgents = async () => {
    try {
      const res = await fetch('/api/agents');
      if (res.ok) {
        const data = await res.json();
        setAgents(data);
      }
    } catch (err) {
      console.error('Error loading agents:', err);
    }
  };

  const handleUpdateAssignee = async (ticketId: string, agentIdVal: string) => {
    if (!user) return;
    try {
      const res = await fetch('/api/tickets/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId,
          agentId: agentIdVal === 'unassigned' || agentIdVal === '' ? null : agentIdVal
        })
      });
      if (res.ok) {
        loadDatabaseData(user.email);
        const agentName = agents.find(a => String(a.id) === agentIdVal)?.name || 'Unassigned';
        triggerToast(`Ticket ${ticketId} assignee updated to ${agentName}!`);
        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket(prev => prev ? { ...prev, agentId: agentIdVal === 'unassigned' || agentIdVal === '' ? null : Number(agentIdVal) } : null);
        }
      } else {
        alert('Failed to update assignee');
      }
    } catch (err) {
      console.error('Failed to update assignee:', err);
    }
  };

  const handleBulkUpdate = async (updateData: { status?: string; agentId?: string | null }) => {
    if (!user || selectedTicketIds.length === 0) return;
    try {
      const payload = {
        ticketIds: selectedTicketIds,
        ...(updateData.status ? { status: updateData.status } : {}),
        ...(updateData.agentId !== undefined ? { agentId: updateData.agentId === 'unassigned' ? null : updateData.agentId } : {})
      };

      const res = await fetch('/api/tickets/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        loadDatabaseData(user.email);
        triggerToast(`Bulk updated ${selectedTicketIds.length} tickets successfully!`);
        setSelectedTicketIds([]);
      } else {
        alert('Failed to perform bulk update');
      }
    } catch (err) {
      console.error('Failed bulk update:', err);
    }
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

        const chatsRes = await fetch('/api/agents/chats');
        if (chatsRes.ok) {
          const data = await chatsRes.json();
          setChats(data);
        }

        const voiceRes = await fetch('/api/agents/voice-logs');
        if (voiceRes.ok) {
          const data = await voiceRes.json();
          setVoiceLogs(data);
        }

        const callLogsRes = await fetch('/api/call-logs');
        if (callLogsRes.ok) {
          const data = await callLogsRes.json();
          setCallLogs(data);
        }



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
          if (parsed.role !== 'Admin') {
            window.location.href = '/admin-login';
            return;
          }
          setUser(parsed);
          loadDatabaseData(parsed.email);
          loadAgents();
        } catch {
          window.location.href = '/admin-login';
        }
      } else {
        window.location.href = '/admin-login';
      }
    };
    checkUser();
  }, []);

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
      } catch (err) { }
    };

    return () => eventSource.close();
  }, [user, tickets, selectedTicket]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!newTicketEmail || !newTicketDescription) {
      alert('Email and Description are required.');
      return;
    }

    setNewTicketSubmitting(true);
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: newTicketFirstName,
          lastName: newTicketLastName,
          email: newTicketEmail,
          category: newTicketCategory,
          description: newTicketDescription,
          priority: newTicketPriority,
          attachmentUrl: newTicketAttachment?.url || null,
          attachmentName: newTicketAttachment?.name || null
        })
      });

      if (res.ok) {
        triggerToast(`Ticket logged successfully for ${newTicketEmail}`);
        setNewTicketEmail('');
        setNewTicketFirstName('');
        setNewTicketLastName('');
        setNewTicketCategory('API & Developer Tools');
        setNewTicketPriority('MEDIUM');
        setNewTicketDescription('');
        setNewTicketAttachment(null);
        setShowCreateModal(false);
        loadDatabaseData(user.email);
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to create ticket.');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating ticket.');
    } finally {
      setNewTicketSubmitting(false);
    }
  };

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

  const handleUpdatePriority = async (ticketId: string, newPriority: 'LOW' | 'MEDIUM' | 'HIGH') => {
    if (!user) return;
    try {
      const res = await fetch('/api/tickets/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId,
          priority: newPriority
        })
      });
      if (res.ok) {
        loadDatabaseData(user.email);
        triggerToast(`Ticket ${ticketId} priority set to ${newPriority}!`);
      } else {
        alert('Failed to update priority');
      }
    } catch (err) {
      console.error('Failed to update priority:', err);
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
      time: timeString,
      attachmentUrl: replyAttachment?.url || null,
      attachmentName: replyAttachment?.name || null
    };

    if (selectedTicket) {
      const existingReplies = selectedTicket.replies || [];
      setSelectedTicket({
        ...selectedTicket,
        status: selectedTicket.status,
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
        loadDatabaseData(user.email);
      }
    } catch (err) {
      console.error('Failed to send reply:', err);
    }
  };

  const handleLogout = () => {
    const isUserAdmin = user?.role === 'Admin';
    localStorage.removeItem('nexus_user');
    window.dispatchEvent(new CustomEvent('auth-change'));
    window.location.href = isUserAdmin ? '/admin-login' : '/agent-login';
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
      : t.status === ticketFilter;

    const matchesPriority = priorityFilter === 'All'
      ? true
      : t.priority === priorityFilter.toUpperCase();

    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesPriority && matchesSearch;
  });

  const totalTickets = tickets.length;
  const activeTicketsCount = tickets.filter(t => t.status !== 'Closed' && t.status !== 'Resolved').length;
  const pendingResponseCount = tickets.filter(needsReply).length;
  const resolvedTicketsCount = tickets.filter(t => t.status === 'Closed' || t.status === 'Resolved').length;
  const openTicketsCount = tickets.filter(t => t.status === 'Open').length;
  const withClientTicketsCount = tickets.filter(t => t.status === 'With Client').length;
  const onHoldTicketsCount = tickets.filter(t => t.status === 'On Hold').length;
  const escalatedTicketsCount = tickets.filter(t => t.status === 'Escalated').length;

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
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-primary-600 uppercase">
                {user.role === 'Admin' ? 'Admin Console' : 'Agent Workspace'}
              </span>
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
      <div className="max-w-[1600px] mx-auto px-6 pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-50/40 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
                <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                <span className="text-[10px] font-bold text-primary-700 uppercase tracking-widest">
                  {user.role === 'Admin' ? 'Admin Portal' : 'Agent Portal'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {user.role === 'Admin' ? 'Operations Overview' : 'Support Ticket Dispatch Queue'}
              </h1>
              <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
                {user.role === 'Admin'
                  ? 'Monitor system KPIs, check overall support tickets status, track agent queue loads and resolution timelines.'
                  : 'Respond to incoming inquiries, view message timelines, and update resolution statuses in real-time.'}
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
              <button
                onClick={() => setShowReportModal(true)}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <FileDown className="w-4 h-4 text-primary-600" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-[1600px] mx-auto px-6 mt-10 space-y-10">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.role === 'Admin' ? (
            <>
              {/* Total Cases */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <Ticket className="w-5 h-5 text-primary-600" />
                <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-4">Total Tickets Raised</h4>
                <div className="text-2xl font-extrabold text-slate-800 mt-1">{totalTickets}</div>
              </div>

              {/* Open Tickets */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-blue-500">
                <Clock className="w-5 h-5 text-blue-500" />
                <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-4">Open Status</h4>
                <div className="text-2xl font-extrabold text-slate-800 mt-1">{openTicketsCount}</div>
              </div>

              {/* Active Cases */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-amber-500">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-4">Active Cases</h4>
                <div className="text-2xl font-extrabold text-slate-800 mt-1">{activeTicketsCount}</div>
              </div>

              {/* Resolved */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-emerald-500">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-4">Resolved Status</h4>
                <div className="text-2xl font-extrabold text-slate-800 mt-1">{resolvedTicketsCount}</div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </section>

        {/* Tab Switcher */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
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

            {/* TAB 3: Live Chats */}
            <button
              onClick={() => setActiveTab('chats')}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm ${activeTab === 'chats'
                ? 'bg-primary-600 border-primary-700 text-white shadow-md shadow-primary-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${activeTab === 'chats' ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-600'
                  }`}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold">Live Chats</span>
                  <span className={`block text-[10px] ${activeTab === 'chats' ? 'text-white/80' : 'text-slate-400 font-semibold'}`}>Chat log sessions</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${activeTab === 'chats'
                ? 'bg-white/20 text-white border-white/10'
                : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                {chats.length}
              </span>
            </button>

            {/* TAB 4: Voice Calls */}
            <button
              onClick={() => setActiveTab('voice')}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm ${activeTab === 'voice'
                ? 'bg-primary-600 border-primary-700 text-white shadow-md shadow-primary-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${activeTab === 'voice' ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-600'
                  }`}>
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold">Voice AI</span>
                  <span className={`block text-[10px] ${activeTab === 'voice' ? 'text-white/80' : 'text-slate-400 font-semibold'}`}>Voice transcript logs</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${activeTab === 'voice'
                ? 'bg-white/20 text-white border-white/10'
                : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                {voiceLogs.length}
              </span>
            </button>

            {/* TAB 5: Call Logs */}
            <button
              onClick={() => setActiveTab('call-logs')}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm ${activeTab === 'call-logs'
                ? 'bg-primary-600 border-primary-700 text-white shadow-md shadow-primary-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${activeTab === 'call-logs' ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-600'
                  }`}>
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold">Call Logs</span>
                  <span className={`block text-[10px] ${activeTab === 'call-logs' ? 'text-white/80' : 'text-slate-400 font-semibold'}`}>AI inbound calls</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${activeTab === 'call-logs'
                ? 'bg-white/20 text-white border-white/10'
                : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                {callLogs.length}
              </span>
            </button>

          </div>


        </section>

        {/* Tab contents */}
        <section>
          {/* TAB 1: OVERVIEW TIMELINE */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
              <div className="lg:col-span-8 bg-white border border-slate-200 p-6 rounded-3xl relative shadow-sm">
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
                    {activities.slice(0, visibleActivities).map((act, index) => {
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
                    {visibleActivities < activities.length && (
                      <div className="pt-4 flex justify-center">
                        <button
                          onClick={() => setVisibleActivities(prev => prev + 5)}
                          className="px-6 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          Load More Activity
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right widgets column (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Agent Welcome Console Widget */}
                <div className="bg-gradient-to-tr from-slate-900 via-slate-950 to-primary-950 border border-slate-900 p-6 rounded-3xl relative overflow-hidden shadow-md text-white">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-xl pointer-events-none" />

                  <div className="space-y-4">
                    <Sparkles className="w-8 h-8 text-primary-400 animate-pulse" />
                    <h3 className="font-bold text-white text-sm">
                      {user.role === 'Admin' ? 'Admin Control Console' : 'Agent Dispatch Console'}
                    </h3>
                    <p className="text-xs text-slate-350 leading-relaxed">
                      {user.role === 'Admin'
                        ? 'You are logged in as a support administrator. Monitor all tickets, analyze team performance metrics, and oversee system resolutions.'
                        : 'You are logged in as a support agent. Manage ticket queues, answer customer inquiries with attachments, and track active cases.'}
                    </p>
                    <button
                      onClick={() => setActiveTab('tickets')}
                      className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs transition-all shadow-lg shadow-primary-600/20 cursor-pointer border border-primary-500/30"
                    >
                      <Ticket className="w-4 h-4" /> Go to Tickets Queue
                    </button>
                  </div>
                </div>

                {/* Guidelines Card */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Info className="w-4 h-4 text-primary-600" />
                    <h4 className="text-xs font-black uppercase text-slate-700 tracking-widest">
                      {user.role === 'Admin' ? 'Admin Guidelines' : 'Agent Guidelines'}
                    </h4>
                  </div>
                  <div className="space-y-3.5 text-xs text-slate-650 leading-relaxed">
                    {user.role === 'Admin' ? (
                      <>
                        <div className="flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                          <p>Monitor status KPIs to ensure ticket resolution targets are met.</p>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                          <p>Review customer message histories to evaluate ticket categories.</p>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                          <p>Log customer support calls directly using the Custom Ticket form.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                          <p>Check "Chronological Ticket Activity" to track the latest customer responses.</p>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                          <p>Ensure to review ticket attachments for context before replying.</p>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 flex-shrink-0" />
                          <p>Mark tickets as "Resolved" when issues are solved to keep queues clear.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
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
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search queue..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-56 h-[38px] bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-semibold focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  {/* Status Filters Dropdown */}
                  <div className="relative">
                    <select
                      value={ticketFilter}
                      onChange={(e) => setTicketFilter(e.target.value as any)}
                      className="h-[38px] px-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-650 hover:border-slate-350 focus:border-primary-500 focus:outline-none transition-all text-[10px] font-bold uppercase tracking-wider cursor-pointer shadow-sm"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Open">Open</option>
                      <option value="With Client">With Client</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Escalated">Escalated</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  {/* Toggle Priority Filters Icon Button & Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowPriorityFilters(!showPriorityFilters)}
                      className={`h-[38px] px-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${showPriorityFilters || priorityFilter !== 'All'
                        ? 'bg-primary-50 text-primary-700 border-primary-200 shadow-sm shadow-primary-100/30'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      title="Filter by Priority"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Filters</span>
                      {priorityFilter !== 'All' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-sm" />
                      )}
                    </button>

                    {showPriorityFilters && (
                      <>
                        <div
                          className="fixed inset-0 z-20 cursor-default"
                          onClick={() => setShowPriorityFilters(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-25 py-2 animate-fade-in">
                          <div className="px-3 pb-1 border-b border-slate-100 mb-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Filter Priority</span>
                          </div>
                          {(['All', 'High', 'Medium', 'Low'] as const).map(p => (
                            <button
                              key={p}
                              onClick={() => {
                                setPriorityFilter(p);
                                setShowPriorityFilters(false);
                              }}
                              className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors hover:bg-slate-50 cursor-pointer ${priorityFilter === p ? 'text-primary-600 bg-primary-50/30' : 'text-slate-650'
                                }`}
                            >
                              <span>{p === 'All' ? 'All Priorities' : `${p} Priority`}</span>
                              {priorityFilter === p && (
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
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
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">

                          <th className="py-3 px-4">Ticket ID</th>
                          <th className="py-3 px-4">Submitter Info</th>
                          <th className="py-3 px-4">Inquiry Category</th>
                          <th className="py-3 px-4">Date Submitted</th>
                          <th className="py-3 px-4">Assignee</th>
                          <th className="py-3 px-4">Priority</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100/60">
                        {filteredTickets.slice((ticketsPage - 1) * ticketsPerPage, ticketsPage * ticketsPerPage).map(ticket => {
                          const requiresReply = needsReply(ticket);
                          const isChecked = selectedTicketIds.includes(ticket.id);
                          return (
                            <tr key={ticket.id} className={`hover:bg-slate-50/50 transition-colors group ${isChecked ? 'bg-primary-50/10' : ''}`}>

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
                                <span className="text-[10px] font-extrabold uppercase tracking-wider rounded-xl px-2.5 py-1.5 border bg-slate-50 border-slate-200 text-slate-600 inline-block">
                                  {ticket.agentId ? `👤 ${agents.find(a => a.id === ticket.agentId)?.name || 'Unknown'}` : '👤 Unassigned'}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                {user?.role === 'Admin' ? (
                                  <span
                                    className={`text-[10px] font-extrabold uppercase tracking-wider rounded-xl px-2.5 py-1.5 border inline-block ${ticket.priority === 'HIGH'
                                      ? 'bg-rose-50 border-rose-200 text-rose-700 font-black'
                                      : ticket.priority === 'LOW'
                                        ? 'bg-slate-50 border-slate-200 text-slate-600'
                                        : 'bg-amber-50 border-amber-200 text-amber-700'
                                      }`}
                                  >
                                    {ticket.priority === 'HIGH' ? '🔴 High' : ticket.priority === 'LOW' ? '🔵 Low' : '🟡 Medium'}
                                  </span>
                                ) : (
                                  <select
                                    value={ticket.priority || 'MEDIUM'}
                                    onChange={(e) => handleUpdatePriority(ticket.id, e.target.value as any)}
                                    className={`text-[10px] font-extrabold uppercase tracking-wider rounded-xl px-2.5 py-1.5 border cursor-pointer focus:outline-none transition-all ${ticket.priority === 'HIGH'
                                      ? 'bg-rose-50 border-rose-200 text-rose-700 font-black'
                                      : ticket.priority === 'LOW'
                                        ? 'bg-slate-50 border-slate-200 text-slate-600'
                                        : 'bg-amber-50 border-amber-200 text-amber-700'
                                      }`}
                                  >
                                    <option value="HIGH">🔴 High</option>
                                    <option value="MEDIUM">🟡 Medium</option>
                                    <option value="LOW">🔵 Low</option>
                                  </select>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${ticket.status === 'Open'
                                  ? 'bg-slate-50 border-slate-200 text-slate-750'
                                  : ticket.status === 'With Client' || ticket.status === 'On Hold'
                                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                                    : ticket.status === 'Escalated'
                                      ? 'bg-slate-50 border-slate-250 text-slate-800'
                                      : 'bg-emerald-50 border-emerald-250 text-emerald-750'
                                  }`}>
                                  <span className="text-[8px] leading-none">
                                    {ticket.status === 'Open'
                                      ? '⚫'
                                      : ticket.status === 'With Client' || ticket.status === 'On Hold'
                                        ? '🟠'
                                        : ticket.status === 'Escalated'
                                          ? '⚫'
                                          : '🟢'}
                                  </span>
                                  <span className="ml-1">{ticket.status}</span>
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setSelectedTicket(ticket)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-primary-50 text-slate-600 hover:text-primary-700 rounded-xl border border-slate-200/80 hover:border-primary-200 text-[11px] font-bold transition-all cursor-pointer"
                                  >
                                    {user?.role === 'Admin' ? 'View' : 'Manage'} <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 mt-4">
                    <span className="text-xs text-slate-500 font-bold">
                      Showing {Math.min(filteredTickets.length, (ticketsPage - 1) * ticketsPerPage + 1)} to {Math.min(filteredTickets.length, ticketsPage * ticketsPerPage)} of {filteredTickets.length} tickets
                    </span>
                    <div className="flex gap-2">
                      <button
                        disabled={ticketsPage === 1}
                        onClick={() => setTicketsPage(prev => prev - 1)}
                        className="px-4.5 py-2 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-300 border border-slate-250 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
                      >
                        Previous
                      </button>
                      <button
                        disabled={ticketsPage * ticketsPerPage >= filteredTickets.length}
                        onClick={() => setTicketsPage(prev => prev + 1)}
                        className="px-4.5 py-2 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-300 border border-slate-250 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>)}
            </div>
          )}

          {/* TAB 3: LIVE CHATS */}
          {activeTab === 'chats' && (
            <div className="space-y-6 animate-fade-in w-full">
              {chats.length === 0 ? (
                <div className="bg-white border border-slate-200 p-16 text-center rounded-3xl space-y-4 shadow-sm">
                  <MessageSquare className="w-14 h-14 text-slate-400 mx-auto border border-slate-100 p-2.5 rounded-2xl" />
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
                        className="bg-slate-50/50 border border-slate-200/80 hover:bg-white hover:border-primary-400 rounded-2xl p-5 transition-all hover:shadow-md cursor-pointer space-y-4 group flex flex-col justify-between"
                      >
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2 truncate">
                              <span className="p-1 rounded-lg bg-primary-50 text-primary-600 border border-primary-100 flex-shrink-0">
                                <MessageCircle className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-extrabold text-slate-800 text-xs truncate group-hover:text-primary-600 transition-all">
                                {chat.customerName && chat.customerEmail ? `${chat.customerName} (${chat.customerEmail})` : chat.customerName ? chat.customerName : chat.customerEmail ? chat.customerEmail : 'Guest User'}
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex-shrink-0 ${chat.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-650 border-emerald-100 animate-pulse'
                              : 'bg-slate-100 text-slate-450 border-slate-200/60'
                              }`}>
                              {chat.status}
                            </span>
                          </div>

                          <p className="text-xs text-slate-555 leading-relaxed font-normal line-clamp-2 select-text">
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
                  <div className="flex items-center justify-between bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex-wrap gap-4">
                    <span className="text-xs text-slate-500 font-bold">
                      Showing {Math.min(chats.length, (chatsPage - 1) * chatsPerPage + 1)} to {Math.min(chats.length, chatsPage * chatsPerPage)} of {chats.length} chat sessions
                    </span>
                    <div className="flex gap-2">
                      <button
                        disabled={chatsPage === 1}
                        onClick={() => setChatsPage(prev => prev - 1)}
                        className="px-4.5 py-2 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-300 border border-slate-250 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
                      >
                        Previous
                      </button>
                      <button
                        disabled={chatsPage * chatsPerPage >= chats.length}
                        onClick={() => setChatsPage(prev => prev + 1)}
                        className="px-4.5 py-2 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-300 border border-slate-250 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
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
                <div className="bg-white border border-slate-200 p-16 text-center rounded-3xl space-y-4 shadow-sm">
                  <Mic className="w-14 h-14 text-slate-400 mx-auto border border-slate-100 p-2.5 rounded-2xl" />
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
                        onClick={() => { setSelectedVoiceLog(log); setAudioPlaybackError(false); }}
                        className="bg-slate-50/50 border border-slate-200/80 hover:bg-white hover:border-primary-400 rounded-2xl p-5 transition-all hover:shadow-md cursor-pointer space-y-4 group flex flex-col justify-between"
                      >
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2 truncate">
                              <span className="p-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex-shrink-0">
                                <Mic className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-extrabold text-slate-800 text-xs truncate group-hover:text-primary-600 transition-all">
                                {log.customerName && log.customerEmail ? `${log.customerName} (${log.customerEmail})` : log.customerName ? log.customerName : log.customerEmail ? log.customerEmail : 'Guest User'}
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex-shrink-0 ${log.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-650 border-emerald-100'
                              : 'bg-slate-100 text-slate-450 border-slate-200/60'
                              }`}>
                              {log.status}
                            </span>
                          </div>

                          <p className="text-xs text-slate-555 leading-relaxed font-normal line-clamp-2 select-text">
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
                  <div className="flex items-center justify-between bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex-wrap gap-4">
                    <span className="text-xs text-slate-500 font-bold">
                      Showing {Math.min(voiceLogs.length, (voicePage - 1) * voicePerPage + 1)} to {Math.min(voiceLogs.length, voicePage * voicePerPage)} of {voiceLogs.length} voice calls
                    </span>
                    <div className="flex gap-2">
                      <button
                        disabled={voicePage === 1}
                        onClick={() => setVoicePage(prev => prev - 1)}
                        className="px-4.5 py-2 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-300 border border-slate-250 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
                      >
                        Previous
                      </button>
                      <button
                        disabled={voicePage * voicePerPage >= voiceLogs.length}
                        onClick={() => setVoicePage(prev => prev + 1)}
                        className="px-4.5 py-2 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-300 border border-slate-250 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 5: CALL LOGS */}
          {activeTab === 'call-logs' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm animate-fade-in w-full">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-primary-600" /> AI Inbound Phone Call Logs
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Review phone calls answered by the ElevenLabs Virtual Agent.</p>
                </div>
              </div>

              {callLogs.length === 0 ? (
                <div className="p-16 text-center space-y-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-100">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-600 font-bold">No call logs found</p>
                    <p className="text-sm text-slate-400">Waiting for inbound calls to be processed.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                          <th className="py-3 px-4">Caller</th>
                          <th className="py-3 px-4">Date & Time</th>
                          <th className="py-3 px-4">Duration</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100/60">
                        {callLogs.slice((callLogsPage - 1) * callLogsPerPage, callLogsPage * callLogsPerPage).map((log, index) => (
                          <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="py-4 px-4">
                              <div className="text-xs font-bold text-slate-800">{log.callerNumber}</div>
                              {log.customer && (
                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.customer.name} ({log.customer.email})</div>
                              )}
                            </td>
                            <td className="py-4 px-4 text-xs text-slate-400 font-semibold">
                              {new Date(log.createdAt).toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-xs font-bold text-slate-700">
                              {log.duration}s
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedCallLog(log)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-primary-50 text-slate-600 hover:text-primary-700 rounded-xl border border-slate-200/80 hover:border-primary-200 text-[11px] font-bold transition-all cursor-pointer"
                                >
                                  View <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {callLogs.length > 0 && (
                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 mt-4">
                      <span className="text-xs text-slate-500 font-bold">
                        Showing {Math.min(callLogs.length, (callLogsPage - 1) * callLogsPerPage + 1)} to {Math.min(callLogs.length, callLogsPage * callLogsPerPage)} of {callLogs.length} logs
                      </span>
                      <div className="flex gap-2">
                        <button
                          disabled={callLogsPage === 1}
                          onClick={() => setCallLogsPage(prev => prev - 1)}
                          className="px-4.5 py-2 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-300 border border-slate-250 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
                        >
                          Previous
                        </button>
                        <button
                          disabled={callLogsPage * callLogsPerPage >= callLogs.length}
                          onClick={() => setCallLogsPage(prev => prev + 1)}
                          className="px-4.5 py-2 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-300 border border-slate-250 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </section>
      </div>

      {/* DISCUSSION MODAL THREAD */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
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
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-full p-6 min-h-0">

                {/* Left Column: Inquiry Metadata & Status */}
                <div className="md:col-span-5 space-y-6 flex flex-col justify-start overflow-y-auto pr-2 pb-6 min-h-0 scrollbar-thin">

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

                  {/* Ticket Attachments */}
                  {selectedTicket.attachmentUrl && (
                    <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-3 shadow-inner flex flex-col">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Ticket Attachments</p>
                      <div className="flex flex-wrap gap-2.5">
                        <a
                          href={selectedTicket.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-sm max-w-full"
                        >
                          <FileText className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                          <span className="truncate text-slate-850">{selectedTicket.attachmentName || 'View Attachment'}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedTicket.mergedTickets && selectedTicket.mergedTickets.length > 0 && (
                    <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-3 shadow-inner flex flex-col">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Merged Tickets</span>
                      <button
                        onClick={() => {
                          setMergedTicketsList(selectedTicket.mergedTickets || []);
                          setShowMergedTicketsModal(true);
                        }}
                        className="w-full text-center px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-250 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Paperclip className="w-3.5 h-3.5" /> View {selectedTicket.mergedTickets.length} Merged Ticket(s)
                      </button>
                    </div>
                  )}

                  {/* Status Indicator & Resolve Action */}
                  <div className="flex flex-col gap-4 p-5 border border-slate-100 rounded-2xl bg-slate-50/50 shadow-inner">
                    <div className="flex items-center justify-between border-b border-slate-200/40 pb-3">
                      <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Ticket Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${selectedTicket.status === 'Open'
                        ? 'bg-slate-50 text-slate-700 border-slate-200'
                        : selectedTicket.status === 'With Client' || selectedTicket.status === 'On Hold'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : selectedTicket.status === 'Escalated'
                            ? 'bg-slate-50 text-slate-800 border-slate-250'
                            : selectedTicket.status === 'Closed' || selectedTicket.status === 'Resolved'
                              ? 'bg-emerald-50 text-emerald-750 border-emerald-200'
                              : 'bg-slate-50 text-slate-600 border-slate-100'
                        }`}>
                        {selectedTicket.status}
                      </span>
                    </div>

                    {/* Priority Selector in Modal */}
                    <div className="flex items-center justify-between border-b border-slate-200/40 pb-3">
                      <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Ticket Priority</span>
                      {user?.role === 'Admin' ? (
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider rounded-xl px-2.5 py-1.5 border inline-block ${selectedTicket.priority === 'HIGH'
                            ? 'bg-rose-50 border-rose-200 text-rose-700 font-black'
                            : selectedTicket.priority === 'LOW'
                              ? 'bg-slate-50 border-slate-200 text-slate-600'
                              : 'bg-amber-50 border-amber-200 text-amber-700'
                            }`}
                        >
                          {selectedTicket.priority === 'HIGH' ? '🔴 High' : selectedTicket.priority === 'LOW' ? '🔵 Low' : '🟡 Medium'}
                        </span>
                      ) : (
                        <select
                          value={selectedTicket.priority || 'MEDIUM'}
                          onChange={(e) => handleUpdatePriority(selectedTicket.id, e.target.value as any)}
                          className={`text-[10px] font-extrabold uppercase tracking-wider rounded-xl px-2.5 py-1.5 border cursor-pointer focus:outline-none transition-all ${selectedTicket.priority === 'HIGH'
                            ? 'bg-rose-50 border-rose-200 text-rose-700 font-black'
                            : selectedTicket.priority === 'LOW'
                              ? 'bg-slate-50 border-slate-200 text-slate-600'
                              : 'bg-amber-50 border-amber-200 text-amber-700'
                            }`}
                        >
                          <option value="HIGH">🔴 High</option>
                          <option value="MEDIUM">🟡 Medium</option>
                          <option value="LOW">🔵 Low</option>
                        </select>
                      )}
                    </div>


                  </div>
                </div>

                {/* Right Column: Thread & Reply Form */}
                <div className="md:col-span-7 flex flex-col h-full overflow-hidden border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 min-h-0">

                  {/* Fixed Header for Conversation Thread */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4 shrink-0">
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

                  {/* Discussion Thread container */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4 flex flex-col min-h-0 scrollbar-thin">

                    {(!selectedTicket.replies || selectedTicket.replies.length === 0) ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl space-y-3.5 my-4">
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
                          if (reply.sender === 'system') {
                            return (
                              <div key={idx} className="text-center my-2">
                                <span className="inline-block bg-slate-100 border border-slate-200/60 text-slate-500 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                  {reply.text}
                                </span>
                              </div>
                            );
                          }
                          // For agent view, agent replies go on the right (primary), customer replies on the left (gray)
                          const isAgent = reply.sender === 'agent';
                          return (
                            <div key={idx} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[85%] rounded-2xl px-4.5 py-3 text-sm md:text-[15px] leading-relaxed font-normal shadow-sm ${isAgent
                                ? 'bg-primary-600 text-white rounded-tr-none border border-primary-500/20'
                                : 'bg-slate-100 border border-slate-200/80 text-slate-800 rounded-tl-none'
                                }`}>
                                <div className="text-[10px] font-bold opacity-60 mb-1">
                                  {isAgent ? `${user?.name || 'Sarah'} (Support Agent)` : `${selectedTicket.firstName} ${selectedTicket.lastName}`}
                                </div>
                                <p className="select-text">{reply.text}</p>

                                {reply.attachmentUrl && (
                                  <div className={`mt-2 pt-2 border-t ${isAgent ? 'border-white/20' : 'border-slate-200'} flex`}>
                                    <a
                                      href={reply.attachmentUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all truncate max-w-full ${isAgent
                                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-250'
                                        }`}
                                    >
                                      <FileText className="w-3.5 h-3.5 shrink-0" />
                                      <span className="truncate">{reply.attachmentName || 'View Attachment'}</span>
                                    </a>
                                  </div>
                                )}

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
                    user?.role === 'Admin' ? (
                      <div className="mt-4 p-4.5 bg-blue-50 border border-blue-100 text-blue-800 rounded-2xl flex items-center gap-3 text-xs font-bold leading-relaxed">
                        <Lock className="w-5 h-5 text-blue-650 shrink-0" />
                        You are viewing this chat in read-only mode. Only agents can reply to this ticket.
                      </div>
                    ) : (
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
                            value={ticketReplyText}
                            onChange={(e) => setTicketReplyText(e.target.value)}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
                            placeholder="Type your support reply..."
                          />
                          <button
                            type="submit"
                            disabled={!ticketReplyText.trim() || replyUploading}
                            className="px-5 py-3 bg-primary-600 hover:bg-primary-750 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-primary-600/10 cursor-pointer border border-primary-500/20"
                          >
                            Send <Send className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    )
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

      {/* MODAL 2: LIVE CHAT TRANSCRIPT */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[75vh] animate-scale-up">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-primary-50 text-primary-600 border border-primary-100">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-[15px] select-text">
                    {selectedChat.customerName ? `Chat with ${selectedChat.customerName}` : selectedChat.customerEmail ? `Chat with ${selectedChat.customerEmail}` : 'Chat with Guest User'}
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
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all cursor-pointer border border-slate-100"
              >
                <X className="w-4.5 h-4.5" />
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
                    <div className={`max-w-[85%] rounded-2xl px-4.5 py-3 text-sm leading-relaxed shadow-sm ${isUser
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
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">

            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                  <Mic className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base select-text">AI Voice Session Details</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    {selectedVoiceLog.customerName ? `Customer: ${selectedVoiceLog.customerName}` : selectedVoiceLog.customerEmail ? `Customer: ${selectedVoiceLog.customerEmail}` : 'Guest User'} • ID: {selectedVoiceLog.id.slice(0, 8)} • Called: {selectedVoiceLog.createdAt}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVoiceLog(null)}
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all cursor-pointer border border-slate-100"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/20 min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-full p-6 min-h-0">

                {/* Left Column (5 cols): Call Stats & Live Audio Player */}
                <div className="md:col-span-5 space-y-6 flex flex-col justify-start overflow-y-auto pr-2 pb-6 min-h-0 scrollbar-thin">

                  {/* Status Indicator */}
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Session Status</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${selectedVoiceLog.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-650 border-emerald-100'
                      : 'bg-slate-105 text-slate-455 border-slate-200/60'
                      }`}>
                      {selectedVoiceLog.status}
                    </span>
                  </div>

                  {/* Call Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Call Duration</span>
                      <span className="text-base font-black text-slate-800 mt-1 block">{selectedVoiceLog.duration}</span>
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Confidence Score</span>
                      <span className="text-base font-black mt-1 block text-primary-600">{selectedVoiceLog.confidence} Match</span>
                    </div>
                  </div>

                  {/* Audio Recording Player */}
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call Recording</p>
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
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200/40">
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
                              <div className={`max-w-[85%] rounded-2xl px-4.5 py-3 text-[14px] leading-relaxed font-normal shadow-sm ${isUser
                                ? 'bg-primary-600 text-white rounded-tr-none border border-primary-500/20'
                                : 'bg-slate-100 border border-slate-200/80 text-slate-800 rounded-tl-none'
                                }`}>
                                <span className={`block text-[9px] font-black uppercase tracking-wider mb-1 ${isUser ? 'text-primary-200' : 'text-slate-455'
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

      {/* MODAL: CALL LOG TRANSCRIPT */}
      {selectedCallLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                  <PhoneCall className="w-5.5 h-5.5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-lg select-text">Call Log Details</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    {selectedCallLog.callerNumber} • {new Date(selectedCallLog.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCallLog(null)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-455 hover:text-slate-700 transition-all cursor-pointer border border-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              
              {/* Audio Player */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-primary-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Call Recording</span>
                </div>
                {selectedCallLog.audioUrl ? (
                  <audio controls src={selectedCallLog.audioUrl} className="w-full h-10 rounded-lg outline-none" />
                ) : (
                  <div className="flex items-center justify-center h-16 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                    <span className="text-sm font-semibold text-slate-400">Audio not available</span>
                  </div>
                )}
              </div>

              {/* Transcript */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col min-h-0">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Full Transcript</span>
                </div>
                
                {(!selectedCallLog.transcript || selectedCallLog.transcript.startsWith("Call in") || selectedCallLog.transcript === "Call completed.") ? (
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm leading-relaxed text-slate-700 whitespace-pre-wrap flex-1 overflow-y-auto max-h-[40vh] scrollbar-thin">
                    {selectedCallLog.transcript || <span className="italic text-slate-400">No transcript available.</span>}
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex-1 overflow-y-auto max-h-[40vh] scrollbar-thin space-y-4">
                    {selectedCallLog.transcript.split('\n').filter(l => l.trim().length > 0).map((line, i) => {
                      const isCustomer = line.startsWith('Customer:');
                      const isAgent = line.startsWith('Agent:');
                      const content = line.replace(/^(Customer|Agent):\s*/, '');
                      
                      if (!isCustomer && !isAgent) {
                        return <p key={i} className="text-sm text-slate-600 whitespace-pre-wrap">{line}</p>;
                      }
                      
                      return (
                        <div key={i} className={`flex w-full ${isCustomer ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${isCustomer ? 'bg-primary-500 text-white rounded-tr-sm shadow-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                            <div className={`text-[10px] font-black uppercase tracking-wider mb-1 ${isCustomer ? 'text-primary-100' : 'text-slate-400'}`}>
                              {isCustomer ? 'Customer' : 'AI Agent'}
                            </div>
                            <div className="leading-relaxed whitespace-pre-wrap">
                              {content}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE CUSTOM TICKET */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-scale-up">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
              <div className="flex items-center gap-3.5">
                <span className="p-2.5 rounded-xl bg-indigo-50 text-indigo-650 border border-indigo-100 shadow-sm">
                  <PlusCircle className="w-5.5 h-5.5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-lg">Create Custom Ticket</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Log a direct client issue or phone request
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewTicketAttachment(null);
                }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-455 hover:text-slate-700 transition-all cursor-pointer border border-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Form */}
            <form onSubmit={handleCreateTicket} className="flex-1 p-8 space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    value={newTicketFirstName}
                    onChange={(e) => setNewTicketFirstName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-sm font-semibold focus:border-primary-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={newTicketLastName}
                    onChange={(e) => setNewTicketLastName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-sm font-semibold focus:border-primary-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Customer Email Address</label>
                <input
                  type="email"
                  required
                  value={newTicketEmail}
                  onChange={(e) => setNewTicketEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-sm font-semibold focus:border-primary-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
                  placeholder="e.g. client@domain.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Inquiry Category</label>
                  <select
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-sm font-semibold focus:border-primary-500 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="API & Developer Tools">API & Developer Tools</option>
                    <option value="Billing & Invoices">Billing & Invoices</option>
                    <option value="System Status & Uptime">System Status & Uptime</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Ticket Urgency</label>
                  <select
                    value={newTicketPriority}
                    onChange={(e) => setNewTicketPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-sm font-semibold focus:border-primary-500 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="LOW">Low Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="HIGH">High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Problem Description</label>
                <textarea
                  required
                  rows={5}
                  value={newTicketDescription}
                  onChange={(e) => setNewTicketDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-sm font-semibold focus:border-primary-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 resize-none leading-relaxed"
                  placeholder="Summarize the support call or issue details here..."
                />
              </div>

              {/* Attachments Upload */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3">
                <label className="block text-xs font-semibold text-slate-500">Ticket Attachments (Optional)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id="new-ticket-file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) startNewTicketUpload([file]);
                    }}
                  />
                  <label
                    htmlFor="new-ticket-file-upload"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all cursor-pointer shadow-sm hover:border-primary-400"
                  >
                    <Paperclip className="w-4 h-4 text-slate-500" />
                    {newTicketUploading ? 'Uploading file...' : 'Upload Attachment'}
                  </label>

                  {newTicketAttachment ? (
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm max-w-sm">
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[200px]">
                        {newTicketAttachment.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setNewTicketAttachment(null)}
                        className="text-red-500 hover:text-red-750 transition-colors p-0.5 rounded animate-fade-in"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">No file attached</span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewTicketAttachment(null);
                  }}
                  className="px-5 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={newTicketSubmitting || newTicketUploading}
                  className="px-6 py-2.5 bg-primary-600 hover:bg-primary-750 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-primary-600/10 cursor-pointer border border-primary-500/20"
                >
                  {newTicketSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Logging...
                    </>
                  ) : (
                    <>
                      Create Ticket
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW MERGED TICKETS */}
      {showMergedTicketsModal && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col animate-scale-up h-[80vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
                  <History className="w-5.5 h-5.5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-lg">Merged Tickets History</h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Tickets consolidated into {selectedTicket?.id}</p>
                </div>
              </div>
              <button onClick={() => setShowMergedTicketsModal(false)} className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-450 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
              {mergedTicketsList.map((mt, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-primary-700">{mt.id}</span>
                      <h4 className="font-bold text-slate-800 text-sm mt-1">Raised by {mt.customerName}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">{mt.createdAt}</p>
                    </div>
                    <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200">
                      Merged
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Original Inquiry</p>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {mt.description}
                    </p>
                  </div>
                  {mt.messages && mt.messages.length > 0 && (
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Prior Thread</p>
                      <div className="space-y-3">
                        {mt.messages.filter((m: any) => !m.text.startsWith('[SYSTEM]')).map((msg: any, mIdx: number) => (
                          <div key={mIdx} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-500 mb-1 block">
                              {msg.sender === 'customer' ? mt.customerName : 'Agent'} • {msg.time}
                            </span>
                            <p className="text-sm text-slate-700">{msg.text.replace(/\[MERGED FROM TICKET #\d+\]: /, '')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        tickets={tickets}
        agents={agents}
      />
    </div>
  );
}
