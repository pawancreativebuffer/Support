import { PrismaClient } from '@prisma/client';

let prismaInstance: any = null;

if (process.env.DATABASE_URL) {
  try {
    const rawClient = new PrismaClient();

    prismaInstance = rawClient.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            const blockedOperations = [
              'create',
              'update',
              'delete',
              'createMany',
              'updateMany',
              'deleteMany',
              'upsert'
            ];

            if (blockedOperations.includes(operation)) {
              throw new Error(
                `Database mutation query blocked: Operation '${operation}' on model '${model}' is strictly forbidden. The application is running in read-only mode.`
              );
            }
            return query(args);
          }
        }
      }
    });
  } catch (err) {
    console.error("Failed to initialize Prisma Client:", err);
  }
}

export const prisma = prismaInstance;
