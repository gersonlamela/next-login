import { prisma } from "@/lib/prisma"; // Exemplo de uso do Prisma
import { compare } from "bcrypt-ts"; // Usando bcrypt para comparar a senha
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  // Obtém os dados enviados pela requisição
  const { email, password } = await req.json();

  // Encontra o usuário no banco de dados
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 400 }
    );
  }

  // Verifica se a senha é correta
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 400 }
    );
  }

  // Gera o token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || "default_secret", // Usar uma chave secreta forte
    { expiresIn: "1h" }
  );

  // Define o cookie com o token, com as configurações de segurança
  const cookie = cookies(); // Access the cookies
    (await cookie).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

  // Retorna uma resposta de sucesso com o token (caso queira retornar o token no corpo da resposta)
  return new Response(
    JSON.stringify({ message: "Login successful" }),
    { status: 200 }
  );
}