const fs = require('fs');

let dashboardCode = fs.readFileSync('src/app/dashboard/page.tsx', 'utf-8');
let agentCode = fs.readFileSync('src/app/agent/page.tsx', 'utf-8');

const getSection = (startMarker, endMarker) => {
  const startIdx = dashboardCode.indexOf(startMarker);
  const endIdx = dashboardCode.indexOf(endMarker, startIdx);
  if (startIdx === -1 || endIdx === -1) return null;
  return dashboardCode.slice(startIdx, endIdx);
};

let chatsBody = getSection('{/* TAB 3: LIVE CHATS', '{/* TAB 4: VOICE LOGS */}');
let voiceBody = getSection('{/* TAB 4: VOICE LOGS */}', '</section>');

let chatModal = getSection('{/* MODAL 2: LIVE CHAT TRANSCRIPT */}', '{/* MODAL 3: VOICE LOG TRANSCRIPT */}');
let voiceModal = getSection('{/* MODAL 3: VOICE LOG TRANSCRIPT */}', '{/* Toast Notification Card Container */}');

if (!chatsBody || !voiceBody || !chatModal || !voiceModal) {
  console.log("Failed to match sections from dashboard code.");
  process.exit(1);
}

if (!agentCode.includes('interface ChatItem')) {
  const insertIndex = agentCode.indexOf('export default function AgentPage()');
  const types = `
import { MessageCircle, Mic, Play, Volume2, VolumeX, Calendar } from 'lucide-react';

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
  const lines = text.split('\\n');
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
    return \`\${hoursStr}:\${minutesStr} \${ampm}\`;
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
        const wordCount = trimmed.split(/\\s+/).length;
        elapsedSeconds += Math.ceil(wordCount * 0.4);
        const msgTime = new Date(baseTime.getTime() + elapsedSeconds * 1000);
        parsed[parsed.length - 1].time = formatTimeStr(msgTime);
        continue;
      }
    }

    const wordCount = content.split(/\\s+/).length;
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

`;
  agentCode = agentCode.slice(0, insertIndex) + types + agentCode.slice(insertIndex);
}

agentCode = agentCode.replace(
  "const [activeTab, setActiveTab] = useState<'overview' | 'tickets'>('overview');",
  "const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'chats' | 'voice'>('overview');"
);

if (!agentCode.includes('const [chats, setChats]')) {
  agentCode = agentCode.replace(
    "const [agents, setAgents] = useState<{ id: number; name: string; email: string; role: string }[]>([]);",
    "const [agents, setAgents] = useState<{ id: number; name: string; email: string; role: string }[]>([]);\n  const [chats, setChats] = useState<ChatItem[]>([]);\n  const [voiceLogs, setVoiceLogs] = useState<VoiceLogItem[]>([]);"
  );
}

if (!agentCode.includes('const [chatsPage, setChatsPage]')) {
  agentCode = agentCode.replace(
    "const ticketsPerPage = 5;",
    "const ticketsPerPage = 5;\n  const [chatsPage, setChatsPage] = useState(1);\n  const chatsPerPage = 6;\n  const [voicePage, setVoicePage] = useState(1);\n  const voicePerPage = 6;"
  );
}

if (!agentCode.includes('const [selectedChat, setSelectedChat]')) {
  agentCode = agentCode.replace(
    "const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);",
    "const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);\n  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);\n  const [selectedVoiceLog, setSelectedVoiceLog] = useState<VoiceLogItem | null>(null);\n  const [audioPlaybackError, setAudioPlaybackError] = useState(false);"
  );
}

if (!agentCode.includes('/api/agents/chats')) {
  agentCode = agentCode.replace(
    "setTickets(freshTickets);",
    "setTickets(freshTickets);\n\n        const chatsRes = await fetch('/api/agents/chats');\n        if (chatsRes.ok) {\n          const data = await chatsRes.json();\n          setChats(data);\n        }\n\n        const voiceRes = await fetch('/api/agents/voice-logs');\n        if (voiceRes.ok) {\n          const data = await voiceRes.json();\n          setVoiceLogs(data);\n        }"
  );
}

if (!agentCode.includes('lg:grid-cols-4')) {
  agentCode = agentCode.replace(
    'className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:max-w-xl"',
    'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full"'
  );
}

