import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function POST(req: NextRequest) {
  try {
    const { ticketId, ticketIds, priority, status, agentId } = await req.json();

    if (!ticketId && (!ticketIds || !Array.isArray(ticketIds))) {
      return NextResponse.json({ error: 'Ticket ID or Ticket IDs array is required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
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
      if (dbStatus === 'WITH CLIENT') dbStatus = 'WITH_CLIENT';
      if (dbStatus === 'ON HOLD') dbStatus = 'ON_HOLD';
      if (!['OPEN', 'WITH_CLIENT', 'ON_HOLD', 'ESCALATED', 'RESOLVED', 'CLOSED'].includes(dbStatus)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
      }
      updateData.status = dbStatus;
    }

    if (agentId !== undefined) {
      updateData.agentId = agentId === null || agentId === 'null' || agentId === '' ? null : Number(agentId);
    }

    if (ticketIds && Array.isArray(ticketIds)) {
      const parsedIds = ticketIds.map(id => parseInt(id.replace('TK-', ''), 10)).filter(id => !isNaN(id));
      if (parsedIds.length === 0) {
        return NextResponse.json({ error: 'No valid Ticket IDs provided' }, { status: 400 });
      }

      await postgresPrisma.supportTicket.updateMany({
        where: { id: { in: parsedIds } },
        data: updateData
      });

      return NextResponse.json({ success: true, count: parsedIds.length });
    } else {
      const parsedId = parseInt(ticketId.replace('TK-', ''), 10);
      if (isNaN(parsedId)) {
        return NextResponse.json({ error: 'Invalid Ticket ID format' }, { status: 400 });
      }

      const updatedTicket = await postgresPrisma.supportTicket.update({
        where: { id: parsedId },
        data: updateData,
        include: { customer: true }
      });

      return NextResponse.json({ success: true, ticket: updatedTicket });
    }
  } catch (err) {
    console.error('Error updating ticket:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
