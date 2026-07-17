import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function GET(req: NextRequest) {
  try {
    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    // Fetch all voice logs
    const voiceLogs = await postgresPrisma.voiceSessionLog.findMany({
      take: 100,
      include: {
        customer: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedLogs = voiceLogs.map(v => ({
      id: v.conversationId,
      title: `Voice Session: ${v.conversationId.slice(0, 10)}...`,
      status: 'Completed',
      customerName: v.customer ? v.customer.name : null,
      customerEmail: v.customer ? v.customer.email : null,
      createdAt: v.createdAt.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      duration: v.duration ? `${v.duration}s` : 'Unknown',
      transcript: v.transcript || 'No transcript text logged.',
      confidence: '98%',
      audioUrl: v.audioUrl || null
    }));

    return NextResponse.json(formattedLogs);
  } catch (error) {
    console.error('Error fetching all voice logs:', error);
    return NextResponse.json({ error: 'Failed to fetch voice logs' }, { status: 500 });
  }
}
