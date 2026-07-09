import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Checking if john.doe exists in SQL Server...");
    const existing = await prisma.users.findFirst({
      where: { Login: 'john.doe' }
    });

    if (existing) {
      console.log("john.doe already exists:", existing);
      return;
    }

    console.log("Attempting to insert john.doe into SQL Server...");
    const newUser = await prisma.users.create({
      data: {
        Login: 'john.doe',
        Email: 'john.doe@ticket-it.com',
        FirstName: 'John',
        LastName: 'Doe',
        AddressLine1: '123 Support Lane',
        Phone: '123-456-7890',
        Client: 'Support Agent Client',
        RegionName: 'Global',
        IsActive: true,
        UserPassword: '', // Dev passwords like "admin", "password", "root" will work
        IsPasswordChangeRequired: false,
        HasDigitalContentEnabled: false,
        IsHeadOfficeAdmin: false,
        IsUserInvoicing: true,
        StoreCategory: ''
      }
    });

    console.log("Successfully inserted john.doe:", newUser);
  } catch (err: any) {
    console.error("SQL Server Insert Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
