import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    // Find PortalUser by email
    const portalUser = await postgresPrisma.portalUser.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    if (!portalUser) {
      return NextResponse.json([]);
    }

    // Fetch voice logs for this customer
    const voiceLogs = await postgresPrisma.voiceSessionLog.findMany({
      where: {
        customerId: portalUser.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedLogs = voiceLogs.map(v => ({
      id: v.conversationId,
      title: `Voice Session: ${v.conversationId.slice(0, 10)}...`,
      status: 'Completed',
      createdAt: v.createdAt.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      duration: v.duration ? `${v.duration}s` : 'Unknown',
      transcript: v.transcript || 'No transcript text logged.',
      confidence: '98%', // Mock confidence value
      audioUrl: v.audioUrl || null
    }));

    return NextResponse.json(formattedLogs);
  } catch (error) {
    console.error('Error fetching voice logs:', error);
    return NextResponse.json({ error: 'Failed to fetch voice logs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { conversationId, customerEmail, transcript, audioUrl, duration } = await req.json();

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    let customerId: number | null = null;
    if (customerEmail) {
      const portalUser = await postgresPrisma.portalUser.findUnique({
        where: { email: customerEmail.trim().toLowerCase() }
      });
      if (portalUser) {
        customerId = portalUser.id;
      }
    }

    // Upsert the voice session log
    const log = await postgresPrisma.voiceSessionLog.upsert({
      where: { conversationId },
      update: {
        transcript,
        audioUrl: audioUrl || null,
        duration: duration || null,
        customerId
      },
      create: {
        conversationId,
        transcript,
        audioUrl: audioUrl || null,
        duration: duration || null,
        customerId
      }
    });

    return NextResponse.json({ success: true, logId: log.id });
  } catch (error) {
    console.error('Error saving voice log:', error);
    return NextResponse.json({ error: 'Failed to save voice log' }, { status: 500 });
  }
}
