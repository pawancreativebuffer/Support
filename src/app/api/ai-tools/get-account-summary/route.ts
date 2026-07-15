import { NextRequest, NextResponse } from 'next/server';
import { prisma as sqlServerPrisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

async function handleRequest(req: NextRequest) {
  try {
    let phone = null;
    try {
      const body = await req.json();
      phone = body.phone || body.phoneNumber || body.userId;
    } catch (e) {
      // Body might be empty or invalid JSON
    }

    if (!phone) {
      phone = req.nextUrl.searchParams.get('phone') || req.nextUrl.searchParams.get('phoneNumber') || req.nextUrl.searchParams.get('userId');
    }

    if (!phone) {
      return NextResponse.json({ error: "phone is required" }, { status: 400 });
    }

    // 1. Fetch Comprehensive Data from SQL Server dynamically
    let userSummary = "";
    try {
      // Ensure phone is a string and strip all non-numeric characters (e.g. spaces, +, dashes)
      const sanitizedPhone = String(phone).replace(/\D/g, '');
      // Get the last 10 digits to ignore country codes during the search
      const searchPhone = sanitizedPhone.length >= 10 ? sanitizedPhone.slice(-10) : sanitizedPhone;

      const user = await sqlServerPrisma.users.findFirst({
        where: { Phone: { contains: searchPhone } },
        include: { _count: true }
      });

      if (user) {
        userSummary = `Account details for User ${user.FirstName || ''} ${user.LastName || ''}:\n`;
        // Dynamically add all relation counts to the summary
        const counts = user._count as Record<string, number>;
        for (const [key, value] of Object.entries(counts)) {
          if (value > 0) {
            userSummary += `- ${key}: ${value}\n`;
          }
        }
      } else {
        userSummary = `No data found in SQL Server database for phone number ${phone}.`;
      }
    } catch (e) {
      console.warn("Failed to fetch user data:", e);
      userSummary = "Error fetching database records.";
    }

    const summary = `${userSummary}\n(Note: This is real-time dynamic data directly from the SQL Server database).`;

    return NextResponse.json({
      summary: summary
    });
  } catch (error) {
    console.error("AI Tool Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
