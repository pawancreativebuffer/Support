const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const agentId = env.match(/NEXT_PUBLIC_ELEVENLABS_AGENT_ID="([^"]+)"/)[1];
const apiKey = env.match(/ELEVENLABS_API_KEY="([^"]+)"/)[1];

fetch('https://api.elevenlabs.io/v1/convai/conversations?agent_id=' + agentId, {
    headers: { 'xi-api-key': apiKey }
})
.then(r => r.json())
.then(async data => {
   if(data.conversations && data.conversations.length > 0) {
       const convId = data.conversations[0].conversation_id;
       console.log('Using conv:', convId);
       
       const res = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${convId}`, {
           headers: { 'xi-api-key': apiKey }
       });
       const detail = await res.json();
       console.log('Transcript length:', detail.transcript ? detail.transcript.length : 0);
       if(detail.transcript && detail.transcript.length > 0) {
           console.log('Sample item:', detail.transcript[0]);
           console.log('Sample item 2:', detail.transcript[1]);
       } else {
           console.log(detail);
       }
   }
})
.catch(e => console.error(e));
