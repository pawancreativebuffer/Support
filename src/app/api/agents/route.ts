import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function GET(req: NextRequest) {
  try {
    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    const agents = await postgresPrisma.portalUser.findMany({
      where: {
        role: {
          in: ['AGENT']
        },
        isActive: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      },
      orderBy: {
        firstName: 'asc'
      }
    });

    const mappedAgents = agents.map(a => ({
      ...a,
      name: [a.firstName, a.lastName].filter(Boolean).join(' ') || 'Agent'
    }));

    return NextResponse.json(mappedAgents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}