const tabsToAdd = `
            {/* TAB 3: Live Chats */}
            <button
              onClick={() => setActiveTab('chats')}
              className={\`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm \${activeTab === 'chats'
                ? 'bg-primary-600 border-primary-700 text-white shadow-md shadow-primary-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }\`}
            >
              <div className="flex items-center gap-3">
                <div className={\`w-9 h-9 rounded-xl flex items-center justify-center transition-all \${activeTab === 'chats' ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-600'
                  }\`}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold">Live Chats</span>
                  <span className={\`block text-[10px] \${activeTab === 'chats' ? 'text-white/80' : 'text-slate-400 font-semibold'}\`}>Chat log sessions</span>
                </div>
              </div>
              <span className={\`text-xs font-bold px-2.5 py-1 rounded-lg border \${activeTab === 'chats'
                ? 'bg-white/20 text-white border-white/10'
                : 'bg-slate-100 text-slate-700 border-slate-200'
                }\`}>
                {chats.length}
              </span>
            </button>

            {/* TAB 4: Voice Calls */}
            <button
              onClick={() => setActiveTab('voice')}
              className={\`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm \${activeTab === 'voice'
                ? 'bg-primary-600 border-primary-700 text-white shadow-md shadow-primary-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }\`}
            >
              <div className="flex items-center gap-3">
                <div className={\`w-9 h-9 rounded-xl flex items-center justify-center transition-all \${activeTab === 'voice' ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-600'
                  }\`}>
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold">Voice AI</span>
                  <span className={\`block text-[10px] \${activeTab === 'voice' ? 'text-white/80' : 'text-slate-400 font-semibold'}\`}>Voice transcript logs</span>
                </div>
              </div>
              <span className={\`text-xs font-bold px-2.5 py-1 rounded-lg border \${activeTab === 'voice'
                ? 'bg-white/20 text-white border-white/10'
                : 'bg-slate-100 text-slate-700 border-slate-200'
                }\`}>
                {voiceLogs.length}
              </span>
            </button>
`;

if (!agentCode.includes("onClick={() => setActiveTab('chats')}")) {
  agentCode = agentCode.replace(
    /<\/button>\s*<\/div>\s*<\/section>/,
    `</button>\n${tabsToAdd}\n          </div>\n\n        </section>`
  );
}

// Modify titles slightly for agent view
chatsBody = chatsBody.replace(
  /{selectedChat\.title}/g,
  `{selectedChat.customerName ? \`Chat with \${selectedChat.customerName}\` : selectedChat.customerEmail ? \`Chat with \${selectedChat.customerEmail}\` : 'Chat with Guest User'}`
);

// Do the same modification in the modal body just in case
chatModal = chatModal.replace(
  /{selectedChat\.title}/g,
  `{selectedChat.customerName ? \`Chat with \${selectedChat.customerName}\` : selectedChat.customerEmail ? \`Chat with \${selectedChat.customerEmail}\` : 'Chat with Guest User'}`
);

voiceModal = voiceModal.replace(
  /Session ID: {selectedVoiceLog\.id}/g,
  `{selectedVoiceLog.customerName ? \`Customer: \${selectedVoiceLog.customerName}\` : selectedVoiceLog.customerEmail ? \`Customer: \${selectedVoiceLog.customerEmail}\` : 'Guest User'} • ID: {selectedVoiceLog.id.slice(0, 8)}`
);

if (!agentCode.includes('TAB 3: LIVE CHATS')) {
  agentCode = agentCode.replace(
    /<\/section>\s*<\/div>\s*{\/\* MODAL 1: TICKET CONVERSATION THREAD \*\/}/,
    `${chatsBody}\n${voiceBody}\n        </section>\n      </div>\n\n      {/* MODAL 1: TICKET CONVERSATION THREAD */}`
  );
}

if (!agentCode.includes('MODAL 2: LIVE CHAT TRANSCRIPT')) {
  agentCode = agentCode.replace(
    /{\/\* MODAL: CREATE CUSTOM TICKET \*\/}/,
    `${chatModal}\n${voiceModal}\n\n      {/* MODAL: CREATE CUSTOM TICKET */}`
  );
}

fs.writeFileSync('src/app/agent/page.tsx', agentCode);
console.log("Successfully modified agent/page.tsx");
