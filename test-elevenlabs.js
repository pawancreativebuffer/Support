const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const agentId = env.match(/NEXT_PUBLIC_ELEVENLABS_AGENT_ID=\"([^\"]+)\"/)[1];
const apiKey = env.match(/ELEVENLABS_API_KEY=\"([^\"]+)\"/)[1];

console.log("Agent:", agentId);
console.log("Key starting with:", apiKey.substring(0, 8));

fetch('https://api.elevenlabs.io/v1/convai/conversations?agent_id=' + agentId, {
    headers: { 'xi-api-key': apiKey }
})
.then(r => r.json())
.then(async data => {
   if(data.conversations && data.conversations.length > 0) {
       console.log("Conversations found:", data.conversations.length);
       const convId = data.conversations[0].conversation_id;
       console.log("Fetching details for:", convId);
       
       const res = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${convId}`, {
           headers: { 'xi-api-key': apiKey }
       });
       const detail = await res.json();
       console.log("Detail status:", detail);
   } else {
       console.log("No conversations found!", data);
   }
})
.catch(e => console.error(e));
