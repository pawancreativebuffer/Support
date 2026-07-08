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

    // Find chat sessions belonging to this user email
    const sessions = await postgresPrisma.chatWidgetSession.findMany({
      where: {
        customerEmail: email.trim().toLowerCase()
      },
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
      updatedAt: s.updatedAt.toLocaleString('en-US', {
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
    console.error('Error fetching chats:', error);
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { sessionKey, customerName, customerEmail, messageText, senderType, status } = await req.json();

    if (!sessionKey) {
      return NextResponse.json({ error: 'Session Key is required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    const emailClean = customerEmail ? customerEmail.trim().toLowerCase() : null;

    // 1. Find or create the session
    let session = await postgresPrisma.chatWidgetSession.findUnique({
      where: { sessionKey }
    });

    if (!session) {
      session = await postgresPrisma.chatWidgetSession.create({
        data: {
          sessionKey,
          customerName: customerName || null,
          customerEmail: emailClean,
          status: status === 'Closed' ? 'CLOSED' : 'ACTIVE'
        }
      });
    } else {
      // Update session details if provided
      const updateData: any = {};
      if (customerName) updateData.customerName = customerName;
      if (emailClean) updateData.customerEmail = emailClean;
      if (status) updateData.status = status === 'Closed' ? 'CLOSED' : 'ACTIVE';
      
      session = await postgresPrisma.chatWidgetSession.update({
        where: { sessionKey },
        data: updateData
      });
    }

    // 2. Add message if provided
    if (messageText && senderType) {
      let mappedSenderType: 'USER' | 'AGENT' | 'SYSTEM' = 'SYSTEM';
      if (senderType === 'user') mappedSenderType = 'USER';
      if (senderType === 'agent') mappedSenderType = 'AGENT';
      if (senderType === 'system') mappedSenderType = 'SYSTEM';

      await postgresPrisma.chatWidgetMessage.create({
        data: {
          sessionId: session.id,
          senderType: mappedSenderType,
          text: messageText
        }
      });

      // Update session's updatedAt timestamp
      await postgresPrisma.chatWidgetSession.update({
        where: { id: session.id },
        data: { updatedAt: new Date() }
      });
    }

    return NextResponse.json({ success: true, sessionKey: session.sessionKey });
  } catch (error) {
    console.error('Error syncing chat:', error);
    return NextResponse.json({ error: 'Failed to sync chat session' }, { status: 500 });
  }
}
