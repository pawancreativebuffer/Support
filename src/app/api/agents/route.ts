import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';
import bcrypt from 'bcryptjs';

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

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, login, password } = await req.json();

    if (!email || !password || !login) {
      return NextResponse.json({ error: 'Email, Login ID, and Password are required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    // Check if email or login already exists
    const existingUser = await postgresPrisma.portalUser.findFirst({
      where: {
        OR: [
          { email: email },
          { login: login }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email or login ID already exists' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newAgent = await postgresPrisma.portalUser.create({
      data: {
        firstName: firstName || null,
        lastName: lastName || null,
        email: email,
        login: login,
        passwordHash: passwordHash,
        role: 'AGENT',
        isActive: true
      }
    });

    return NextResponse.json({ message: 'Agent created successfully', agent: { id: newAgent.id, email: newAgent.email } });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
