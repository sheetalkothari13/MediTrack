import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token.value, JWT_SECRET);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      if (!user) {
        return NextResponse.json({ user: null }, { status: 401 });
      }

      return NextResponse.json({ user });
    } catch (error) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
  } catch (error) {
    console.error('Error checking session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 