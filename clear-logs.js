const { PrismaClient } = require('./src/generated/postgres-client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:root@localhost:5432/support_portal"
        }
    }
});

async function main() {
  console.log("Clearing all Chat and Voice AI Logs from the database...");
  
  const chatMsgs = await prisma.chatWidgetMessage.deleteMany({});
  const chatSessions = await prisma.chatWidgetSession.deleteMany({});
  console.log(`Deleted ${chatMsgs.count} chat messages and ${chatSessions.count} chat sessions.`);

  const voiceLogs = await prisma.voiceSessionLog.deleteMany({});
  console.log(`Deleted ${voiceLogs.count} voice AI logs.`);
}

main()
  .catch(e => {
    console.error("Error clearing logs:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
