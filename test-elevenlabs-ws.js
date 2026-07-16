const WebSocket = require('ws');

async function testWS() {
  const apiKey = "sk_5005bf3b0d6d035ba6af8ed141a41eafb75268b5980d0ccb";
  const agentId = "agent_6101kxjmws31fb0vy9v6zp2xa5nk";
  
  // 1. Get signed URL
  const res = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`, {
    headers: { 'xi-api-key': apiKey }
  });
  
  if (!res.ok) {
    console.error("Failed to get signed URL:", await res.text());
    return;
  }
  
  const data = await res.json();
  const signedUrl = data.signed_url;
  console.log("Got Signed URL");
  
  // 2. Connect via WS
  const ws = new WebSocket(signedUrl);
  
  ws.on('open', () => {
    console.log("WebSocket connected!");
  });
  
  ws.on('message', (data) => {
    console.log("Received:", data.toString());
  });
  
  ws.on('close', (code, reason) => {
    console.log(`WebSocket closed: Code ${code}, Reason: ${reason}`);
    process.exit(0);
  });
  
  ws.on('error', (err) => {
    console.error("WebSocket error:", err);
  });
}

testWS();
