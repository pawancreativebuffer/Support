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
    let userQuery = "";
    try {
      const body = await req.json();
      phone = body.phone || body.phoneNumber || body.userId;
      userQuery = body.query || body.question || "";
    } catch (e) {
      // Body might be empty or invalid JSON
    }

    if (!phone) {
      phone = req.nextUrl.searchParams.get('phone') || req.nextUrl.searchParams.get('phoneNumber') || req.nextUrl.searchParams.get('userId');
    }
    if (!userQuery) {
      userQuery = req.nextUrl.searchParams.get('query') || req.nextUrl.searchParams.get('question') || "";
    }

    if (!phone) {
      return NextResponse.json({ error: "phone is required" }, { status: 400 });
    }

    // 1. Fetch Comprehensive Data from SQL Server dynamically
    let userSummary = "";
    try {
      const sanitizedPhone = String(phone).replace(/\D/g, '');
      const searchPhone = sanitizedPhone.length >= 10 ? sanitizedPhone.slice(-10) : sanitizedPhone;

      const user = await sqlServerPrisma.users.findFirst({
        where: { Phone: { contains: searchPhone } },
        include: { 
          _count: true,
          Batches: {
            take: 5,
            orderBy: { DateFrom: 'desc' },
            select: { Name: true, DateFrom: true, IsPrinted: true, Notes: true }
          },
          tickets: {
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, status: true, description: true, category: true }
          }
        }
      });

      if (user) {
        const queryLower = userQuery.toLowerCase();
        
        // If the AI asks for a specific module, only return that module to save tokens
        if (queryLower.includes('batch')) {
           userSummary = `Batches for User ${user.FirstName} (Total: ${user._count?.Batches || 0}):\n`;
           if (user.Batches && user.Batches.length > 0) {
             user.Batches.forEach((b: any) => {
               userSummary += `- Batch: "${b.Name}", Date: ${b.DateFrom ? new Date(b.DateFrom).toLocaleDateString() : 'Unknown'}, Printed: ${b.IsPrinted ? 'Yes' : 'No'}, Notes: ${b.Notes || 'None'}\n`;
             });
           } else {
             userSummary += "No recent batches found.";
           }
        } 
        else if (queryLower.includes('ticket')) {
           userSummary = `Tickets for User ${user.FirstName} (Total: ${user._count?.tickets || 0}):\n`;
           if (user.tickets && user.tickets.length > 0) {
             user.tickets.forEach((t: any) => {
               userSummary += `- Ticket ID: "${t.id}", Category: ${t.category}, Status: ${t.status}, Desc: "${t.description ? t.description.substring(0, 100) + '...' : 'None'}"\n`;
             });
           } else {
             userSummary += "No recent tickets found.";
           }
        }
        else if (queryLower.includes('esl') || queryLower.includes('label')) {
           // Query ESL updates dynamically
           const esls = await sqlServerPrisma.eslUpdates.findMany({
             where: { UserId: user.Id },
             take: 5,
             orderBy: { DateCreated: 'desc' }
           });
           userSummary = `ESL Updates for User ${user.FirstName}:\n`;
           if (esls.length > 0) {
             esls.forEach((e: any) => {
               userSummary += `- SKU: ${e.ProductSKU}, Processed: ${e.IsProcessing ? 'Yes' : 'No'}, Completed: ${e.IsCompleted ? 'Yes' : 'No'}, Promo: ${e.IsPromo ? 'Yes' : 'No'}\n`;
             });
           } else {
             userSummary += "No recent ESL updates found for this user.";
           }
        }
        else {
          // General Account Summary (Fallback)
          userSummary = `Account details for User ${user.FirstName || ''} ${user.LastName || ''}:\n`;
          userSummary += `- User ID: ${user.Id}\n- Login ID: ${user.Login}\n- Email: ${user.Email}\n- Phone: ${user.Phone}\n- Status: ${user.IsActive ? 'Active' : 'Inactive'}\n- Client: ${user.Client}\n- Region: ${user.RegionName}\n`;
          userSummary += `\nCounts of related data (Total Records):\n`;
          const counts = user._count as Record<string, number>;
          for (const [key, value] of Object.entries(counts)) {
            if (value > 0) userSummary += `- Total ${key}: ${value}\n`;
          }
          userSummary += "\nNote: You can query specific details by asking about 'batches', 'tickets', or 'esls'.";
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
