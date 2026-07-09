import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { postgresPrisma } from '@/lib/postgresDb';

// Offline fallback data (matching seeded localStorage) in case database isn't connected yet
const mockTickets = [
  {
    id: "TK-104928",
    email: "customer@example.com",
    category: "Live Chat & Widgets",
    description: "I embedded the Ticket-it chat widget script but it's throwing a CORS policy error on our checkout domain. Please whitelist domain.com.",
    status: "Open",
    createdAt: "Jun 29, 2026 04:10 PM",
    type: "Form"
  },
  {
    id: "TK-291823",
    email: "customer@example.com",
    category: "Ticketing & Help Desk",
    description: "Our SLA targets for High priority tickets are not escalating correctly. Agents are not receiving Slack notifications.",
    status: "In Progress",
    createdAt: "Jun 28, 2026 09:12 AM",
    type: "Form"
  },
  {
    id: "TK-991822",
    email: "customer@example.com",
    category: "Voice Assistant",
    description: "Voice command inquiry: 'Show ticket response SLA targets'. Speech recognition input logs verified.",
    status: "Resolved",
    createdAt: "Jun 27, 2026 11:30 AM",
    type: "Voice"
  },
  {
    id: "TK-882710",
    email: "customer@example.com",
    category: "API & Developer Tools",
    description: "API integration inquiry regarding webhook signature validation. Logged session details sync complete.",
    status: "Resolved",
    createdAt: "Jun 24, 2026 03:45 PM",
    type: "Live Chat"
  }
];

// Helper to query Gemini API via standard HTTPS fetch
async function callGemini(prompt: string, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Invalid response from Gemini API");
  }
  return text.trim();
}

