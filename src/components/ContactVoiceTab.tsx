import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

interface VoiceMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
}

let messageIdCounter = 0;

function generateUniqueId(): string {
  messageIdCounter += 1;
  const rand = Math.floor(Math.random() * 1000000);
  return `voice_msg_${messageIdCounter}_${rand}`;
}

function getCurrentTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export const ContactVoiceTab: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_WEB_AGENT_ID || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '';


  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const conversationRef = useRef<any>(null);
  const conversationIdRef = useRef<string | null>(null);
  const sessionStartTimeRef = useRef<number | null>(null);
  const messagesRef = useRef<VoiceMessage[]>([]);

  const saveVoiceSessionToDb = async (messagesList: VoiceMessage[]) => {
    const cid = conversationIdRef.current;
    if (!cid) return;

    const durationSec = sessionStartTimeRef.current
      ? Math.round((Date.now() - sessionStartTimeRef.current) / 1000)
      : 0;

    const transcriptText = messagesList
      .filter(m => m.id !== 'welcome')
      .map(m => `${m.sender === 'user' ? 'Customer' : 'Agent'}: ${m.text}`)
      .join('\n');

    if (!transcriptText.trim()) return;

    const audioUrl = `/api/voice-audio?conversation_id=${cid}`;

    try {
      await fetch('/api/voice-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: cid,
          customerEmail: currentUser?.email || null,
          transcript: transcriptText,
          duration: durationSec,
          audioUrl: audioUrl
        })
      });
      console.log("Voice session saved in PostgreSQL database.");

      // Sync local storage as fallback/complement
      const newLog = {
        id: cid,
        title: `Voice Session: ${cid.slice(0, 10)}...`,
        status: 'Completed',
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: `${durationSec}s`,
        transcript: transcriptText,
        confidence: '98%',
        audioUrl: audioUrl
      };

      const existing = localStorage.getItem('nexus_voice_logs');
      const logs = existing ? JSON.parse(existing) : [];
      if (!logs.some((l: any) => l.id === cid)) {
        logs.unshift(newLog);
        localStorage.setItem('nexus_voice_logs', JSON.stringify(logs));
      }
    } catch (err) {
      console.error("Failed to save voice log to database:", err);
    }
  };

  // Load user session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nexus_user');
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {
          console.warn(e);
        }
      }
    }
  }, []);

  // Initialize messages once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text:"Hello! I am your Ticket-it AI Voice Assistant. Click the microphone button to start our conversation.",
          timestamp: getCurrentTime()
        }
      ]);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (conversationRef.current) {
        try {
          conversationRef.current.endSession();
        } catch (e) {
          console.warn(e);
        }
      }
    };
  }, []);

  // Stop audio analyst utility
  const stopAudioAnalysis = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      audioContextRef.current = null;
    }
    analyserRef.current = null;
  }, []);

  // Start Audio Context analyser
  const startAudioAnalysis = useCallback(async () => {
    try {
      if (!canvasRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;
    } catch (err) {
      console.warn("Could not start micro analyser", err);
    }
  }, []);

  // ElevenLabs live conversation controls
  const startElevenLabsSession = async () => {
    if (!agentId) {
      setErrorMessage("ElevenLabs Agent ID is not configured. Please define NEXT_PUBLIC_ELEVENLABS_WEB_AGENT_ID or NEXT_PUBLIC_ELEVENLABS_AGENT_ID in your .env");
      setStatus('error');
      return;
    }
    try {
      setStatus('processing');
      setErrorMessage('');

      // Fetch dynamic voice prompt overrides if user is logged in
      let conversationOverrides: any = undefined;

      if (currentUser && currentUser.email) {
        try {
          const res = await fetch('/api/voice-context', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: currentUser.email })
          });
          if (res.ok) {
            const dbData = await res.json();

            // COMPRESS CONTEXT TO AVOID WEBSOCKET PAYLOAD SIZE LIMITS!
            const miniTickets = (dbData.tickets || []).slice(0, 3).map((t: any) =>
              `[Ticket ${t.ticketNumber}: ${t.status}]`
            ).join(', ');

            const miniBatches = (dbData.batches || []).slice(0, 3).map((b: any) =>
              `[Batch ${b.id}: ${b.status}]`
            ).join(', ');

            conversationOverrides = {
              agent: {
                prompt: {
                  prompt: `You are Max, a highly helpful customer support voice agent for Ticket-it. 
You are speaking in real-time with: ${dbData.profile?.name} (${dbData.profile?.email}).
Phone: ${dbData.profile?.phone || 'N/A'}. Org: ${dbData.profile?.client || 'N/A'}.
Recent Tickets: ${miniTickets || 'None'}
Recent Batches: ${miniBatches || 'None'}
Keep your answers brief, conversational, and friendly.`
                },
                firstMessage: `Hello ${dbData.profile?.name?.split(' ')[0] || 'there'}! I'm Max, your AI Support Specialist. How can I assist you with your account today?`
              }
            };
          }
        } catch (dbErr) {
          console.warn("Could not fetch database voice context, falling back to basic session:", dbErr);
        }
      } else {
        conversationOverrides = {
          agent: {
            prompt: {
              prompt: `You are Max, a helpful customer support voice assistant for Ticket-it.
The user is NOT logged in. You are speaking with an anonymous visitor.
Our website (Ticket-it) provides a robust ticketing and batch management system.
RULE: You MUST NOT disclose any personal details. Tell them to sign in if they need account support.`
            },
            firstMessage: `Hello! I'm Max, your AI Support Specialist for Ticket-IT. How can I assist you today?`
          }
        };
      }

      // Dynamically import @elevenlabs/client
      const elevenlabsClient = await import('@elevenlabs/client');
      const { Conversation } = elevenlabsClient;

      const connectionConfig: any = {
        onConnect: ({ conversationId }: { conversationId: string }) => {
          console.log("ElevenLabs Connected:", conversationId);
          conversationIdRef.current = conversationId;
          sessionStartTimeRef.current = Date.now();
          messagesRef.current = [];
          setStatus('listening');
        },
        onDisconnect: () => {
          console.log("ElevenLabs Disconnected");
          setStatus('idle');
          stopAudioAnalysis();
          saveVoiceSessionToDb(messagesRef.current);
        },
        onMessage: (message: { message: string; source: 'user' | 'ai' }) => {
          const newMsg = {
            id: generateUniqueId(),
            sender: (message.source === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
            text: message.message,
            timestamp: getCurrentTime()
          };
          setMessages(prev => {
            const next = [...prev, newMsg];
            messagesRef.current = next;
            return next;
          });
        },
        onError: (error: any) => {
          console.error("ElevenLabs Error:", error);
          setErrorMessage(String(error?.message || error ||"Connection failed."));
          setStatus('error');
          stopAudioAnalysis();
        },
        onStatusChange: ({ status: statusVal }: { status: string }) => {
          if (statusVal === 'connecting') setStatus('processing');
          else if (statusVal === 'connected') setStatus('listening');
          else if (statusVal === 'disconnected') setStatus('idle');
        },
        onModeChange: ({ mode: modeVal }: { mode: string }) => {
          if (modeVal === 'speaking') setStatus('speaking');
          else if (modeVal === 'listening') setStatus('listening');
        }
      };

      connectionConfig.agentId = agentId;
      if (conversationOverrides) {
        connectionConfig.overrides = conversationOverrides;
        console.log("Using ElevenLabs agentId session WITH client-side prompt overrides.");
      } else {
        console.log("Using BARE MINIMUM ElevenLabs Agent ID:", agentId);
      }

      const conversation = await Conversation.startSession(connectionConfig);
      conversationRef.current = conversation;
    } catch (err: any) {
      console.error("Failed to start ElevenLabs session:", err);
      setErrorMessage(err?.message || String(err) ||"Microphone access denied or connection failed.");
      setStatus('error');
      stopAudioAnalysis();
    }
  };

  const endElevenLabsSession = async () => {
    if (conversationRef.current) {
      try {
        await conversationRef.current.endSession();
      } catch (err) {
        console.warn("Error ending ElevenLabs session:", err);
      }
      conversationRef.current = null;
    }
    setStatus('idle');
    stopAudioAnalysis();
  };

  // Toggle speech listener
  const toggleListening = () => {
    if (status === 'idle' || status === 'error') {
      startElevenLabsSession();
    } else {
      endElevenLabsSession();
    }
  };

  // Canvas visualizer loop
  const drawVisualizer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background glow
      ctx.fillStyle = 'rgba(15, 23, 42, 0.03)';
      ctx.fillRect(0, 0, width, height);

      // Linear gradient styling
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#2563eb');
      gradient.addColorStop(0.5, '#6366f1');
      gradient.addColorStop(1, '#a855f7');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      phase += 0.07;

      if (status === 'listening' && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        ctx.beginPath();
        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        ctx.beginPath();
        x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = height - (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.lineTo(width, height / 2);
        ctx.stroke();

      } else if (status === 'speaking') {
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.02 + phase) * 20 * Math.sin(x * 0.005);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.035 - phase) * 12 * Math.sin(x * 0.008);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

      } else if (status === 'processing') {
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.1 + phase * 2.5) * 8;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

      } else {
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.01 + phase * 0.3) * 3;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
  }, [status]);

  // Sync visualizer rendering
  useEffect(() => {
    drawVisualizer();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawVisualizer]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleMute = () => {
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (conversationRef.current) {
        try {
          conversationRef.current.setMute(nextMuted);
        } catch (e) {
          console.warn("Could not set mute on ElevenLabs agent:", e);
        }
      }
      return nextMuted;
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Left Visual Voice Assistant Panel */}
        <div className="lg:col-span-6 relative flex flex-col">
          <div className="relative bg-slate-950 border border-slate-900 rounded-[8px] p-8 flex flex-col items-center justify-center overflow-hidden flex-1 h-[460px] w-full">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none"></div>

            {/* Glowing Orb Header */}
            <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 z-10">
              <span className={`w-2 h-2 rounded-full ${status === 'listening' ? 'bg-red-500 animate-ping' : 'bg-primary-500 animate-pulse'}`}></span>
              <span>System: {status}</span>
            </div>

            {/* Voice Mute control */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-6 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-slate-800 transition-colors z-10 cursor-pointer"
              title={isMuted ?"Unmute Mic" :"Mute Mic"}
            >
              {isMuted ? <VolumeX className="w-4.5 h-4.5 text-red-500" /> : <Volume2 className="w-4.5 h-4.5 text-green-400" />}
            </button>

            {/* Glowing Visual Core */}
            <div className="relative w-44 h-44 rounded-full flex items-center justify-center z-10 my-6">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 via-indigo-500/10 to-purple-500/30 blur-xl transition-all duration-700 ${status === 'listening' ? 'scale-125 opacity-70 animate-pulse' :
                status === 'speaking' ? 'scale-110 opacity-60' : 'scale-95 opacity-30'
                }`}></div>

              <div className={`absolute w-36 h-36 rounded-full border border-slate-800/80 bg-slate-900/90 flex flex-col items-center justify-center shadow-inner transition-transform duration-300 ${status === 'listening' ? 'scale-105 border-red-500/40' : ''
                }`}>
                {/* Visualizer Canvas */}
                <canvas
                  ref={canvasRef}
                  width={140}
                  height={80}
                  className="w-full h-[70px] opacity-80"
                />

                {/* Status Indicator Text */}
                <span className="text-[10px] text-slate-500  tracking-widest uppercase mt-2">
                  {status === 'listening' ? 'LISTENING NOW' :
                    status === 'speaking' ? 'SPEAKING' :
                      status === 'processing' ? 'CONNECTING...' : 'READY'}
                </span>
              </div>
            </div>

            {/* Microphone Button Controls */}
            <div className="z-10 flex flex-col items-center gap-3 w-full">
              <button
                type="button"
                onClick={toggleListening}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer border ${status === 'listening' || status === 'speaking' || status === 'processing'
                  ? 'bg-red-600 border-red-500 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-primary-600 border-primary-500 hover:bg-primary-700 text-white'
                  }`}
              >
                {status === 'listening' || status === 'speaking' || status === 'processing' ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>

              <p className="text-[12px] text-slate-400 text-center max-w-[280px]">
                {status === 'listening' || status === 'speaking' || status === 'processing' ?"Conversation active. Click to end call." :"Click microphone to start call."}
              </p>
            </div>

            {status === 'error' && (
              <div className="absolute bottom-4 left-6 right-6 bg-red-950/80 border border-red-800 rounded-xl px-4 py-2.5 flex items-start gap-2.5 text-xs text-red-300 z-10">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Voice Log Console */}
        <div className="lg:col-span-6 flex flex-col h-[460px] bg-white border border-slate-200 rounded-[8px] overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-500" /> Voice Conversation Log
            </h4>
          </div>

          {/* Conversation list */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${isUser
                    ? 'bg-primary-600 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                    }`}>
                    <p className="leading-relaxed select-text">{msg.text}</p>
                    <span className={`block text-[9px] mt-1.5 text-right ${isUser ? 'text-primary-200' : 'text-slate-400'} font-semibold`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Guidelines Footer */}
          <div className="bg-slate-50 border-t border-slate-100 p-3.5 flex items-start gap-2 text-xs text-slate-500">
            <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p><strong>Voice Assistant Controls:</strong> Speak into your microphone to talk to the agent in real time. Click the microphone button to start or end the conversation call.</p>
          </div>

        </div>

      </div>
    </div>
  );
};
export default ContactVoiceTab;
