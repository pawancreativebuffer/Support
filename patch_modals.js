const fs = require('fs');

let dashboardCode = fs.readFileSync('src/app/dashboard/page.tsx', 'utf-8');
let agentCode = fs.readFileSync('src/app/agent/page.tsx', 'utf-8');

const getSection = (startMarker, endMarker) => {
  const startIdx = dashboardCode.indexOf(startMarker);
  const endIdx = dashboardCode.indexOf(endMarker, startIdx);
  if (startIdx === -1 || endIdx === -1) return null;
  return dashboardCode.slice(startIdx, endIdx);
};

let chatModal = getSection('{/* MODAL 2: LIVE CHAT TRANSCRIPT */}', '{/* MODAL 3: VOICE LOG TRANSCRIPT */}');
let voiceModal = getSection('{/* MODAL 3: VOICE LOG TRANSCRIPT */}', '{/* Toast Notification Card Container */}');

if (!chatModal || !voiceModal) {
  console.log("Failed to match modal sections from dashboard code.");
  process.exit(1);
}

chatModal = chatModal.replace(
  /{selectedChat\.title}/g,
  `{selectedChat.customerName ? \`Chat with \${selectedChat.customerName}\` : selectedChat.customerEmail ? \`Chat with \${selectedChat.customerEmail}\` : 'Chat with Guest User'}`
);

voiceModal = voiceModal.replace(
  /Session ID: {selectedVoiceLog\.id}/g,
  `{selectedVoiceLog.customerName ? \`Customer: \${selectedVoiceLog.customerName}\` : selectedVoiceLog.customerEmail ? \`Customer: \${selectedVoiceLog.customerEmail}\` : 'Guest User'} • ID: {selectedVoiceLog.id.slice(0, 8)}`
);

if (!agentCode.includes('MODAL 2: LIVE CHAT TRANSCRIPT')) {
  const targetRegex = /{\/\* MODAL: CREATE CUSTOM TICKET \*\//;
  
  if (targetRegex.test(agentCode)) {
    agentCode = agentCode.replace(
      targetRegex,
      `${chatModal}\n${voiceModal}\n\n      {/* MODAL: CREATE CUSTOM TICKET */}`
    );
    fs.writeFileSync('src/app/agent/page.tsx', agentCode);
    console.log("Successfully injected modals.");
  } else {
    console.log("Regex for injecting modals failed.");
  }
} else {
  console.log("Modals already injected.");
}
