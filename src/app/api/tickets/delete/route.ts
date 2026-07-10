import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function POST(req: NextRequest) {
  try {
    const { ticketIds } = await req.json();

    if (!ticketIds || !Array.isArray(ticketIds) || ticketIds.length === 0) {
      return NextResponse.json({ error: 'Ticket IDs array is required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    const parsedIds = ticketIds
      .map((id: string) => parseInt(id.replace('TK-', ''), 10))
      .filter((id: number) => !isNaN(id));

    if (parsedIds.length === 0) {
      return NextResponse.json({ error: 'No valid Ticket IDs provided' }, { status: 400 });
    }

    // Delete related messages first (foreign key constraint)
    await postgresPrisma.ticketMessage.deleteMany({
      where: { ticketId: { in: parsedIds } }
    });

    // Delete the tickets
    const result = await postgresPrisma.supportTicket.deleteMany({
      where: { id: { in: parsedIds } }
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (err) {
    console.error('Error deleting tickets:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
