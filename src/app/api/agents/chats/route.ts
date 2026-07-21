import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function GET(req: NextRequest) {
  try {
    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    // Find all chat sessions
    const sessions = await postgresPrisma.chatWidgetSession.findMany({
      take: 100,
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    const formattedChats = sessions.map(s => ({
      id: s.sessionKey,
      title: `Chat Session: ${s.sessionKey}`,
      status: s.status === 'ACTIVE' ? 'Active' : 'Closed',
      customerName: s.customerName,
      customerEmail: s.customerEmail,
      updatedAt: s.updatedAt.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      messages: s.messages.map(m => ({
        sender: m.senderType === 'USER' ? 'user' : m.senderType === 'AGENT' ? 'agent' : 'system',
        text: m.text,
        time: m.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    }));

    return NextResponse.json(formattedChats);
  } catch (error) {
    console.error('Error fetching all chats:', error);
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
  }
}
