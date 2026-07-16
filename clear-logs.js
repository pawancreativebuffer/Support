const { PrismaClient } = require('./src/generated/postgres-client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:root@localhost:5432/support_portal"
        }
    }
});

async function main() {
  console.log("Clearing all Call Logs from the database...");
  const result = await prisma.callLog.deleteMany({});
  console.log(`Successfully deleted ${result.count} old call logs!`);
}

main()
  .catch(e => {
    console.error("Error clearing logs:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
