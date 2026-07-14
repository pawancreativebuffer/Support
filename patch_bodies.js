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

if (!chatsBody || !voiceBody) {
  console.log("Failed to extract chat and voice bodies");
  process.exit(1);
}

chatsBody = chatsBody.replace(/{\/\* TAB 4: VOICE LOGS \*\//g, '');
voiceBody = voiceBody.replace(/<\/section>/g, '');

// Modify titles for agent view
chatsBody = chatsBody.replace(
  /{selectedChat\.title}/g,
  `{selectedChat.customerName ? \`Chat with \${selectedChat.customerName}\` : selectedChat.customerEmail ? \`Chat with \${selectedChat.customerEmail}\` : 'Chat with Guest User'}`
);

if (!agentCode.includes('TAB 3: LIVE CHATS')) {
  const targetRegex = /<\/section>\s*<\/div>\s*{\/\* DISCUSSION MODAL THREAD \*\//;
  
  if (targetRegex.test(agentCode)) {
    agentCode = agentCode.replace(
      targetRegex,
      `${chatsBody}\n${voiceBody}\n        </section>\n      </div>\n\n      {/* DISCUSSION MODAL THREAD */}`
    );
    fs.writeFileSync('src/app/agent/page.tsx', agentCode);
    console.log("Successfully injected chat and voice tab bodies.");
  } else {
    console.log("Regex for injecting tab bodies failed.");
  }
} else {
  console.log("Tabs already injected.");
}
