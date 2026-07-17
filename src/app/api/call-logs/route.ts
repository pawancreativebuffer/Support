import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function GET(req: NextRequest) {
  try {
    // @ts-ignore
    if (!postgresPrisma.callLog) {
      return NextResponse.json([]);
    }
    
    // @ts-ignore
    const logs = await postgresPrisma.callLog.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true
      }
    });
    
    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching call logs:', error);
    return NextResponse.json({ error: 'Failed to fetch call logs' }, { status: 500 });
  }
}
