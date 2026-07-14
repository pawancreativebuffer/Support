const { PrismaClient } = require('./src/generated/postgres-client');

async function del() {
  const prisma = new PrismaClient();
  try {
    await prisma.portalUser.deleteMany({
      where: {
        email: {
          contains: '.doe'
        }
      }
    });
    console.log('Deleted .doe users');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

del();
