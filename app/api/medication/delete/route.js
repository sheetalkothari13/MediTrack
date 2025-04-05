import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { medicationId, userId } = await request.json();

    console.log(medicationId, userId);
    if (!medicationId || !userId) {
      return Response.json({ error: 'Medication ID and User ID are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const medication = await prisma.medication.findFirst({
      where: {
        id: medicationId,
        userId: userId
      }
    });

    if (!medication) {
      return Response.json({ error: 'Medication not found or unauthorized' }, { status: 404 });
    }

    await prisma.medication.delete({
      where: {
        id: medicationId
      }
    });

    return Response.json({ message: 'Medication deleted successfully' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
