import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';
import { prisma as sqlServerPrisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let fromNumber = 'Unknown';
    let callSid = '';
    let isElevenLabsWebhook = false;

    // Handle ElevenLabs Client Data Webhook (JSON)
    if (contentType.includes('application/json')) {
      isElevenLabsWebhook = true;
      const body = await req.json();
      fromNumber = body.caller_id || 'Unknown';
      callSid = body.call_sid || '';
    }
    // Handle Twilio Native TwiML Webhook (FormData)
    else {
      const formData = await req.formData();
      fromNumber = formData.get('From')?.toString() || 'Unknown';
      callSid = formData.get('CallSid')?.toString() || '';
    }

    console.log(`Incoming call from: ${fromNumber}, CallSid: ${callSid} (IsElevenLabs: ${isElevenLabsWebhook})`);

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
    let customerId = "0";
    let customerName = "Guest";
    let customerEmail = "guest@example.com";
    let batchCount = 0;

    if (fromNumber !== 'Unknown') {
      try {
        const last10 = fromNumber.length > 10 ? fromNumber.slice(-10) : fromNumber;
        const user = await sqlServerPrisma.users.findFirst({
          where: { Phone: { contains: last10 }, IsActive: true }
        });

        if (user) {
          customerId = user.Id.toString();
          customerName = user.FirstName || user.Login || "Customer";
          customerEmail = user.Email || "guest@example.com";
          
          // Fetch the number of batches for this user
          batchCount = await sqlServerPrisma.batches.count({
            where: { UserId: user.Id }
          });
          
          console.log(`Caller identified: ${customerName} (ID: ${customerId}), Batches: ${batchCount}`);
        } else {
          console.log("Caller not found in SQL Server database, treating as Guest.");
        }
      } catch (lookupErr) {
        console.error("Error looking up caller in SQL Server:", lookupErr);
      }
    }

    // If request came from ElevenLabs Telephony Webhook, return JSON
    if (isElevenLabsWebhook) {
      return NextResponse.json({
        dynamic_variables: {
          userId: customerId,
          customerName: customerName,
          customerEmail: customerEmail,
          batchCount: batchCount.toString()
        }
      });
    }

    // Otherwise, return TwiML for Twilio
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}">
      <Parameter name="customerId_db" value="${customerId}" />
      <Parameter name="customerName" value="${customerName}" />
    </Stream>
  </Connect>
</Response>`;

    return new NextResponse(twiml, {
      headers: { 'Content-Type': 'text/xml' },
    });

  } catch (error) {
    console.error('Error handling incoming call:', error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, an error occurred.</Say></Response>`,
      { headers: { 'Content-Type': 'text/xml' } }
    );
  }
}
