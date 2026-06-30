import React from 'react';
import { Clock, Shield, Sparkles, MessageCircle } from 'lucide-react';

export const ContactChatTab: React.FC = () => {
  return (
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
                <span className="text-green-600">✓</span>
              </div>
              <span><strong>Zero Interruptions:</strong> Browse support guides while you chat.</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center border border-green-200 flex-shrink-0">
                <span className="text-green-600">✓</span>
              </div>
              <span><strong>Draggable & Resizable:</strong> Position or resize the widget anywhere.</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center border border-green-200 flex-shrink-0">
                <span className="text-green-600">✓</span>
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
  );
};
export default ContactChatTab;
