import type { User } from "@/components/header";
import { getUserFromToken } from "./get-user-from-token";

export default async function Home() {
  const user: User | null = await getUserFromToken();

  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
      {user ? (
        <div className="bg-green-100 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-semibold text-green-700 mb-4">
            Bem-vindo de volta, {user.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Estamos felizes por tê-lo de volta. Aqui estão os seus dados:
          </p>
          <div className="mt-4 text-gray-700">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-red-100 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-semibold text-red-700 mb-4">
            Não está autenticado
          </h1>
          <p className="text-lg text-gray-600">Por favor, inicie sessão.</p>
        </div>
      )}
    </div>
  );
}
