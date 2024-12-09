import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteToken } from "@/app/delete-token";

export interface User {
  id: number;
  email: string;
  name: string;
}

interface DropdownMenuUserProps {
  user: User | null; // Permite que user seja null
}

export function DropdownMenuUser({ user }: DropdownMenuUserProps) {
  async function handleRevokeToken() {
    await deleteToken();
    // Após revogar o token, você pode redirecionar o usuário ou realizar outras ações
    window.location.href = "/"; // Redireciona para a página inicial (ajuste conforme necessário)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{user?.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuLabel className="text-gray-400 text-sm">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleRevokeToken}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
