const { PrismaClient } = require('./src/generated/postgres-client');

async function wipeDatabase() {
  const prisma = new PrismaClient();
  try {
    console.log("Wiping ChatWidgetSession...");
    await prisma.chatWidgetSession.deleteMany({});
    console.log("Wiping VoiceSessionLog...");
    await prisma.voiceSessionLog.deleteMany({});
    console.log("Wiping PortalUser (this will cascade delete SupportTicket & TicketMessage)...");
    await prisma.portalUser.deleteMany({});
    console.log("Database wiped successfully!");
  } catch (error) {
    console.error("Error wiping database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

wipeDatabase();
