"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Ticket,
  CheckCircle,
  Clock,
  X,
  AlertTriangle,
  CheckSquare,
  Send,
  MessageSquare,
  FileText,
  Paperclip,
  Trash2,
  Loader2,
  ArrowRight,
  Shield,
  Activity,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useUploadThing } from '@/lib/uploadthing';

interface ReplyItem {
  sender: 'customer' | 'agent';
  text: string;
  time: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
}

interface TicketDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  replies?: ReplyItem[];
}

function TicketTrackerContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get('id');
  const token = searchParams.get('token');

  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
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

  const fetchTicketDetails = async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      if (!ticketId || !token) {
        setError('Missing Ticket ID or security tracking token.');
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/track-ticket?id=${encodeURIComponent(ticketId)}&token=${encodeURIComponent(token)}`);
      if (res.ok) {
        const data = await res.json();
        setTicket(data);
        setError(null);
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to access ticket details.');
      }
    } catch (err) {
      console.error('Error fetching tracked ticket:', err);
      setError('Connection failure. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Poll for agent updates every 5 seconds
  useEffect(() => {
    fetchTicketDetails(true);

    const interval = setInterval(() => {
      fetchTicketDetails(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [ticketId, token]);

  const handleResolveTicket = async () => {
    if (!ticketId || !ticket) return;

    try {
      const res = await fetch('/api/tickets/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: ticketId,
          action: 'resolve',
          token: token
        })
      });

      if (res.ok) {
        setTicket(prev => prev ? { ...prev, status: 'Resolved' } : null);
      } else {
        alert('Failed to update ticket status.');
      }
    } catch (err) {
      console.error('Error resolving ticket:', err);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !ticket || !ticketId) return;

    const textToSend = replyText;
    setReplyText('');

    // Pre-insert message for instantaneous UI feel
    const timeString = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const localReply: ReplyItem = {
      sender: 'customer',
      text: textToSend,
      time: timeString,
      attachmentUrl: replyAttachment?.url || null,
      attachmentName: replyAttachment?.name || null
    };

    setTicket(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: prev.status === 'Resolved' ? 'Open' : prev.status,
        replies: [...(prev.replies || []), localReply]
      };
    });

    try {
      const res = await fetch('/api/tickets/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: ticketId,
          senderEmail: ticket.email,
          text: textToSend,
          attachmentUrl: replyAttachment?.url || null,
          attachmentName: replyAttachment?.name || null,
          token: token
        })
      });

      if (res.ok) {
        setReplyAttachment(null);
        fetchTicketDetails(false);
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to submit response.');
      }
    } catch (err) {
      console.error('Error sending reply:', err);
    }
  };

  if (loading && !ticket) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-50 min-h-[500px]">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
        <p className="text-slate-500 font-semibold text-sm">Verifying secure tracking signature...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="flex-1 flex items-center justify-center py-16 px-4 bg-slate-50 min-h-[500px]">
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 max-w-md w-full shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-100">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {error || "The tracking token is invalid or has expired. Make sure you copy-pasted the complete URL."}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-full transition-colors shadow-md cursor-pointer"
            >
              Back to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Ribbon */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded border border-primary-100 shadow-sm">
                {ticket.id}
              </span>
              <span className="text-xs font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Guest Tracker
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-800">Ticket Hub Discussion</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">Category: {ticket.category}</span>
          </div>
        </div>

        {/* Workspace Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Info & Status */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
            
            {/* Description Card */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 space-y-3.5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Ticket className="w-4 h-4 text-primary-600" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Inquiry Description</h3>
              </div>
              <p className="text-sm text-slate-650 leading-relaxed select-text font-normal">
                {ticket.description}
              </p>
              <div className="text-[11px] text-slate-400 pt-2 font-mono border-t border-slate-100">
                Created: {ticket.createdAt}
              </div>
            </div>

            {/* Attachments Card */}
            {ticket.attachmentUrl && (
              <div className="bg-white border border-slate-200 rounded-[24px] p-6 space-y-3.5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <FileText className="w-4 h-4 text-primary-600" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Attachments</h3>
                </div>
                <div className="flex">
                  <a
                    href={ticket.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-sm max-w-full"
                  >
                    <FileText className="w-4 h-4 text-primary-600 shrink-0" />
                    <span className="truncate text-slate-800 font-bold">{ticket.attachmentName || 'View Attachment'}</span>
                  </a>
                </div>
              </div>
            )}

            {/* Ticket Actions & Status Indicator */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Ticket Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${
                  ticket.status === 'Open'
                    ? 'bg-blue-50 text-blue-600 border-blue-100'
                    : ticket.status === 'In Progress'
                      ? 'bg-amber-50 text-amber-600 border-amber-100'
                      : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                  {ticket.status}
                </span>
              </div>
              {ticket.status !== 'Resolved' ? (
                <button
                  type="button"
                  onClick={handleResolveTicket}
                  className="w-full justify-center px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 border border-emerald-500/20 shadow-md shadow-emerald-500/10"
                >
                  <CheckSquare className="w-4 h-4" /> Mark as Resolved
                </button>
              ) : (
                <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center text-xs font-bold text-emerald-600">
                  This inquiry has been resolved.
                </div>
              )}
            </div>

          </div>

          {/* Right panel: Chat messages */}
          <div className="lg:col-span-7 flex flex-col bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm min-h-[450px]">
            
            {/* Conversation Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <span className="p-1 rounded-lg bg-primary-50 text-primary-600 border border-primary-100">
                  <MessageSquare className="w-4 h-4" />
                </span>
                Conversation History
              </h4>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                Live Sync
              </span>
            </div>

            {/* Bubble logs */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 py-4 max-h-[380px] min-h-[250px] scrollbar-thin">
              {(!ticket.replies || ticket.replies.length === 0) ? (
                <div className="h-full flex flex-col items-center justify-center py-12 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shadow-sm animate-pulse">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-700 text-xs">Awaiting Agent Assignment</h5>
                    <p className="text-[11px] text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                      No agent replies yet. Our customer care desk has received your ticket and will update this thread shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {ticket.replies.map((reply, idx) => {
                    const isUser = reply.sender === 'customer';
                    return (
                      <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs md:text-sm leading-relaxed shadow-sm ${
                          isUser
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
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all truncate max-w-full ${
                                  isUser
                                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-250'
                                }`}
                              >
                                <FileText className="w-3 h-3 shrink-0" />
                                <span className="truncate">{reply.attachmentName || 'View Attachment'}</span>
                              </a>
                            </div>
                          )}

                          <span className={`block text-[9px] font-semibold mt-1 text-right ${isUser ? 'text-white/80' : 'text-slate-500'}`}>
                            {reply.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Reply block */}
            {ticket.status !== 'Resolved' ? (
              <div className="border-t border-slate-100 pt-4 space-y-3">
                {replyAttachment && (
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-250 rounded-xl p-2 animate-fade-in">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[200px]">{replyAttachment.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReplyAttachment(null)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                
                {replyUploading && (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <Loader2 className="w-3.5 h-3.5 text-primary-600 animate-spin" />
                    Uploading reply file...
                  </div>
                )}

                <form onSubmit={handleSendReply} className="flex gap-2">
                  <input
                    type="file"
                    id="guest-reply-file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) startReplyUpload([file]);
                    }}
                  />
                  <label
                    htmlFor="guest-reply-file-upload"
                    className="w-11 h-11 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors shrink-0"
                    title="Attach file"
                  >
                    <Paperclip className="w-4.5 h-4.5 text-slate-500 hover:text-primary-600" />
                  </label>

                  <input
                    type="text"
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your message update to the support agent..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs md:text-sm focus:border-primary-500 focus:bg-white focus:outline-none text-slate-800 placeholder-slate-400 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={replyUploading}
                    className="w-11 h-11 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-all cursor-pointer shadow hover:shadow-md disabled:bg-primary-400 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : null}

          </div>

        </div>

      </div>
    </div>
  );
}

export default function TicketTrackerPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center p-12 bg-slate-50 min-h-[500px]">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
        <p className="text-slate-500 font-semibold text-sm">Loading Ticket Tracking Hub...</p>
      </div>
    }>
      <TicketTrackerContent />
    </Suspense>
  );
}
