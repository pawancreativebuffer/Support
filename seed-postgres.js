const { PrismaClient } = require('./src/generated/postgres-client');
const bcrypt = require('bcryptjs');

async function seedUsers() {
  const prisma = new PrismaClient();
  try {
    const adminPasswordHash = await bcrypt.hash('admin', 10);
    const agentPasswordHash = await bcrypt.hash('agent', 10);

    // Create Admin
    const admin = await prisma.portalUser.create({
      data: {
        email: 'admin@gmail.com',
        name: 'admin',
        passwordHash: adminPasswordHash,
        role: 'ADMIN',
        isActive: true
      }
    });
    console.log("Admin created:", admin.email);

    // Create Agent
    const agent = await prisma.portalUser.create({
      data: {
        email: 'agent@gmail.com',
        name: 'agent',
        passwordHash: agentPasswordHash,
        role: 'AGENT',
        isActive: true
      }
    });
    console.log("Agent created:", agent.email);

  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers();
