"use client";

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Minus, 
  Send, 
  Clock
} from 'lucide-react';

export default function ChatWidget() {
  // Visibility States:
  // 'hidden': completely hidden, nothing in the bottom-right.
  // 'minimized': floating blue chat bubble button in the bottom-right.
  // 'expanded': chat window open, bubble button hidden.
  const [visibility, setVisibility] = useState<'hidden' | 'minimized' | 'expanded'>('hidden');
  const [unreadBadge, setUnreadBadge] = useState(false);

  // Position and Size States
  const [width, setWidth] = useState(360);
  const [height, setHeight] = useState(480);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Confirmation Modal State
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  // Start drag/resize reference point
  const startRef = useRef({
    mouseX: 0,
    mouseY: 0,
    posX: 0,
    posY: 0,
    width: 360,
    height: 480
  });

  // Chat conversation state
  const [chatStatus, setChatStatus] = useState<'idle' | 'connecting' | 'active'>('idle');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'agent' | 'system'; text: string; time: string }[]>([]);
  const [chatInput, setChatInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Listen for global triggers to open the chat window (e.g. from Contact Us page)
  useEffect(() => {
    const handleOpenChat = () => {
      setVisibility('expanded');
      setUnreadBadge(false);
      
      // Initialize position in bottom-right corner when opened if not set
      if (typeof window !== 'undefined' && !position) {
        setPosition({
          x: window.innerWidth - width - 24,
          y: window.innerHeight - height - 96
        });
      }
    };

    window.addEventListener('open-chat-widget', handleOpenChat);
    return () => {
      window.removeEventListener('open-chat-widget', handleOpenChat);
    };
  }, [position, width, height]);

  // Keep chat window within viewport bounds when window is resized
  useEffect(() => {
    const handleWindowResize = () => {
      if (position) {
        const maxX = window.innerWidth - width;
        const maxY = window.innerHeight - height;
        setPosition(prev => {
          if (!prev) return null;
          return {
            x: Math.max(0, Math.min(maxX, prev.x)),
            y: Math.max(0, Math.min(maxY, prev.y))
          };
        });
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [position, width, height]);

  // Handle Drag Resizing from the top-left corner
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position?.x || (window.innerWidth - width - 24),
      posY: position?.y || (window.innerHeight - height - 96),
      width,
      height
    };
  };

  // Handle Header Dragging
  const startDrag = (e: React.MouseEvent) => {
    // Avoid dragging if clicking buttons in the header
    if ((e.target as HTMLElement).closest('button')) return;
    
    e.preventDefault();
    setIsDragging(true);
    startRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position?.x || (window.innerWidth - width - 24),
      posY: position?.y || (window.innerHeight - height - 96),
      width,
      height
    };
  };

  // Unified MouseMove and MouseUp effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const dx = e.clientX - startRef.current.mouseX;
        const dy = e.clientY - startRef.current.mouseY;

        const targetWidth = startRef.current.width - dx;
        const targetHeight = startRef.current.height - dy;

        const finalWidth = Math.max(320, Math.min(600, targetWidth));
        const finalHeight = Math.max(400, Math.min(800, targetHeight));

        const actualDx = startRef.current.width - finalWidth;
        const actualDy = startRef.current.height - finalHeight;

        setWidth(finalWidth);
        setHeight(finalHeight);
        setPosition({
          x: startRef.current.posX + actualDx,
          y: startRef.current.posY + actualDy
        });
      } else if (isDragging) {
        const dx = e.clientX - startRef.current.mouseX;
        const dy = e.clientY - startRef.current.mouseY;

        const newX = Math.max(0, Math.min(window.innerWidth - width, startRef.current.posX + dx));
        const newY = Math.max(0, Math.min(window.innerHeight - height, startRef.current.posY + dy));
        
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setIsDragging(false);
    };

    if (isResizing || isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isDragging, width, height]);

  // Start support chat session
  const startChat = () => {
    setChatStatus('connecting');
    setChatMessages([
      { sender: 'system', text: 'Initializing secure support connection...', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setTimeout(() => {
      setChatStatus('active');
      setChatMessages(prev => [
        ...prev,
        { sender: 'system', text: 'Sarah has joined the support room.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { sender: 'agent', text: 'Hello! Thanks for reaching out. How can I help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      if (visibility !== 'expanded') {
        setUnreadBadge(true);
      }
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: chatInput, time: timeString }
    ]);
    setChatInput('');

    // Agent response simulation
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'agent', text: `Thanks for details on your inquiry. Let me pull up your account credentials to inspect this closely.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      if (visibility !== 'expanded') {
        setUnreadBadge(true);
      }
    }, 1500);
  };

  return (
    <>
      {/* Floating Chat Bubble Button - visible only when minimized */}
      {visibility === 'minimized' && (
        <button
          type="button"
          onClick={() => {
            setVisibility('expanded');
            setUnreadBadge(false);
          }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-primary-500/20"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadBadge && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </button>
      )}

      {/* Floating Resizable and Draggable Chat Window - visible only when expanded */}
      {visibility === 'expanded' && (
        <div
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            left: position ? `${position.x}px` : 'auto',
            top: position ? `${position.y}px` : 'auto',
            bottom: position ? 'auto' : '24px',
            right: position ? 'auto' : '24px',
          }}
          className={`fixed z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-shadow select-none ${
            isResizing ? 'shadow-primary-100 ring-2 ring-primary-500/10' : ''
          }`}
        >
          {/* Permanent Close Confirmation Modal Overlay */}
          {showCloseConfirm && (
            <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-[280px] text-center shadow-2xl border border-slate-100 space-y-4">
                <h5 className="font-bold text-slate-900 text-sm">End Support Chat?</h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Are you sure you want to end this chat permanently? Your current session history will be cleared.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCloseConfirm(false);
                      setVisibility('hidden');
                      setChatStatus('idle');
                      setChatMessages([]);
                    }}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Yes, End
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCloseConfirm(false)}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer border border-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Custom Drag Resize Handle (Top Left Corner) */}
          <div 
            onMouseDown={startResize}
            className="absolute top-0 left-0 w-4.5 h-4.5 cursor-nwse-resize z-50 flex items-center justify-center"
            title="Drag to resize chat window"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" className="text-slate-400 fill-current opacity-40 hover:opacity-100">
              <path d="M6 0 L0 6 L0 10 L4 10 L10 4 L10 0 Z" />
            </svg>
          </div>

          {/* Chat Window Header (Draggable Area) */}
          <div 
            onMouseDown={startDrag}
            className={`bg-slate-50 border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shadow-sm pl-6 select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            title="Drag header to move chat window"
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <div className="relative w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-sm text-primary-700">
                S
                {chatStatus === 'active' && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white animate-pulse"></span>
                )}
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-800">Sarah (Support)</h4>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Customer Care Agent</p>
              </div>
            </div>
            
            {/* Header controls: Minimize vs Close Permanently */}
            <div className="flex items-center gap-1.5 z-10">
              <button
                type="button"
                onClick={() => setVisibility('minimized')}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Minimize chat"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowCloseConfirm(true)}
                className="p-1.5 rounded-lg hover:bg-slate-200 hover:text-red-600 text-slate-400 transition-colors cursor-pointer"
                title="Close chat permanently"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {chatStatus === 'idle' ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Live Support Chat</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect with an expert representative immediately to solve payment issues.
                  </p>
                </div>
                <div className="bg-white border border-slate-200/60 rounded-xl p-3 flex justify-between gap-6 text-[10px] font-semibold text-slate-600">
                  <span className="flex items-center gap-1 text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Online
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Wait &lt; 2 min
                  </span>
                </div>
                <button
                  type="button"
                  onClick={startChat}
                  className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Start Live Chat Session
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {chatMessages.map((msg, idx) => {
                  if (msg.sender === 'system') {
                    return (
                      <div key={idx} className="text-center">
                        <span className="inline-block bg-slate-200/80 text-slate-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isUser = msg.sender === 'user';
                  return (
                    <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-xl px-3.5 py-2 text-sm ${
                        isUser ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                      }`}>
                        <p className="leading-relaxed select-text">{msg.text}</p>
                        <span className={`block text-[9px] mt-0.5 text-right ${isUser ? 'text-primary-200' : 'text-slate-400'}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Footer Input Area */}
          {chatStatus !== 'idle' && (
            <form onSubmit={handleSendMessage} className="bg-white border-t border-slate-200 p-2.5 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatStatus === 'connecting'}
                placeholder={chatStatus === 'connecting' ? 'Establishing session...' : 'Type message here...'}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-primary-500 focus:outline-none disabled:bg-slate-100 disabled:text-slate-400"
              />
              <button
                type="submit"
                disabled={chatStatus === 'connecting' || !chatInput.trim()}
                className="w-8.5 h-8.5 rounded-lg bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors disabled:bg-slate-100 disabled:text-slate-300 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
