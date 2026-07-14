const fs = require('fs');
const agent = fs.readFileSync('src/app/agent/page.tsx', 'utf8').split('\n');
let admin = fs.readFileSync('src/app/admin/page.tsx', 'utf8').split('\n');

// HELPER: find block between two line contents
const getBlock = (lines, startStr, endStr) => {
  const start = lines.findIndex(l => l.includes(startStr));
  const end = lines.findIndex(l => l.includes(endStr));
  if (start === -1 || end === -1) throw new Error(`Could not find ${startStr} or ${endStr}`);
  return lines.slice(start, end);
};

// 1. Fetch Calls
const fetchBlock = getBlock(agent, `const chatsRes = await fetch('/api/agents/chats');`, `// Update selected modal state if open`);
const adminFetchTarget = admin.findIndex(l => l.includes('// Update selected modal state if open'));
if (adminFetchTarget !== -1) {
    admin.splice(adminFetchTarget, 0, ...fetchBlock);
} else {
    console.log("Failed to find adminFetchTarget");
}

// 2. Tab Switcher
const tabSwitcherBlock = getBlock(agent, `onClick={() => setActiveTab('chats')}`, `{/* Tab contents */}`);
// We only want up to the closing div of the buttons
// Let's just manually construct the missing buttons to avoid any errors:
const tabButtons = `
            <button
              onClick={() => setActiveTab('chats')}
              className={\`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm \${activeTab === 'chats'
                ? 'bg-blue-600 border-blue-700 text-white shadow-md shadow-blue-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }\`}
            >
              <div className="flex items-center gap-3">
                <div className={\`w-9 h-9 rounded-xl flex items-center justify-center transition-all \${activeTab === 'chats' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}\`}>
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold">Live Chats</span>
                  <span className={\`block text-[10px] \${activeTab === 'chats' ? 'text-white/80' : 'text-slate-400 font-semibold'}\`}>Chat log sessions</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={\`text-xs font-bold px-2.5 py-1 rounded-lg border \${activeTab === 'chats'
                  ? 'bg-white/20 text-white border-white/10'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
                  }\`}>
                  {chats.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('voice')}
              className={\`flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm \${activeTab === 'voice'
                ? 'bg-slate-800 border-slate-900 text-white shadow-md shadow-slate-300'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }\`}
            >
              <div className="flex items-center gap-3">
                <div className={\`w-9 h-9 rounded-xl flex items-center justify-center transition-all \${activeTab === 'voice' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}\`}>
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold">Voice AI</span>
                  <span className={\`block text-[10px] \${activeTab === 'voice' ? 'text-white/80' : 'text-slate-400 font-semibold'}\`}>Voice transcript logs</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={\`text-xs font-bold px-2.5 py-1 rounded-lg border \${activeTab === 'voice'
                  ? 'bg-white/20 text-white border-white/10'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
                  }\`}>
                  {voiceLogs.length}
                </span>
              </div>
            </button>
`.split('\\n');

// Replace lg:grid-cols-4
const gridColsLine = admin.findIndex(l => l.includes('grid-cols-1 sm:grid-cols-2'));
if (gridColsLine !== -1) {
  admin[gridColsLine] = '          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">';
}

const buttonsTarget = admin.findIndex(l => l.includes('{/* Tab contents */}')) - 3;
if (buttonsTarget > 0) {
    admin.splice(buttonsTarget, 0, ...tabButtons);
}


// 3. Tab Contents
const contentsBlock = getBlock(agent, '{/* TAB 3: LIVE CHATS */}', '{/* DISCUSSION MODAL THREAD */}');
// Drop the last '</div>' and '</section>' if they belong to agent
const contentsTarget = admin.findIndex(l => l.includes('{/* DISCUSSION MODAL THREAD */}')) - 2;
if (contentsTarget > 0) {
    admin.splice(contentsTarget, 0, ...contentsBlock.slice(0, -2)); // remove last two lines from agent block since admin already has them
}


// 4. Modals
const modalsBlock = getBlock(agent, '{/* MODAL 2: LIVE CHAT TRANSCRIPT */}', '{/* MODAL: CREATE CUSTOM TICKET */}');
const modalsTarget = admin.findIndex(l => l.includes('{/* MODAL: CREATE CUSTOM TICKET */}'));
if (modalsTarget > 0) {
    admin.splice(modalsTarget, 0, ...modalsBlock);
}

fs.writeFileSync('src/app/admin/page.tsx', admin.join('\\n'));
console.log('Super patch completed.');