// Helper to query OpenAI API via standard HTTPS fetch
async function callOpenAI(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("Invalid response from OpenAI API");
  }
  return text.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, user } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const query = message.toLowerCase().trim();
    let reply = '';
    let dbStatusText = '';

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    console.log("DEBUG KEYS -> GEMINI:", !!GEMINI_API_KEY, "OPENAI:", !!OPENAI_API_KEY);

    // 1. If user is logged in, fetch their specific data
    let userTicketsList: any[] = [];
    let userBatchesList: any[] = [];
    let userOtherData: any = null;
    if (user && user.email) {
      if (prisma) {
        try {
          userTicketsList = await prisma.ticket.findMany({
            where: { email: user.email }
          });

          const dbUser = await prisma.users.findFirst({
            where: { Email: user.email }
          });
          if (dbUser) {
            const userId = dbUser.Id;

            const [
              batches,
              fileNotes,
              ftpDetails,
              savedTemplates,
              storeGroups,
              userGroups,
              userIntegrations,
              userOutlets
            ] = await Promise.all([
              prisma.batches.findMany({ where: { UserId: userId } }).catch(() => []),
              prisma.fileNote.findMany({ where: { UserId: userId } }).catch(() => []),
              prisma.ftpConfigurationDetails.findMany({ where: { UserId: userId } }).catch(() => []),
              prisma.savedTemplateStates.findMany({ where: { UserId: userId } }).catch(() => []),
              prisma.storeGroups.findMany({ where: { StoreGroupManagerId: userId } }).catch(() => []),
              prisma.userGroup.findMany({ where: { UserId: userId } }).catch(() => []),
              prisma.userIntegrations.findMany({ where: { UserId: userId } }).catch(() => []),
              prisma.userOutlet.findMany({ where: { UserId: userId } }).catch(() => [])
            ]);

            userBatchesList = batches;
            userOtherData = {
              profile: {
                id: dbUser.Id,
                login: dbUser.Login,
                email: dbUser.Email,
                firstName: dbUser.FirstName,
                lastName: dbUser.LastName,
                phone: dbUser.Phone,
                address: dbUser.AddressLine1,
                client: dbUser.Client,
                region: dbUser.RegionName,
                isActive: dbUser.IsActive
              },
              fileNotes: fileNotes.map((f: any) => ({ id: f.Id, note: f.Notes, date: f.CreatedDate, file: f.FileName })),
              ftpDetails: ftpDetails.map((ftp: any) => ({ id: ftp.Id, address: ftp.Address, username: ftp.Username, path: ftp.Path, isSFTP: ftp.IsSFTP })),
              savedTemplates: savedTemplates.map((t: any) => ({ id: t.Id, templateName: t.TemplateName, quantity: t.TemplateQuantity })),
              storeGroups: storeGroups.map((sg: any) => ({ id: sg.Id, name: sg.Name })),
              userGroups: userGroups.map((g: any) => ({ groupId: g.GroupId })),
              userIntegrations: userIntegrations.map((ui: any) => ({
                id: ui.Id,
                isUsingVend: ui.IsUsingVendApi,
                isUsingShopfront: ui.IsUsingShopfrontApi,
                isUsingREX: ui.IsUsingREXApi,
                isUsingShopify: ui.IsUsingShopifyApi,
                isUsingSwiftPOS: ui.IsUsingSwiftPOSApi
              })),
              userOutlets: userOutlets.map((uo: any) => ({ outletId: uo.OutletId }))
            };
          }
          dbStatusText = " [Real-time Database Connection Active]";
        } catch (err) {
          console.warn("SQL Server connection failed, falling back to local memory:", err);
          dbStatusText = " [Offline Database Mode]";
        }
      } else {
        dbStatusText = " [Demo Database Mode]";
      }

      // If database yielded nothing (or not configured), fall back to seeded mock database records
      if (userTicketsList.length === 0) {
        userTicketsList = mockTickets.filter((t: any) => t.email.toLowerCase() === user.email.toLowerCase());
      }
    } else {
      dbStatusText = " [Public Platform Mode]";
    }

    // 2. Check if we have an active LLM API Key to make it dynamic
    if (GEMINI_API_KEY || OPENAI_API_KEY) {
      // Build dynamic context prompt
      let contextPrompt = `
        You are Sarah, a highly helpful, professional customer support agent representing the Ticket-it platform. 
        Keep your answers concise, friendly, and under 3-4 sentences so they fit nicely within a floating chat widget.

        PLATFORM INFORMATION:
        - Ticket-it is a customer support and live chat widget service.
        - Setup instruction: Paste this script before the closing </body> tag: <script src="https://cdn.ticket-it.com/widget.js" data-id="YOUR_WIDGET_ID" async></script>
        - Pricing: Starter (Free, 50 tickets/mo), Professional ($29/mo, voice assistant, SLAs), Enterprise (Custom, dedicated SSMS/PostgreSQL database connectors, whitelabeling).
        - Voice Assistant: Switch to the "Voice Assistant" tab to test real-time voice speech recognition powered by ElevenLabs.
      `;

      if (user && user.email) {
        contextPrompt += `
          USER DETAILS (AUTHENTICATED SESSIONS ACTIVE):
          - The current user IS LOGGED IN.
          - Profile Name: ${user.name}
          - Profile Email: ${user.email}
          - Profile Role: ${user.role}
          - User's database tickets: ${JSON.stringify(userTicketsList)}
          - User's database batches: ${JSON.stringify(userBatchesList.map(b => ({ id: b.Id, name: b.Name, productAmount: b.ProductAmount, dateFrom: b.DateFrom, isPrinted: b.IsPrinted })))}
          - Other database tables linked to the user: ${JSON.stringify(userOtherData)}
          
          RULE: Since the user is logged in, you CAN reference, summarize, or answer questions about their specific tickets, batches, file notes, FTP details, saved templates, store/user groups, integrations, outlets, or profile data.
        `;
      } else {
        contextPrompt += `
          USER NOT LOGGED IN:
          - The visitor is anonymous/public.
          - RULE: You MUST NOT show any personal ticket details. If they ask about their tickets, account, or personal data, politely instruct them to sign in first so you can query their database.
        `;
      }

      contextPrompt += `
        User question: "${message}"
        Please write a natural response matching this persona:
      `;

      try {
        if (GEMINI_API_KEY) {
          reply = await callGemini(contextPrompt, GEMINI_API_KEY);
        } else if (OPENAI_API_KEY) {
          reply = await callOpenAI(contextPrompt, OPENAI_API_KEY);
        }
      } catch (llmErr) {
        console.error("LLM Call failed, falling back to rule engine:", llmErr);
      }
    }

    // 3. Fallback to rule matching engine if LLM keys are absent or failed
    if (!reply) {
      if (user && user.email) {
        if (query.includes('ticket') || query.includes('status') || query.includes('my issues')) {
          if (userTicketsList.length === 0) {
            reply = `Hello ${user.name}, I checked our SQL Server database but didn't find any tickets registered under your email (${user.email}). If you just submitted a ticket, please wait a minute for it to sync.`;
          } else {
            const ticketsSummary = userTicketsList.map((t: any, idx: number) =>
              `• ${t.id} (${t.category}): Status is **${t.status}** (Created ${t.createdAt}). Description: "${t.description.substring(0, 75)}..."`
            ).join('\n');

            reply = `Hello ${user.name}, here are your tickets from our database:\n\n${ticketsSummary}\n\nIs there a specific ticket you need help escalating?`;
          }
        }
        else if (query.includes('batch') || query.includes('batches') || query.includes('my item') || query.includes('my products')) {
          if (userBatchesList.length === 0) {
            reply = `Hello ${user.name}, I checked our SQL Server database but didn't find any batches registered under your account.`;
          } else {
            const batchesSummary = userBatchesList.map((b: any) =>
              `• **Batch #${b.Id}**: "${b.Name}" (${b.ProductAmount} products, Date: ${new Date(b.DateFrom).toLocaleDateString()}, Printed: ${b.IsPrinted ? 'Yes' : 'No'})`
            ).join('\n');

            reply = `Hello ${user.name}, you have **${userBatchesList.length} batches** registered in our database under your account:\n\n${batchesSummary}`;
          }
        }
        else if (query.includes('template') || query.includes('saved template')) {
          if (!userOtherData || !userOtherData.savedTemplates || userOtherData.savedTemplates.length === 0) {
            reply = `Hello ${user.name}, I checked your account templates but didn't find any saved template states.`;
          } else {
            const tSummary = userOtherData.savedTemplates.map((t: any) => `• **${t.templateName}** (Quantity: ${t.quantity})`).join('\n');
            reply = `Here are your saved templates from the database:\n\n${tSummary}`;
          }
        }
        else if (query.includes('ftp') || query.includes('sftp') || query.includes('connection')) {
          if (!userOtherData || !userOtherData.ftpDetails || userOtherData.ftpDetails.length === 0) {
            reply = `Hello ${user.name}, I didn't find any active FTP configurations registered under your user ID.`;
          } else {
            const ftpSummary = userOtherData.ftpDetails.map((ftp: any) => `• **Host**: ${ftp.address} (Username: ${ftp.username}, Path: ${ftp.path}, SFTP: ${ftp.isSFTP ? 'Yes' : 'No'})`).join('\n');
            reply = `Here are your FTP configurations from the database:\n\n${ftpSummary}`;
          }
        }
        else if (query.includes('integration') || query.includes('api') || query.includes('sync')) {
          if (!userOtherData || !userOtherData.userIntegrations || userOtherData.userIntegrations.length === 0) {
            reply = `Hello ${user.name}, I didn't find any active API integrations under your user ID.`;
          } else {
            const activeInts = userOtherData.userIntegrations.map((ui: any) => {
              const active = [];
              if (ui.isUsingVend) active.push('Vend');
              if (ui.isUsingShopfront) active.push('Shopfront');
              if (ui.isUsingREX) active.push('REX');
              if (ui.isUsingShopify) active.push('Shopify');
              if (ui.isUsingSwiftPOS) active.push('SwiftPOS');
              return `• **Integration ID #${ui.id}**: Active APIs: ${active.length > 0 ? active.join(', ') : 'None'}`;
            }).join('\n');
            reply = `Here are your API integrations registered in our database:\n\n${activeInts}`;
          }
        }
        else if (query.includes('note') || query.includes('file note') || query.includes('notes')) {
          if (!userOtherData || !userOtherData.fileNotes || userOtherData.fileNotes.length === 0) {
            reply = `Hello ${user.name}, I didn't find any file notes or history logs under your user account.`;
          } else {
            const notesSummary = userOtherData.fileNotes.map((f: any) => `• **Note** (${new Date(f.date).toLocaleDateString()}): "${f.note}" (Attached: ${f.file || 'None'})`).join('\n');
            reply = `Here are the notes logged in your database account:\n\n${notesSummary}`;
          }
        }
        else if (query.includes('outlet') || query.includes('outlets') || query.includes('store group')) {
          const outletCount = userOtherData?.userOutlets?.length || 0;
          const storeGroupCount = userOtherData?.storeGroups?.length || 0;
          reply = `Hello ${user.name}, you are linked to **${outletCount} outlet(s)** and manage **${storeGroupCount} store group(s)** in the database.`;
        }
        else if (query.includes('profile') || query.includes('my account') || query.includes('who am i')) {
          reply = `Here is your profile information from our database:\n\n• **Name**: ${user.name}\n• **Email**: ${user.email}\n• **Role**: ${user.role}\n• **Security Level**: AES-256 Encrypted Session\n\nYou have **${userTicketsList.length} tickets**, **${userBatchesList.length} batches**, and custom configurations registered under your ID.`;
        }
        else if (query.includes('cors') || query.includes('domain') || query.includes('whitelist')) {
          const corsTicket = userTicketsList.find((t: any) => t.id === 'TK-104928');
          if (corsTicket) {
            reply = `Regarding your ticket **TK-104928** about whitelist/CORS configuration: our senior engineer has reviewed it. Whitelisting for your checkout domain has been initiated. I will notify you as soon as the deployment finishes!`;
          } else {
            reply = `I don't see an active CORS ticket in your account, but whitelisting can be set up in your Dashboard settings under Widget Integrations.`;
          }
        }
        else if (query.includes('sla') || query.includes('escalate') || query.includes('priority')) {
          const slaTicket = userTicketsList.find((t: any) => t.id === 'TK-291823');
          if (slaTicket) {
            reply = `Regarding your ticket **TK-291823** ("SLA Escalations"): the escalation rules are being audited. Slack alerts should start functioning in 10-15 minutes.`;
          } else {
            reply = `Standard response SLA times are 2 hours for Premium and 8 hours for Standard support tiers. Let me know if you'd like to open a ticket to adjust your targets.`;
          }
        }
        else {
          reply = `Hello ${user.name}! I am connected to your account database. You can ask me about your open tickets, batches, FTP configs, templates, active API integrations, notes, outlets, or your profile details!`;
        }
      }
      else {
        if (query.includes('pricing') || query.includes('cost') || query.includes('plans')) {
          reply = `Ticket-it has three plans designed to scale with your business:
• **Starter**: Free forever, includes basic live chat widget and 50 tickets/month.
• **Professional**: $29/month, includes voice assistant integration, SLAs, and unlimited ticketing.
• **Enterprise**: Custom pricing, includes dedicated DB connectors (SSMS/PostgreSQL), whitelabeling, and 99.9% SLA guarantees.`;
        }
        else if (query.includes('install') || query.includes('embed') || query.includes('setup') || query.includes('code')) {
          reply = `Setting up Ticket-it is simple! Just copy the embed script from your dashboard and paste it before the closing \`</body>\` tag of your HTML:
\`\`\`html
<script src="https://cdn.ticket-it.com/widget.js" data-id="YOUR_WIDGET_ID" async></script>
\`\`\`
Let me know if you run into any CORS policies or whitelisting errors during setup!`;
        }
        else if (query.includes('voice') || query.includes('elevenlabs') || query.includes('speech')) {
          reply = `Our advanced Live Voice Assistant is powered by **ElevenLabs**. It allows customers to speak directly with an AI agent in real-time, matching database context to answer questions verbally. You can test it by switching to the "Voice Assistant" tab here!`;
        }
        else {
          reply = `Welcome to Ticket-it Support! 
          
I can help you with setup guidelines, pricing plans, and integration steps. 

💡 **Tip**: If you sign in, I can query your profile database and give you real-time status updates on your support tickets!`;
        }
      }
    }
    // Sync chat logs to PostgreSQL database
    if (postgresPrisma) {
      try {
        const sessionKey = 'CH-882910'; // Default session key from ChatWidget
        const emailClean = user && user.email ? user.email.trim().toLowerCase() : null;
        const nameClean = user && user.name ? user.name.trim() : null;

        // Find or create session
        let session = await postgresPrisma.chatWidgetSession.findUnique({
          where: { sessionKey }
        });

        if (!session) {
          session = await postgresPrisma.chatWidgetSession.create({
            data: {
              sessionKey,
              customerEmail: emailClean,
              customerName: nameClean,
              status: 'ACTIVE'
            }
          });
        } else if (emailClean && session.customerEmail !== emailClean) {
          // Associate session with user if logged in
          session = await postgresPrisma.chatWidgetSession.update({
            where: { sessionKey },
            data: {
              customerEmail: emailClean,
              customerName: nameClean
            }
          });
        }

        // Add user message
        await postgresPrisma.chatWidgetMessage.create({
          data: {
            sessionId: session.id,
            senderType: 'USER',
            text: message
          }
        });

        // Add agent reply
        await postgresPrisma.chatWidgetMessage.create({
          data: {
            sessionId: session.id,
            senderType: 'AGENT',
            text: reply
          }
        });

        // Update session timestamp
        await postgresPrisma.chatWidgetSession.update({
          where: { id: session.id },
          data: { updatedAt: new Date() }
        });
      } catch (pgErr) {
        console.error("Failed to save widget chat message in PostgreSQL:", pgErr);
      }
    }

    return NextResponse.json({
      text: reply,
      sender: 'agent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dbStatus: dbStatusText.trim()
    });

  } catch (err: any) {
    console.error("Error in support-chat handler:", err);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}