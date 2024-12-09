/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma'; // Certifique-se de que está configurado corretamente

export async function getUserFromToken() {
  const token = (await cookies()).get("token")?.value; // Acessando o valor do token nos cookies

  if (!token) {
    console.log('Token not found');
    return null; // Caso o token não exista
  }

  try {
    // Decodifica o token sem verificar sua validade
    const decoded: any = jwt.decode(token); // Fornecendo tipo `any` para o decodificado

    if (!decoded || !decoded.userId) {
      console.log('Invalid token');
      return null; // Caso o token não tenha uma carga útil válida ou não tenha o userId
    }

    // Agora que temos o userId, podemos buscar o usuário no banco de dados (Prisma)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }, // Busca pelo ID do usuário decodificado
      select:{
        id:true,
        name:true,
        email:true,
        password:false

      }
    });

    if (!user) {
      console.log('User not found');
      return null; // Caso o usuário não seja encontrado no banco
    }

    console.log('User found:', user);
    return user; // Retorna o usuário encontrado no banco
  } catch (error) {
    console.error('Error decoding token or fetching user:', error);
    return null; // Retorna null se houver um erro ao decodificar ou buscar o usuário
  }
}