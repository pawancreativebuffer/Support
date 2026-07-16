const http = require('http');

async function testWebhooks() {
  console.log("1. Simulating Incoming Call from +1234567890...");
  
  const incomingData = new URLSearchParams();
  incomingData.append('From', '+1234567890');

  try {
    const res1 = await fetch('http://localhost:3000/api/incoming-call', {
      method: 'POST',
      body: incomingData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    console.log("Incoming call simulated. Status:", res1.status);
    
    console.log("Waiting 3 seconds to simulate conversation time...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log("2. Simulating Call Status (Call ended with 45s duration)...");
    const statusData = new URLSearchParams();
    statusData.append('From', '+1234567890');
    statusData.append('CallDuration', '45');
    statusData.append('CallStatus', 'completed');
    
    const res2 = await fetch('http://localhost:3000/api/call-status', {
      method: 'POST',
      body: statusData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    console.log("Call status webhook sent. Status:", res2.status);
    
    console.log("Test finished! Check your Admin Dashboard.");
  } catch (err) {
    console.error("Error during test:", err);
  }
}

testWebhooks();
