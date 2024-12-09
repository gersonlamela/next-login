import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

interface DecodedToken {
  userId?: string;
}

export async function getUserFromToken() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    console.log('Token not found');
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as DecodedToken;

    if (!decoded?.userId) {
      console.log('Invalid token');
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      console.log('User not found');
      return null;
    }

    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error decoding token or fetching user:', error);
    return null;
  }
}