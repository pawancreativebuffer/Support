import { PrismaClient } from '@prisma/client';

let prismaInstance: PrismaClient | null = null;

if (process.env.DATABASE_URL) {
  try {
    prismaInstance = new PrismaClient();
  } catch (err) {
    console.error("Failed to initialize Prisma Client:", err);
  }
}

export const prisma = prismaInstance;
