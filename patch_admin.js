const fs = require('fs');

const agentCode = fs.readFileSync('src/app/agent/page.tsx', 'utf8');
let adminCode = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// 1. Interfaces
const chatInterfaceRegex = /interface ChatItem {[\s\S]*?}/;
const voiceInterfaceRegex = /interface VoiceLogItem {[\s\S]*?}/;
const parseVoiceTranscriptRegex = /const parseVoiceTranscript = \([\s\S]*?};/;

const chatInterface = agentCode.match(chatInterfaceRegex)?.[0] || '';
const voiceInterface = agentCode.match(voiceInterfaceRegex)?.[0] || '';
const parseVoice = agentCode.match(parseVoiceTranscriptRegex)?.[0] || '';

if (!adminCode.includes('interface ChatItem')) {
  adminCode = adminCode.replace(
    /interface TicketItem {/,
    `${chatInterface}\n\n${voiceInterface}\n\n${parseVoice}\n\ninterface TicketItem {`
  );
}

// 2. States
if (!adminCode.includes('const [chats, setChats]')) {
  adminCode = adminCode.replace(
    /const \[activeTab, setActiveTab\] = useState.*?;/,
    `const [chats, setChats] = useState<ChatItem[]>([]);
  const [chatsPage, setChatsPage] = useState(1);
  const chatsPerPage = 6;
  const [voiceLogs, setVoiceLogs] = useState<VoiceLogItem[]>([]);
  const [voicePage, setVoicePage] = useState(1);
  const voicePerPage = 6;
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'chats' | 'voice'>('overview');
  
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [selectedVoiceLog, setSelectedVoiceLog] = useState<VoiceLogItem | null>(null);
  const [audioPlaybackError, setAudioPlaybackError] = useState(false);`
  );
}

// 3. API Calls
if (!adminCode.includes('/api/agents/chats')) {
  adminCode = adminCode.replace(
    /setTickets\(freshTickets\);/,
    `setTickets(freshTickets);

        const chatsRes = await fetch('/api/agents/chats');
        if (chatsRes.ok) {
          const data = await chatsRes.json();
          setChats(data);
        }

        const voiceRes = await fetch('/api/agents/voice-logs');
        if (voiceRes.ok) {
          const data = await voiceRes.json();
          setVoiceLogs(data);
        }`
  );
}

// 4. Icons
const adminIconsMatch = adminCode.match(/import {([\s\S]*?)} from 'lucide-react';/);
if (adminIconsMatch) {
  let iconsStr = adminIconsMatch[1];
  ['MessageCircle', 'Mic', 'Play', 'Volume2', 'VolumeX', 'Calendar'].forEach(icon => {
    if (!iconsStr.includes(icon)) {
      iconsStr += `, ${icon}`;
    }
  });
  adminCode = adminCode.replace(adminIconsMatch[1], iconsStr);
}

// 5. Tab Switcher
const agentTabSwitcherRegex = /<button[\s\S]*?onClick=\{\(\) => setActiveTab\('chats'\)\}[\s\S]*?<\/button>\s*<button[\s\S]*?onClick=\{\(\) => setActiveTab\('voice'\)\}[\s\S]*?<\/button>/;
const agentTabSwitcher = agentCode.match(agentTabSwitcherRegex)?.[0] || '';

if (!adminCode.includes(`onClick={() => setActiveTab('chats')}`)) {
  adminCode = adminCode.replace(
    /onClick=\{\(\) => setActiveTab\('tickets'\)\}[\s\S]*?<\/button>\s*<\/div>\s*<\/section>/,
    match => {
        // Find the last </button> in the match
        const parts = match.split('</button>');
        const replacement = parts.slice(0, parts.length - 1).join('</button>') + '</button>\n' + agentTabSwitcher + '\n' + parts[parts.length - 1];
        return replacement;
    }
  );
}

// Fix grid columns for tab switcher if needed
adminCode = adminCode.replace(/grid-cols-1 sm:grid-cols-2 gap-3 w-full md:max-w-xl/, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full');

// 6. Tab Content (Bodies)
const chatBodyRegex = /{\/\* TAB 3: LIVE CHATS \*\/}[\s\S]*?{\/\* TAB 4: VOICE LOGS \*\/}/;
const voiceBodyRegex = /{\/\* TAB 4: VOICE LOGS \*\/}[\s\S]*?<\/section>/;

const chatBody = agentCode.match(chatBodyRegex)?.[0] || '';
let voiceBody = agentCode.match(voiceBodyRegex)?.[0] || '';
voiceBody = voiceBody.replace('</section>', ''); // Strip closing section

if (!adminCode.includes('TAB 3: LIVE CHATS')) {
  adminCode = adminCode.replace(
    /<\/section>\s*<\/div>\s*{\/\* DISCUSSION MODAL THREAD \*\//,
    `  ${chatBody}\n${voiceBody}\n        </section>\n      </div>\n\n      {/* DISCUSSION MODAL THREAD */}`
  );
}

// 7. Modals
const chatModalRegex = /{\/\* MODAL 2: LIVE CHAT TRANSCRIPT \*\/}[\s\S]*?{\/\* MODAL 3: VOICE LOG TRANSCRIPT \*\/}/;
const voiceModalRegex = /{\/\* MODAL 3: VOICE LOG TRANSCRIPT \*\/}[\s\S]*?{\/\* MODAL: CREATE CUSTOM TICKET \*\/}/;

const chatModal = agentCode.match(chatModalRegex)?.[0] || '';
let voiceModal = agentCode.match(voiceModalRegex)?.[0] || '';
voiceModal = voiceModal.replace('{/* MODAL: CREATE CUSTOM TICKET */}', ''); // Strip marker

if (!adminCode.includes('MODAL 2: LIVE CHAT TRANSCRIPT')) {
  adminCode = adminCode.replace(
    /{\/\* MODAL: CREATE CUSTOM TICKET \*\//,
    `${chatModal}\n${voiceModal}\n      {/* MODAL: CREATE CUSTOM TICKET */}`
  );
}

fs.writeFileSync('src/app/admin/page.tsx', adminCode);
console.log("Migration script complete");
