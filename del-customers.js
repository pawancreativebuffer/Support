const { PrismaClient } = require('./src/generated/postgres-client');

async function removeCustomers() {
  const prisma = new PrismaClient();
  try {
    const deleted = await prisma.portalUser.deleteMany({
      where: {
        role: 'CUSTOMER'
      }
    });
    console.log(`Deleted ${deleted.count} customers from PostgreSQL.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

removeCustomers();
