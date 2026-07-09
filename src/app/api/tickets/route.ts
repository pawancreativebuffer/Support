import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    // Find the portal user first
    const portalUser = await postgresPrisma.portalUser.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: {
        raisedTickets: {
          include: {
            messages: {
              include: {
                sender: true
              },
              orderBy: {
                createdAt: 'asc'
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!portalUser) {
      return NextResponse.json([]);
    }

    // If agent or admin, return all tickets
    if (portalUser.role === 'AGENT' || portalUser.role === 'ADMIN') {
      const allTickets = await postgresPrisma.supportTicket.findMany({
        include: {
          customer: true,
          messages: {
            include: {
              sender: true
            },
            orderBy: {
              createdAt: 'asc'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      const formattedTickets = allTickets.map(t => ({
        id: `TK-${t.id}`,
        firstName: t.customer.name.split(' ')[0] || 'Client',
        lastName: t.customer.name.split(' ').slice(1).join(' ') || 'User',
        email: t.customer.email,
        category: t.title,
        description: t.description,
        status: t.status === 'IN_PROGRESS' ? 'In Progress' : t.status === 'RESOLVED' ? 'Resolved' : 'Open',
        type: 'Form',
        attachmentUrl: t.attachmentUrl,
        attachmentName: t.attachmentName,
        createdAt: t.createdAt.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        replies: t.messages.map(m => ({
          sender: m.sender.role === 'CUSTOMER' ? 'customer' : 'agent',
          text: m.text,
          attachmentUrl: m.attachmentUrl,
          attachmentName: m.attachmentName,
          time: m.createdAt.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }))
      }));

      return NextResponse.json(formattedTickets);
    }

    // Map to client format for customer
    const formattedTickets = portalUser.raisedTickets.map(t => ({
      id: `TK-${t.id}`,
      firstName: portalUser.name.split(' ')[0] || 'Client',
      lastName: portalUser.name.split(' ').slice(1).join(' ') || 'User',
      email: portalUser.email,
      category: t.title, // Map title as category
      description: t.description,
      status: t.status === 'IN_PROGRESS' ? 'In Progress' : t.status === 'RESOLVED' ? 'Resolved' : 'Open',
      type: 'Form',
      attachmentUrl: t.attachmentUrl,
      attachmentName: t.attachmentName,
      createdAt: t.createdAt.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      replies: t.messages.map(m => ({
        sender: m.sender.role === 'CUSTOMER' ? 'customer' : 'agent',
        text: m.text,
        attachmentUrl: m.attachmentUrl,
        attachmentName: m.attachmentName,
        time: m.createdAt.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }))
    }));

    return NextResponse.json(formattedTickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, category, description, type, attachmentUrl, attachmentName } = await req.json();

    if (!email || !description) {
      return NextResponse.json({ error: 'Email and description are required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    const portalEmail = email.trim().toLowerCase();
    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Client User';

    // 1. Find or create PortalUser in PostgreSQL database
    let portalUser = await postgresPrisma.portalUser.findUnique({
      where: { email: portalEmail }
    });

    if (!portalUser) {
      console.log(`Syncing user to PostgreSQL portal database from ticket submission: ${portalEmail}`);
      portalUser = await postgresPrisma.portalUser.create({
        data: {
          email: portalEmail,
          name: fullName,
          passwordHash: '', // Set empty since they haven't registered directly via portal, always auths through main DB
          role: 'CUSTOMER',
          isActive: true
        }
      });
    }

    // 2. Create the ticket in PostgreSQL
    const newTicket = await postgresPrisma.supportTicket.create({
      data: {
        title: category || 'General Inquiry',
        description: description,
        status: 'OPEN',
        priority: 'MEDIUM',
        customerId: portalUser.id,
        attachmentUrl: attachmentUrl || null,
        attachmentName: attachmentName || null
      }
    });

    // 3. Create the initial system/customer ticket message if needed
    // In this case, we don't need a separate reply yet, the description is the initial query.

    return NextResponse.json({
      success: true,
      ticketId: newTicket.id,
      ticketCode: `TK-${newTicket.id}`
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}
