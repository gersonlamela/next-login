import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from './lib/prisma';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verifica o JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    
    // Obtém o userId do token (no caso, `sub` pode ser o userId)
    const userIdFromToken = decoded.sub;

    // Verifique se o userId existe no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: userIdFromToken },
    });

    if (!user) {
      // Se o usuário não for encontrado, redireciona para o login
      return NextResponse.redirect(new URL('/login', req.url));
    }

  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Permite que a requisição continue
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'], // Rotas protegidas
};