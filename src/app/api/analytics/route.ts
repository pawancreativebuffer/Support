import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';
import { startOfDay, endOfDay, subDays, parseISO } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role'); // 'Admin', 'Agent', 'Customer'
    const email = searchParams.get('email');
    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    if (!role || !email) {
      return NextResponse.json({ error: 'Missing role or email' }, { status: 400 });
    }

    const startDate = startParam ? startOfDay(parseISO(startParam)) : startOfDay(subDays(new Date(), 30));
    const endDate = endParam ? endOfDay(parseISO(endParam)) : endOfDay(new Date());

    const dateFilter = {
      gte: startDate,
      lte: endDate,
    };

    if (role === 'Admin') {
      // 1. Agent Leaderboard (Tickets resolved by each agent)
      const agents = await postgresPrisma.portalUser.findMany({ where: { role: 'AGENT' } });
      const tickets = await postgresPrisma.supportTicket.findMany({
        where: { updatedAt: dateFilter }
      });

      const agentStats = agents.map(agent => {
        const agentResolved = tickets.filter(t => t.agentId === agent.id && t.status === 'RESOLVED').length;
        const agentActive = tickets.filter(t => t.agentId === agent.id && t.status !== 'RESOLVED' && t.status !== 'CLOSED').length;
        return {
          id: agent.id,
          name: `${agent.firstName} ${agent.lastName}`.trim() || agent.email,
          email: agent.email,
          resolvedCount: agentResolved,
          activeCount: agentActive
        };
      }).sort((a, b) => b.resolvedCount - a.resolvedCount).slice(0, 3);

      // 2. Frequent Clients
      const ticketsByClient = await postgresPrisma.supportTicket.groupBy({
        by: ['customerId'],
        _count: { id: true },
        where: { createdAt: dateFilter },
        orderBy: { _count: { id: 'desc' } },
        take: 3
      });

      const clientIds = ticketsByClient.map(t => t.customerId).filter(id => id !== null) as number[];
      const clients = await postgresPrisma.portalUser.findMany({
        where: { id: { in: clientIds } }
      });

      const frequentClients = ticketsByClient.map(t => {
        const client = clients.find(c => c.id === t.customerId);
        return {
          name: client ? `${client.firstName} ${client.lastName}`.trim() || client.email : 'Unknown',
          email: client?.email || 'N/A',
          ticketCount: t._count.id
        };
      });

      // 3. Category Breakdown (mocked categories since schema has no strict category field, let's group by title prefix or hardcoded if needed. Actually we use priority as a proxy or fake category for chart)
      // The old tickets had `category` string field, but Prisma schema doesn't have it! Let's just group by Priority for the chart.
      const priorityGroup = await postgresPrisma.supportTicket.groupBy({
        by: ['priority'],
        _count: { id: true },
        where: { createdAt: dateFilter },
      });
      const categoryData = priorityGroup.map(p => ({
        name: p.priority,
        value: p._count.id
      }));

      // 4. CSAT/Satisfaction metrics (Mocked mostly, except CallLogs if available)
      const callLogs = await postgresPrisma.callLog.findMany({ where: { createdAt: dateFilter } });
      let callCsatTotal = 0, callCsatCount = 0;
      callLogs.forEach(log => {
        if (log.aiAnalysis && typeof log.aiAnalysis === 'object') {
          const analysis = log.aiAnalysis as any;
          if (analysis.csatPercentage && typeof analysis.csatPercentage === 'number') {
            callCsatTotal += analysis.csatPercentage;
            callCsatCount++;
          }
        }
      });
      const callsSatisfaction = callCsatCount > 0 ? Math.round(callCsatTotal / callCsatCount) : 85;

      // Mocked Voice/Chat CSAT
      const voiceSatisfaction = 92;
      const chatSatisfaction = 88;

      const satisfactionStats = [
        { name: 'Voice AI', satisfaction: voiceSatisfaction },
        { name: 'Live Chat', satisfaction: chatSatisfaction },
        { name: 'Phone Calls', satisfaction: callsSatisfaction }
      ];

      // 5. Status Breakdown
      const statusGroup = await postgresPrisma.supportTicket.groupBy({
        by: ['status'],
        _count: { id: true },
        where: { createdAt: dateFilter },
      });
      const statusData = statusGroup.map(s => ({
        name: s.status,
        value: s._count.id
      }));

      return NextResponse.json({ agentStats, frequentClients, categoryData, satisfactionStats, statusData });
    }

    if (role === 'Agent') {
      const agent = await postgresPrisma.portalUser.findUnique({ where: { email, role: 'AGENT' } });
      if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

      // Current Period
      const myResolvedCount = await postgresPrisma.supportTicket.count({
        where: { agentId: agent.id, status: 'RESOLVED', updatedAt: dateFilter }
      });
      const myOpenCount = await postgresPrisma.supportTicket.count({
        where: { agentId: agent.id, status: { notIn: ['RESOLVED', 'CLOSED'] }, updatedAt: dateFilter }
      });

      // Previous Period Comparison (same duration)
      const durationMs = endDate.getTime() - startDate.getTime();
      const prevStartDate = new Date(startDate.getTime() - durationMs);
      const prevEndDate = new Date(endDate.getTime() - durationMs);

      const prevResolvedCount = await postgresPrisma.supportTicket.count({
        where: { agentId: agent.id, status: 'RESOLVED', updatedAt: { gte: prevStartDate, lte: prevEndDate } }
      });

      // Frequent Flyers
      const ticketsByClient = await postgresPrisma.supportTicket.groupBy({
        by: ['customerId'],
        _count: { id: true },
        where: { createdAt: dateFilter },
        orderBy: { _count: { id: 'desc' } },
        take: 5
      });

      const clientIds = ticketsByClient.map(t => t.customerId).filter(id => id !== null) as number[];
      const clients = await postgresPrisma.portalUser.findMany({
        where: { id: { in: clientIds } }
      });

      const frequentClients = ticketsByClient.map(t => {
        const client = clients.find(c => c.id === t.customerId);
        return {
          name: client ? `${client.firstName} ${client.lastName}`.trim() || client.email : 'Unknown',
          email: client?.email || 'N/A',
          ticketCount: t._count.id
        };
      });

      return NextResponse.json({
        myResolvedCount,
        myOpenCount,
        prevResolvedCount,
        frequentClients
      });
    }



    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
