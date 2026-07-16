async function testPost() {
  const apiKey = "sk_5005bf3b0d6d035ba6af8ed141a41eafb75268b5980d0ccb";
  const agentId = "agent_6101kxjmws31fb0vy9v6zp2xa5nk";
  
  const payload = {
    conversation_initiation_client_data: {
      conversation_config_override: {
        agent: {
          prompt: {
            prompt: "Test overrides"
          }
        }
      }
    }
  };

  const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    console.error("Failed:", await response.text());
  } else {
    const data = await response.json();
    console.log("Success Signed URL:", data.signed_url);
  }
}

testPost();
