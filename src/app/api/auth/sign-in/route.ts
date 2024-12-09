import { prisma } from "@/lib/prisma"; // Exemplo de uso do Prisma
import { compare } from "bcrypt-ts"; // Usando bcrypt para comparar a senha
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // Obtém os dados enviados pela requisição
    const { email, password } = await req.json();
  
    // Encontra o utilizador no banco de dados
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    // Se não existir o utilizador
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Email ou palavra-passe errada" }),
        { status: 400 }
      );
    }
  
    // Verifica se a senha é igual à senha criptografada
    const isPasswordValid = await compare(password, user.password);
  
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Email ou palavra-passe errada" }),
        { status: 400 }
      );
    }
  
    // Gera o token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'default_secret', // Chave secreta
      { expiresIn: '1h', algorithm: 'HS256' }
    );
  
    // Define o cookie com o token, com as configurações de segurança
    const cookie = cookies();
    await (await cookie).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hora
      path: '/',
    });
  
    // Retorna uma resposta de sucesso
    return new Response(
      JSON.stringify({ message: "Login successful" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no servidor:", error);
    return new Response(
      JSON.stringify({ message: "Erro interno do servidor" }),
      { status: 500 }
    );
  }
}