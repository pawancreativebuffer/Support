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
          take: 50,
          where: { status: { not: 'MERGED' } },
          include: {
            agent: true,
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
        take: 100,
        where: { status: { not: 'MERGED' } },
        include: {
          customer: true,
          agent: true,
          messages: {
            include: {
              sender: true
            },
            orderBy: {
              createdAt: 'asc'
            }
          },
          mergedTickets: {
            include: {
              messages: {
                include: { sender: true }
              },
              customer: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      const formattedTickets = allTickets.map(t => ({
        id: `TK-${t.id}`,
        firstName: t.customer.firstName || 'Client',
        lastName: t.customer.lastName || 'User',
        email: t.customer.email,
        category: t.title,
        description: t.description,
        status: t.status === 'WITH_CLIENT' ? 'With Client' : t.status === 'ON_HOLD' ? 'On Hold' : t.status === 'ESCALATED' ? 'Escalated' : t.status === 'CLOSED' ? 'Closed' : t.status === 'RESOLVED' ? 'Resolved' : 'Open',
        priority: t.priority,
        type: 'Form',
        attachmentUrl: t.attachmentUrl,
        attachmentName: t.attachmentName,
        agentId: t.agentId,
        agent: t.agent ? { id: t.agent.id, name: [t.agent.firstName, t.agent.lastName].filter(Boolean).join(' ') || 'Agent', email: t.agent.email } : null,
        createdAt: t.createdAt.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        replies: t.messages.map(m => ({
          sender: m.isSystem ? 'system' : (m.sender.role === 'CUSTOMER' ? 'customer' : 'agent'),
          text: m.text,
          attachmentUrl: m.attachmentUrl,
          attachmentName: m.attachmentName,
          time: m.createdAt.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        })),
        mergedTickets: t.mergedTickets ? t.mergedTickets.map(mt => ({
          id: `TK-${mt.id}`,
          description: mt.description,
          createdAt: mt.createdAt.toLocaleString('en-US'),
          customerName: mt.customer ? [mt.customer.firstName, mt.customer.lastName].filter(Boolean).join(' ') : 'Unknown',
          messages: mt.messages.map(m => ({
            sender: m.sender.role === 'CUSTOMER' ? 'customer' : 'agent',
            text: m.text,
            time: m.createdAt.toLocaleString('en-US')
          }))
        })) : []
      }));

      return NextResponse.json(formattedTickets);
    }

    // Map to client format for customer
    const formattedTickets = portalUser.raisedTickets.map(t => ({
      id: `TK-${t.id}`,
      firstName: portalUser.firstName || 'Client',
      lastName: portalUser.lastName || 'User',
      email: portalUser.email,
      category: t.title, // Map title as category
      description: t.description,
      status: t.status === 'WITH_CLIENT' ? 'With Client' : t.status === 'ON_HOLD' ? 'On Hold' : t.status === 'ESCALATED' ? 'Escalated' : t.status === 'CLOSED' ? 'Closed' : t.status === 'RESOLVED' ? 'Resolved' : 'Open',
      priority: t.priority,
      type: 'Form',
      attachmentUrl: t.attachmentUrl,
        attachmentName: t.attachmentName,
        agentId: t.agentId,
        agent: t.agent ? { id: t.agent.id, name: [t.agent.firstName, t.agent.lastName].filter(Boolean).join(' ') || 'Agent', email: t.agent.email } : null,
        createdAt: t.createdAt.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      replies: t.messages.map(m => ({
        sender: m.isSystem ? 'system' : (m.sender.role === 'CUSTOMER' ? 'customer' : 'agent'),
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

import crypto from 'crypto';

function generateMagicToken(ticketId: number, email: string) {
  const secret = process.env.UPLOADTHING_TOKEN || 'ticket-it-secret-salt';
  return crypto.createHmac('sha256', secret)
               .update(`${ticketId}-${email.toLowerCase()}`)
               .digest('hex')
               .substring(0, 16);
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, category, description, type, attachmentUrl, attachmentName, priority, status } = await req.json();

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
          login: portalEmail,
          firstName: firstName || '',
          lastName: lastName || '',
          passwordHash: '', // Set empty since they haven't registered directly via portal, always auths through main DB
          role: 'CUSTOMER',
          isActive: true
        }
      });
    }

    let dbStatus: any = 'OPEN';
    if (status) {
      const s = status.toUpperCase().replace(' ', '_');
      if (['OPEN', 'WITH_CLIENT', 'ON_HOLD', 'ESCALATED', 'CLOSED'].includes(s)) {
        dbStatus = s;
      }
    }

    // 2. Create the ticket in PostgreSQL
    const newTicket = await postgresPrisma.supportTicket.create({
      data: {
        title: category || 'General Inquiry',
        description: description,
        status: dbStatus,
        priority: (priority || 'MEDIUM').toUpperCase() as any,
        customerId: portalUser.id,
        attachmentUrl: attachmentUrl || null,
        attachmentName: attachmentName || null
      }
    });

    // 3. Create the initial system/customer ticket message if needed
    // In this case, we don't need a separate reply yet, the description is the initial query.

    import('@/lib/eventEmitter').then(({ ticketEventEmitter }) => {
      ticketEventEmitter.emit('ticketUpdate', { type: 'new_ticket', ticketId: `TK-${newTicket.id}` });
    });

    return NextResponse.json({
      success: true,
      ticketId: newTicket.id,
      ticketCode: `TK-${newTicket.id}`,
      magicToken: generateMagicToken(newTicket.id, portalEmail)
    });
  } catch (error: any) {
    console.error('Error creating ticket:', error);
    try {
      const fs = require('fs');
      fs.appendFileSync('./error_log.txt', new Date().toISOString() + ': ' + (error.stack || error.message || error) + '\n');
    } catch (e) {
      console.error('Failed to log to error_log.txt:', e);
    }
    return NextResponse.json({ error: `Failed to create ticket: ${error.message || error}` }, { status: 500 });
  }
}
