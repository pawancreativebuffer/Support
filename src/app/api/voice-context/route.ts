import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body;
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!prisma) {
      return NextResponse.json({ error: 'Database client not initialized' }, { status: 500 });
    }

    const dbUser = await prisma.users.findFirst({
      where: { Email: email }
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = dbUser.Id;

    const [
      batches,
      fileNotes,
      ftpDetails,
      savedTemplates,
      storeGroups,
      userIntegrations,
      userOutlets,
      tickets
    ] = await Promise.all([
      prisma.batches.findMany({ where: { UserId: userId } }).catch(() => []),
      prisma.fileNote.findMany({ where: { UserId: userId } }).catch(() => []),
      prisma.ftpConfigurationDetails.findMany({ where: { UserId: userId } }).catch(() => []),
      prisma.savedTemplateStates.findMany({ where: { UserId: userId } }).catch(() => []),
      prisma.storeGroups.findMany({ where: { StoreGroupManagerId: userId } }).catch(() => []),
      prisma.userIntegrations.findMany({ where: { UserId: userId } }).catch(() => []),
      prisma.userOutlet.findMany({ where: { UserId: userId } }).catch(() => []),
      prisma.ticket.findMany({ where: { email: email } }).catch(() => [])
    ]);

    const voiceContext = {
      profile: {
        name: `${dbUser.FirstName} ${dbUser.LastName}`.trim(),
        email: dbUser.Email,
        phone: dbUser.Phone,
        address: dbUser.AddressLine1,
        client: dbUser.Client
      },
      tickets: tickets.map((t: any) => ({ id: t.id, status: t.status, description: t.description })),
      batches: batches.map((b: any) => ({ id: b.Id, name: b.Name, amount: b.ProductAmount, isPrinted: b.IsPrinted })),
      fileNotes: fileNotes.map((f: any) => ({ note: f.Notes, date: f.CreatedDate })),
      ftpDetails: ftpDetails.map((ftp: any) => ({ address: ftp.Address, username: ftp.Username, path: ftp.Path })),
      savedTemplates: savedTemplates.map((t: any) => ({ name: t.TemplateName, quantity: t.TemplateQuantity })),
      storeGroups: storeGroups.map((sg: any) => ({ name: sg.Name })),
      userIntegrations: userIntegrations.map((ui: any) => {
        const active = [];
        if (ui.IsUsingVendApi) active.push('Vend');
        if (ui.IsUsingShopfrontApi) active.push('Shopfront');
        if (ui.IsUsingREXApi) active.push('REX');
        if (ui.IsUsingShopifyApi) active.push('Shopify');
        if (ui.IsUsingSwiftPOSApi) active.push('SwiftPOS');
        return active;
      }).flat(),
      outletsCount: userOutlets.length
    };

    return NextResponse.json(voiceContext);
  } catch (error) {
    console.error("Voice context fetch error:", error);
    return NextResponse.json({ error: 'Failed to retrieve voice context' }, { status: 500 });
  }
}
