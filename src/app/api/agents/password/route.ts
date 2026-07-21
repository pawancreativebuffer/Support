import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { agentId, newPassword } = await req.json();

    if (!agentId || !newPassword) {
      return NextResponse.json({ error: 'Agent ID and New Password are required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'PostgreSQL database connection is not active' }, { status: 500 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await postgresPrisma.portalUser.update({
      where: { id: parseInt(agentId) },
      data: { passwordHash: passwordHash }
    });

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
