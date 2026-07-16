const { PrismaClient } = require('./src/generated/postgres-client');
const prisma = new PrismaClient({
    datasources: { db: { url: 'postgresql://postgres:root@localhost:5432/support_portal' } }
});
async function main() {
  const log = await prisma.callLog.findFirst({ orderBy: { createdAt: 'desc' } });
  console.log("Transcript:");
  console.log(log.transcript);
}
main().finally(() => prisma.$disconnect());
