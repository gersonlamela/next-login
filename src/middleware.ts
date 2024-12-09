import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verifica o JWT
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    return NextResponse.next(); // Permite continuar para a rota
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect(new URL('/login', req.url)); // Redireciona para login se o token for inválido
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'], // Rotas protegidas
};