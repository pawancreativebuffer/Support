import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.users.findMany({
      take: 10,
      select: {
        Login: true,
        Email: true,
        FirstName: true,
        LastName: true,
        IsActive: true
      }
    });
    console.log("SQL SERVER USERS (First 10):", JSON.stringify(users, null, 2));
  } catch (err: any) {
    console.error("Error querying Users:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
