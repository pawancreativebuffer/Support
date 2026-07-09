import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function POST(req: NextRequest) {
  try {
    const { ticketId, senderEmail, text, action } = await req.json();

    if (!ticketId) {
      return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    // Parse the ticket ID number from "TK-XXXX"
    const parsedId = parseInt(ticketId.replace('TK-', ''), 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Invalid Ticket ID format' }, { status: 400 });
    }

    // Find the ticket
    const ticket = await postgresPrisma.supportTicket.findUnique({
      where: { id: parsedId },
      include: { customer: true }
    });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Action 1: Mark as resolved
    if (action === 'resolve') {
      await postgresPrisma.supportTicket.update({
        where: { id: parsedId },
        data: { status: 'RESOLVED' }
      });

      // Insert system message
      await postgresPrisma.ticketMessage.create({
        data: {
          ticketId: parsedId,
          senderId: ticket.customerId, // Sender is customer
          text: 'Ticket has been marked as resolved by the customer.',
          isSystem: true
        }
      });

      return NextResponse.json({ success: true, status: 'RESOLVED' });
    }

    // Action 2: Add reply message
    if (!text || !senderEmail) {
      return NextResponse.json({ error: 'Sender email and message text are required' }, { status: 400 });
    }

    // Find the sender (PortalUser)
    const sender = await postgresPrisma.portalUser.findUnique({
      where: { email: senderEmail.trim().toLowerCase() }
    });

    if (!sender) {
      return NextResponse.json({ error: 'Sender account not found in portal database' }, { status: 404 });
    }

    // Save the user's message in PostgreSQL
    const userMessage = await postgresPrisma.ticketMessage.create({
      data: {
        ticketId: parsedId,
        senderId: sender.id,
        text: text,
        isSystem: false
      }
    });

    // Update ticket status back to OPEN or IN_PROGRESS when customer replies
    if (ticket.status === 'RESOLVED') {
      await postgresPrisma.supportTicket.update({
        where: { id: parsedId },
        data: { status: 'OPEN' }
      });
    }

    return NextResponse.json({ success: true, message: userMessage });
  } catch (error) {
    console.error('Error replying to ticket:', error);
    return NextResponse.json({ error: 'Failed to add ticket reply' }, { status: 500 });
  }
}
