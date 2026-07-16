import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { login, password } = await req.json();
    if (!login || !password) {
      return NextResponse.json({ error: 'Username / Login and Password are required' }, { status: 400 });
    }

    const trimmedLogin = login.trim();

    if (!postgresPrisma) {
      return NextResponse.json({
        error: 'PostgreSQL database connection is not active'
      }, { status: 500 });
    }

    const portalUser = await postgresPrisma.portalUser.findFirst({
      where: {
        OR: [
          { email: { equals: trimmedLogin, mode: 'insensitive' } },
          { login: { equals: trimmedLogin, mode: 'insensitive' } }
        ],
        role: 'AGENT'
      }
    });

    if (!portalUser) {
      return NextResponse.json({
        error: `Agent Login ID or Email '${login}' not found. Please check your credentials.`
      }, { status: 404 });
    }

    if (!portalUser.isActive) {
      return NextResponse.json({
        error: 'This agent account is currently deactivated.'
      }, { status: 403 });
    }

    let isPasswordValid = false;
    if (portalUser.passwordHash) {
      isPasswordValid = await bcrypt.compare(password, portalUser.passwordHash);
    }

    if (!isPasswordValid) {
      return NextResponse.json({
        error: 'Invalid password. Please check your credentials and try again.'
      }, { status: 401 });
    }

    const fullName = [portalUser.firstName, portalUser.lastName].filter(Boolean).join(' ') || 'Agent';

    return NextResponse.json({
      user: {
        id: portalUser.id,
        name: fullName,
        email: portalUser.email,
        role: 'Agent'
      }
    });
  } catch (error) {
    console.error("Agent Login API error:", error);
    return NextResponse.json({ error: "Failed to authenticate agent" }, { status: 500 });
  }
}
