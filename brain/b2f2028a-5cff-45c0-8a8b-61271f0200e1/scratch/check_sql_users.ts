import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.users.findMany({
      take: 5,
      select: {
        Id: true,
        Login: true,
        Email: true,
        FirstName: true,
        LastName: true
      }
    });
    console.log("SQL Server Users (sample):", JSON.stringify(users, null, 2));

    const john = await prisma.users.findFirst({
      where: {
        OR: [
          { Login: { contains: 'john' } },
          { Email: { contains: 'john' } }
        ]
      }
    });
    console.log("Search for 'john':", john);
  } catch (err) {
    console.error("Error querying SQL Server:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
