const fs = require('fs');
const agent = fs.readFileSync('src/app/agent/page.tsx', 'utf8');
let admin = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// Get Interfaces & Helper
const agentLines = agent.split('\n');
const parseStart = agentLines.findIndex(l => l.includes('interface ChatItem {'));
const parseEnd = agentLines.findIndex(l => l.includes('interface TicketItem {'));
const agentInterfaces = agentLines.slice(parseStart, parseEnd).join('\n');

// Get State Variables
const stateStart = agentLines.findIndex(l => l.includes(`const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'chats' | 'voice'>('overview');`));
const stateEnd = agentLines.findIndex(l => l.includes(`const [ticketFilter, setTicketFilter] = useState`));
const agentStates = agentLines.slice(stateStart, stateEnd).join('\n');

// Get API Fetch Blocks
const apiStart = agentLines.findIndex(l => l.includes(`const chatsRes = await fetch('/api/agents/chats');`));
const apiEnd = agentLines.findIndex(l => l.includes(`// Update selected modal state if open`));
const agentApis = agentLines.slice(apiStart, apiEnd).join('\n');

// Get Tab Switcher Buttons
const tabSwitcherStart = agentLines.findIndex(l => l.includes(`onClick={() => setActiveTab('chats')}`));
const tabSwitcherEnd = agentLines.findIndex(l => l.includes(`{/* Tab contents */}`));
const tabSwitcherBtns = agentLines.slice(tabSwitcherStart - 2, tabSwitcherEnd - 2).join('\n');

// Get Main Tab Contents (Live Chats + Voice AI)
const contentStart = agentLines.findIndex(l => l.includes(`{/* TAB 3: LIVE CHATS */}`));
const contentEnd = agentLines.findIndex(l => l.includes(`{/* DISCUSSION MODAL THREAD */}`));
const agentContents = agentLines.slice(contentStart, contentEnd - 2).join('\n');

// Get Modals (Live Chat Transcript + Voice Log Transcript)
const modalsStart = agentLines.findIndex(l => l.includes(`{/* MODAL 2: LIVE CHAT TRANSCRIPT */}`));
const modalsEnd = agentLines.findIndex(l => l.includes(`{/* MODAL: CREATE CUSTOM TICKET */}`));
const agentModals = agentLines.slice(modalsStart, modalsEnd).join('\n');


// --- APPLY PATCHES TO ADMIN ---
// 1. Interfaces
admin = admin.replace(
  'interface TicketItem {',
  agentInterfaces + 'interface TicketItem {'
);

// 2. State
admin = admin.replace(
  `const [activeTab, setActiveTab] = useState<'overview' | 'tickets'>('overview');\n\n  // Filters & Search`,
  agentStates + '  // Filters & Search'
);

// 3. API Fetch Blocks
admin = admin.replace(
  `// Update selected modal state if open`,
  agentApis + '// Update selected modal state if open'
);

// 4. Tab Switcher
admin = admin.replace(
  `grid-cols-1 sm:grid-cols-2 gap-3 w-full md:max-w-xl`,
  `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full`
);

admin = admin.replace(
  `              </div>\n            </button>\n          </div>\n\n        </section>\n\n        {/* Tab contents */}`,
  `              </div>\n            </button>\n` + tabSwitcherBtns + `        </section>\n\n        {/* Tab contents */}`
);

// 5. Main Tab Contents
admin = admin.replace(
  `            </div>\n          )}\n        </section>\n      </div>\n\n      {/* DISCUSSION MODAL THREAD */}`,
  `            </div>\n          )}\n\n` + agentContents + `        </section>\n      </div>\n\n      {/* DISCUSSION MODAL THREAD */}`
);

// 6. Modals
admin = admin.replace(
  `      {/* MODAL: CREATE CUSTOM TICKET */}`,
  agentModals + `      {/* MODAL: CREATE CUSTOM TICKET */}`
);

fs.writeFileSync('src/app/admin/page.tsx', admin);
console.log('Safe patch script executed.');
