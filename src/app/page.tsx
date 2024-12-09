import { User } from "@/components/header";
import { getUserFromToken } from "./get-user-from-token";

export default async function Home() {
  const user: User | null = await getUserFromToken(); // Now user can be null

  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
      {user ? (
        <div className="bg-green-100 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-semibold text-green-700 mb-4">
            Welcome back, {user.name}!
          </h1>
          <p className="text-lg text-gray-600">
            We’re happy to have you back. Here are your details:
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
            You are not logged in
          </h1>
          <p className="text-lg text-gray-600">Please log in.</p>
        </div>
      )}
    </div>
  );
}
