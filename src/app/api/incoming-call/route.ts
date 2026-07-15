import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fromNumber = formData.get('From')?.toString() || 'Unknown';
    const callSid = formData.get('CallSid')?.toString() || '';

    console.log(`Incoming call from: ${fromNumber}, CallSid: ${callSid}`);

    // Log the call in our database
    try {
      // @ts-ignore
      if (postgresPrisma.callLog) {
        // @ts-ignore
        await postgresPrisma.callLog.create({
          data: {
            callerNumber: fromNumber,
            // Twilio doesn't give duration immediately, we can update it later or just store 0
            duration: 0,
            transcript: "Call in progress with ElevenLabs AI...",
          }
        });
      }
    } catch (dbErr) {
      console.warn("Failed to create CallLog in DB:", dbErr);
    }

    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

    // Return TwiML to connect the call to ElevenLabs WebSocket
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}">
    </Stream>
  </Connect>
</Response>`;

    return new NextResponse(twiml, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

  } catch (error) {
    console.error('Error handling incoming call:', error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, an error occurred.</Say></Response>`,
      { headers: { 'Content-Type': 'text/xml' } }
    );
  }
}
