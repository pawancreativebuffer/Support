import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { postgresPrisma } from '@/lib/postgresDb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { login, password } = await req.json();
    if (!login || !password) {
      return NextResponse.json({ error: 'Username / Login and Password are required' }, { status: 400 });
    }

    const trimmedLogin = login.trim();

    if (!prisma) {
      return NextResponse.json({
        error: 'SQL Server database connection is not active'
      }, { status: 500 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({
        error: 'PostgreSQL database connection is not active'
      }, { status: 500 });
    }

    // 1. Seed John Doe in SQL Server if he doesn't exist
    let sqlAgentUser = await prisma.users.findFirst({
      where: { Login: 'john.doe' }
    });

    if (!sqlAgentUser) {
      console.log('Seeding default agent john.doe into SQL Server database...');
      try {
        sqlAgentUser = await prisma.users.create({
          data: {
            Login: 'john.doe',
            Email: 'john.doe@ticket-it.com',
            FirstName: 'John',
            LastName: 'Doe',
            AddressLine1: '123 Support Lane',
            Phone: '123-456-7890',
            Client: 'Support Agent Client',
            RegionName: 'Global',
            IsActive: true,
            UserPassword: '' // Will fallback to dev password
          }
        });
      } catch (err) {
        console.error("Failed to seed john.doe in SQL Server:", err);
      }
    }

    // 2. Seed John Doe in PostgreSQL if he doesn't exist
    let pgAgentUser = await postgresPrisma.portalUser.findUnique({
      where: { email: 'john.doe@ticket-it.com' }
    });

    if (!pgAgentUser) {
      console.log('Seeding default agent john.doe into PostgreSQL database...');
      pgAgentUser = await postgresPrisma.portalUser.create({
        data: {
          email: 'john.doe@ticket-it.com',
          name: 'John Doe',
          passwordHash: '',
          role: 'AGENT',
          isActive: true
        }
      });
    }

    // 3. Look up SQL Server database for the matching Login ID
    let matchedUser = await prisma.users.findFirst({
      where: { Login: trimmedLogin }
    });

    if (!matchedUser) {
      return NextResponse.json({
        error: `Login ID '${login}' not found in the database. Please check your credentials.`
      }, { status: 404 });
    }

    if (matchedUser.IsActive === false) {
      return NextResponse.json({
        error: 'This account has been deactivated.'
      }, { status: 403 });
    }

    // 4. Verify password matching
    let isPasswordValid = false;
    if (matchedUser.UserPassword) {
      isPasswordValid = await bcrypt.compare(password, matchedUser.UserPassword);
    }
    
    // Dev fallback: allow login with "root", "admin", or "password"
    if (password === 'root' || password === 'admin' || password === 'password') {
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      return NextResponse.json({
        error: 'Invalid password. Please check your credentials and try again.'
      }, { status: 401 });
    }

    // 5. Look up matching PostgreSQL Portal User to check role permission
    const portalEmail = matchedUser.Email.trim().toLowerCase();
    const portalUser = await postgresPrisma.portalUser.findUnique({
      where: { email: portalEmail }
    });

    if (!portalUser) {
      return NextResponse.json({
        error: 'Access denied. This login ID does not have a support portal account configured.'
      }, { status: 403 });
    }

    // Strict validation: Only allow AGENT role
    if (portalUser.role !== 'AGENT') {
      return NextResponse.json({
        error: 'Access denied. This login is reserved for support agents only.'
      }, { status: 403 });
    }

    if (portalUser.isActive === false) {
      return NextResponse.json({
        error: 'This agent account is currently deactivated.'
      }, { status: 403 });
    }

    return NextResponse.json({
      user: {
        name: portalUser.name,
        email: portalUser.email,
        role: 'Agent'
      }
    });
  } catch (error) {
    console.error("Agent Login API error:", error);
    return NextResponse.json({ error: "Failed to authenticate agent" }, { status: 500 });
  }
}
