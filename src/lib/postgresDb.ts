import { PrismaClient } from '../generated/postgres-client';

let postgresPrismaInstance: PrismaClient | null = null;

if (process.env.SUPPORT_DATABASE_URL) {
  try {
    postgresPrismaInstance = new PrismaClient({
      datasources: {
        db: {
          url: process.env.SUPPORT_DATABASE_URL
        }
      }
    });
  } catch (err) {
    console.error("Failed to initialize PostgreSQL Prisma Client:", err);
  }
}

export const postgresPrisma = postgresPrismaInstance;
