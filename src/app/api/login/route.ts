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
        error: 'Database connection is not initialized. Please configure your DATABASE_URL.'
      }, { status: 500 });
    }

    let matchedUser = null;
    try {
      matchedUser = await prisma.users.findFirst({
        where: {
          OR: [
            { Login: trimmedLogin },
            { Email: trimmedLogin }
          ]
        }
      });
    } catch (err) {
      console.error("SQL Server query error during login:", err);
      return NextResponse.json({
        error: 'Unable to connect to the database. Please ensure your SQL Server is running and synced.'
      }, { status: 500 });
    }

    if (!matchedUser) {
      return NextResponse.json({
        error: `Login ID '${login}' not found in the database. Please check your credentials.`
      }, { status: 404 });
    }

    if (matchedUser.IsActive === false) {
      return NextResponse.json({
        error: 'This account has been deactivated. Please contact support.'
      }, { status: 403 });
    }

    // Verify password matching
    let isPasswordValid = false;
    if (matchedUser.UserPassword) {
      // Assuming passwords in SQL Server are bcrypt hashed. If they use a different legacy hash, this logic might need adjustment.
      isPasswordValid = await bcrypt.compare(password, matchedUser.UserPassword);
    }

    if (!isPasswordValid) {
      return NextResponse.json({
        error: 'Invalid password. Please check your credentials and try again.'
      }, { status: 401 });
    }

    // Sync with PostgreSQL Support Portal database
    if (postgresPrisma) {
      try {
        const portalEmail = matchedUser.Email.trim().toLowerCase();
        const existingPortalUser = await postgresPrisma.portalUser.findUnique({
          where: { email: portalEmail }
        });

        if (existingPortalUser) {
          if (existingPortalUser.role !== 'CUSTOMER') {
            return NextResponse.json({
              error: 'Access denied. This login is reserved for customers only.'
            }, { status: 403 });
          }
        } else {
          console.log(`Syncing user to PostgreSQL portal database: ${portalEmail}`);
          await postgresPrisma.portalUser.create({
            data: {
              email: portalEmail,
              login: matchedUser.Login,
              firstName: matchedUser.FirstName,
              lastName: matchedUser.LastName,
              passwordHash: matchedUser.UserPassword || 'no-legacy-password',
              role: 'CUSTOMER',
              isActive: true
            }
          });
        }
      } catch (pgErr) {
        console.error("PostgreSQL user sync error during login:", pgErr);
      }
    }

    return NextResponse.json({
      user: {
        name: `${matchedUser.FirstName} ${matchedUser.LastName}`.trim() || 'Client User',
        email: matchedUser.Email,
        role: 'Customer'
      }
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Failed to authenticate user" }, { status: 500 });
  }
}
