import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const medications = await prisma.medication.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        startDate: 'desc'
      }
    });

    return Response.json(medications);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
