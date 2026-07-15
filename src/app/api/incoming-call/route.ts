import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';
import { prisma as sqlServerPrisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fromNumber = formData.get('From')?.toString() || 'Unknown';
    const callSid = formData.get('CallSid')?.toString() || '';

    console.log(`Incoming call from: ${fromNumber}, CallSid: ${callSid}`);

    // Log the call in our Postgres database
    try {
      // @ts-ignore
      if (postgresPrisma.callLog) {
        // @ts-ignore
        await postgresPrisma.callLog.create({
          data: {
            callerNumber: fromNumber,
            duration: 0,
            transcript: "Call in progress with ElevenLabs AI...",
          }
        });
      }
    } catch (dbErr) {
      console.warn("Failed to create CallLog in DB:", dbErr);
    }

    // Try to find the user in SQL Server (Read-only database)
    let customerName = "Guest";
    let customerEmail = "guest@example.com";

    if (fromNumber !== 'Unknown') {
      try {
        // We will try an exact match or match the last 10 digits
        const last10 = fromNumber.length > 10 ? fromNumber.slice(-10) : fromNumber;

        // Find user by phone number
        const user = await sqlServerPrisma.users.findFirst({
          where: {
            Phone: {
              contains: last10
            },
            IsActive: true
          }
        });

        if (user) {
          customerName = user.FirstName || user.Login || "Customer";
          customerEmail = user.Email || "guest@example.com";
          console.log(`Caller identified: ${customerName} (${customerEmail})`);
        } else {
          console.log("Caller not found in SQL Server database, treating as Guest.");
        }
      } catch (lookupErr) {
        console.error("Error looking up caller in SQL Server:", lookupErr);
      }
    }

    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

    // Return TwiML to connect the call to ElevenLabs WebSocket
    // Adding <Parameter> passes dynamic context variables to ElevenLabs!
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}">
      <Parameter name="customerName" value="${customerName}" />
      <Parameter name="customerEmail" value="${customerEmail}" />
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
