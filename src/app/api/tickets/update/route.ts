import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function POST(req: NextRequest) {
  try {
    const { ticketId, priority, status } = await req.json();

    if (!ticketId) {
      return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    const parsedId = parseInt(ticketId.replace('TK-', ''), 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Invalid Ticket ID format' }, { status: 400 });
    }

    const updateData: any = {};
    if (priority) {
      const upperPriority = priority.toUpperCase();
      if (!['LOW', 'MEDIUM', 'HIGH'].includes(upperPriority)) {
        return NextResponse.json({ error: 'Invalid priority value' }, { status: 400 });
      }
      updateData.priority = upperPriority;
    }

    if (status) {
      let dbStatus = status.toUpperCase();
      if (dbStatus === 'IN PROGRESS') dbStatus = 'IN_PROGRESS';
      if (!['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(dbStatus)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
      }
      updateData.status = dbStatus;
    }

    const updatedTicket = await postgresPrisma.supportTicket.update({
      where: { id: parsedId },
      data: updateData,
      include: { customer: true }
    });

    return NextResponse.json({ success: true, ticket: updatedTicket });
  } catch (err) {
    console.error('Error updating ticket:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
