import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get('agent_id') || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ signedUrl: null, message: 'ELEVENLABS_API_KEY is not set in environment variables.' });
    }

    console.log(`Generating ElevenLabs signed URL for agent ${agentId}...`);
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`, {
      method: 'GET',
      headers: {
        'xi-api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs signed URL error response:', errorText);
      return NextResponse.json({ signedUrl: null, message: `ElevenLabs API error: ${response.statusText}` });
    }

    const data = await response.json();
    return NextResponse.json({ signedUrl: data.signed_url });
  } catch (error: any) {
    console.error('Error generating ElevenLabs signed URL:', error);
    return NextResponse.json({ signedUrl: null, message: error?.message || 'Internal server error' });
  }
}
