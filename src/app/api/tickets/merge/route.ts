import { NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function POST(request: Request) {
  try {
    const { primaryTicketId, secondaryTicketIds } = await request.json();

    if (!primaryTicketId || !secondaryTicketIds || !Array.isArray(secondaryTicketIds) || secondaryTicketIds.length === 0) {
      return NextResponse.json({ error: 'Primary ticket ID and secondary ticket IDs are required.' }, { status: 400 });
    }

    // Use transaction to merge all tickets
    const results = await postgresPrisma!.$transaction(async (tx) => {
      const mergedTickets = [];

      for (const secId of secondaryTicketIds) {
        if (secId === primaryTicketId) continue;

        // Fetch messages from secondary ticket
        const secondaryMessages = await tx.ticketMessage.findMany({
          where: { ticketId: Number(secId) }
        });

        // Copy messages to primary ticket
        if (secondaryMessages.length > 0) {
          await tx.ticketMessage.createMany({
            data: secondaryMessages.map(msg => ({
              ticketId: Number(primaryTicketId),
              senderId: msg.senderId,
              text: `[MERGED FROM TICKET #${secId}]: ${msg.text}`,
              attachmentUrl: msg.attachmentUrl,
              attachmentName: msg.attachmentName,
              isSystem: msg.isSystem,
              createdAt: msg.createdAt
            }))
          });
        }

        // Fetch primary ticket to get a valid senderId
        const primaryTicket = await tx.supportTicket.findUnique({
          where: { id: Number(primaryTicketId) }
        });

        const fallbackSenderId = primaryTicket ? primaryTicket.customerId : 1;

        // Add a system message in the primary ticket about the merge
        await tx.ticketMessage.create({
          data: {
            ticketId: Number(primaryTicketId),
            senderId: fallbackSenderId,
            text: `[SYSTEM]: Ticket #${secId} has been merged into this ticket.`,
            isSystem: true
          }
        });

        // Mark secondary ticket as MERGED and link it to primary
        const updatedSec = await tx.supportTicket.update({
          where: { id: Number(secId) },
          data: {
            status: 'MERGED',
            mergedIntoId: Number(primaryTicketId)
          }
        });

        mergedTickets.push(updatedSec);
      }

      return mergedTickets;
    });

    return NextResponse.json({ message: 'Tickets merged successfully', results });
  } catch (error) {
    console.error('Error merging tickets:', error);
    return NextResponse.json({ error: 'Failed to merge tickets' }, { status: 500 });
  }
}
