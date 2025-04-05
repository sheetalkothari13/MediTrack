import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const { medicationId, name, dosage, frequency, startDate, notes, status, userId } = await request.json();

    if (!medicationId || !userId) {
      return Response.json({ error: 'Medication ID and User ID are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const existingMedication = await prisma.medication.findFirst({
      where: {
        id: medicationId,
        userId: userId
      }
    });

    if (!existingMedication) {
      return Response.json({ error: 'Medication not found or unauthorized' }, { status: 404 });
    }

    const updatedMedication = await prisma.medication.update({
      where: {
        id: medicationId
      },
      data: {
        name,
        dosage,
        frequency,
        startDate: startDate ? new Date(startDate) : undefined,
        notes,
        status
      }
    });

    return Response.json(updatedMedication);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
