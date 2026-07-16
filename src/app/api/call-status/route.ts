import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function POST(req: NextRequest) {
  try {
    if (!postgresPrisma) {
      console.error('PostgreSQL database connection is not active');
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    const formData = await req.formData();
    const fromNumber = formData.get('From')?.toString() || 'Unknown';
    const callDurationStr = formData.get('CallDuration')?.toString();
    const callStatus = formData.get('CallStatus')?.toString();
    const callDuration = callDurationStr ? parseInt(callDurationStr, 10) : 0;

    console.log(`Call Status Webhook received for ${fromNumber}. Status: ${callStatus}, Duration: ${callDuration}s`);

    if (fromNumber !== 'Unknown') {
      // Find the most recent call log for this number that was created recently (within last hour)
      const recentLog = await postgresPrisma.callLog.findFirst({
        where: {
          callerNumber: fromNumber,
          createdAt: {
            gte: new Date(Date.now() - 60 * 60 * 1000)
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      if (recentLog) {
        let transcript = "Call completed.";
        let audioUrl = null;

        // Fetch ElevenLabs conversations to get the actual transcript if duration is > 0
        if (callDuration > 0) {
          try {
            const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
            const elApiKey = process.env.ELEVENLABS_API_KEY;

            if (agentId && elApiKey) {
              // Fetch recent conversations for the agent
              const res = await fetch(`https://api.elevenlabs.io/v1/convai/conversations?agent_id=${agentId}`, {
                headers: { 'xi-api-key': elApiKey }
              });

              if (res.ok) {
                const data = await res.json();
                if (data.conversations && data.conversations.length > 0) {
                  // Grab the most recent conversation
                  const latestConv = data.conversations[0];
                  const convId = latestConv.conversation_id;

                  audioUrl = `/api/voice-audio?conversation_id=${convId}`;

                  // Fetch the conversation details (transcript)
                  const detailRes = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${convId}`, {
                    headers: { 'xi-api-key': elApiKey }
                  });

                  if (detailRes.ok) {
                    const detailData = await detailRes.json();
                    const transcriptData = detailData.transcript || [];
                    const formattedTranscript = transcriptData.map((m: any) => `${m.role === 'user' ? 'Customer' : 'Agent'}: ${m.message}`).join('\n');

                    if (formattedTranscript) {
                      transcript = formattedTranscript;
                    }
                  }
                }
              }
            }
          } catch (e) {
            console.error("Failed to fetch transcript from ElevenLabs", e);
            transcript = "Failed to fetch transcript from ElevenLabs.";
          }
        }

        await postgresPrisma.callLog.update({
          where: { id: recentLog.id },
          data: {
            duration: callDuration,
            transcript: transcript !== "Call completed." ? transcript : recentLog.transcript,
            audioUrl: audioUrl,
          }
        });

        console.log(`Updated CallLog ID ${recentLog.id} with duration ${callDuration}s and fetched transcript.`);
      } else {
        console.log(`No recent CallLog found for ${fromNumber} to update.`);
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error in call-status webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
