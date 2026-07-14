const fs = require('fs');

const agentCode = fs.readFileSync('src/app/agent/page.tsx', 'utf8');
let adminCode = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// 1. Imports
adminCode = adminCode.replace(
  /Lock\n} from 'lucide-react';/,
  `Lock,\n  MessageCircle, Mic, Play, Volume2, VolumeX, Calendar\n} from 'lucide-react';`
);

// 2. Interfaces
const chatInterfaceMatch = agentCode.match(/interface ChatItem {[\s\S]*?}[\r\n]+/);
const voiceInterfaceMatch = agentCode.match(/interface VoiceLogItem {[\s\S]*?}[\r\n]+/);
// parseVoiceTranscript is tricky, let's extract it properly
const parseVoiceStart = agentCode.indexOf('const parseVoiceTranscript =');
const parseVoiceEnd = agentCode.indexOf('export default function AgentPage() {');
const parseVoice = agentCode.substring(parseVoiceStart, parseVoiceEnd);

adminCode = adminCode.replace(
  /interface TicketItem {/,
  `${chatInterfaceMatch[0]}\n${voiceInterfaceMatch[0]}\n${parseVoice}\ninterface TicketItem {`
);

// 3. States
adminCode = adminCode.replace(
  /const \[activeTab, setActiveTab\] = useState.*?;/,
  `const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'chats' | 'voice'>('overview');
  
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [chatsPage, setChatsPage] = useState(1);
  const chatsPerPage = 6;
  
  const [voiceLogs, setVoiceLogs] = useState<VoiceLogItem[]>([]);
  const [voicePage, setVoicePage] = useState(1);
  const voicePerPage = 6;
  
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [selectedVoiceLog, setSelectedVoiceLog] = useState<VoiceLogItem | null>(null);
  const [audioPlaybackError, setAudioPlaybackError] = useState(false);`
);

// 4. API Calls
adminCode = adminCode.replace(
  /setTickets\(freshTickets\);/,
  `setTickets(freshTickets);
        
        try {
          const chatsRes = await fetch('/api/agents/chats');
          if (chatsRes.ok) {
            const data = await chatsRes.json();
            setChats(data);
          }
        } catch (e) { console.error(e) }

        try {
          const voiceRes = await fetch('/api/agents/voice-logs');
          if (voiceRes.ok) {
            const data = await voiceRes.json();
            setVoiceLogs(data);
          }
        } catch (e) { console.error(e) }`
);

// 5. Tab Switcher
// Replace grid columns
adminCode = adminCode.replace(
  /grid-cols-1 sm:grid-cols-2 gap-3 w-full md:max-w-xl/,
  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full'
);

const agentTabsStart = agentCode.indexOf(`<button\n              onClick={() => setActiveTab('chats')}`);
const agentTabsEnd = agentCode.indexOf(`</button>\n          </div>\n\n        </section>`) + 9;
const agentTabs = agentCode.substring(agentTabsStart, agentTabsEnd);

adminCode = adminCode.replace(
  /<\/div>\s*<\/section>\s*{\/\* Tab contents \*\//,
  `\n            ${agentTabs}\n          </div>\n        </section>\n\n        {/* Tab contents */}`
);

// 6. Tab Content (Bodies)
const chatBodyStart = agentCode.indexOf('{/* TAB 3: LIVE CHATS */}');
const chatBodyEnd = agentCode.indexOf('</section>\n      </div>\n\n      {/* DISCUSSION MODAL THREAD */}');
const contentBodies = agentCode.substring(chatBodyStart, chatBodyEnd);

adminCode = adminCode.replace(
  /<\/section>\s*<\/div>\s*{\/\* DISCUSSION MODAL THREAD \*\//,
  `\n          ${contentBodies}\n        </section>\n      </div>\n\n      {/* DISCUSSION MODAL THREAD */}`
);

// 7. Modals
const modalsStart = agentCode.indexOf('{/* MODAL 2: LIVE CHAT TRANSCRIPT */}');
const modalsEnd = agentCode.indexOf('{/* MODAL: CREATE CUSTOM TICKET */}');
const modals = agentCode.substring(modalsStart, modalsEnd);

adminCode = adminCode.replace(
  /{\/\* MODAL: CREATE CUSTOM TICKET \*\//,
  `${modals}\n      {/* MODAL: CREATE CUSTOM TICKET */}`
);

fs.writeFileSync('src/app/admin/page.tsx', adminCode);
console.log('Patch 2 applied successfully');
