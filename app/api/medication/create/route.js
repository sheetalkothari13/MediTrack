import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, dosage, frequency, startDate, notes, status, userId } = await request.json();
    
    
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const medication = await prisma.medication.create({
      data: {
        name,
        dosage,
        frequency,
        startDate: new Date(startDate),
        notes,
        status,
        userId
      }
    });

    return Response.json(medication);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
} 