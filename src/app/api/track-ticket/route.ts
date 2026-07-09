import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';
import crypto from 'crypto';

function generateMagicToken(ticketId: number, email: string) {
  const secret = process.env.UPLOADTHING_TOKEN || 'ticket-it-secret-salt';
  return crypto.createHmac('sha256', secret)
               .update(`${ticketId}-${email.toLowerCase()}`)
               .digest('hex')
               .substring(0, 16);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get('id');
    const token = searchParams.get('token');

    if (!ticketId || !token) {
      return NextResponse.json({ error: 'Ticket ID and token are required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    const parsedId = parseInt(ticketId.replace('TK-', ''), 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Invalid Ticket ID format' }, { status: 400 });
    }

    const ticket = await postgresPrisma.supportTicket.findUnique({
      where: { id: parsedId },
      include: {
        customer: true,
        messages: {
          include: {
            sender: true
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Verify token
    const expectedToken = generateMagicToken(ticket.id, ticket.customer.email);
    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Access denied. Invalid tracking token.' }, { status: 403 });
    }

    // Format response matching dashboard schema
    const formattedTicket = {
      id: `TK-${ticket.id}`,
      firstName: ticket.customer.name.split(' ')[0] || 'Client',
      lastName: ticket.customer.name.split(' ').slice(1).join(' ') || 'User',
      email: ticket.customer.email,
      category: ticket.title,
      description: ticket.description,
      status: ticket.status === 'IN_PROGRESS' ? 'In Progress' : ticket.status === 'RESOLVED' ? 'Resolved' : 'Open',
      type: 'Form',
      attachmentUrl: ticket.attachmentUrl,
      attachmentName: ticket.attachmentName,
      createdAt: ticket.createdAt.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      replies: ticket.messages.map(m => ({
        sender: m.sender.role === 'CUSTOMER' ? 'customer' : 'agent',
        text: m.text,
        attachmentUrl: m.attachmentUrl,
        attachmentName: m.attachmentName,
        time: m.createdAt.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }))
    };

    return NextResponse.json(formattedTicket);
  } catch (error) {
    console.error('Error tracking ticket:', error);
    return NextResponse.json({ error: 'Failed to retrieve ticket' }, { status: 500 });
  }
}
