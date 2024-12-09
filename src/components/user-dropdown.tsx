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
  id: string;
  email: string;
  name: string;
}

interface DropdownMenuUserProps {
  user: User | null;
}

export function DropdownMenuUser({ user }: DropdownMenuUserProps) {
  async function handleRevokeToken() {
    await deleteToken();
    window.location.href = "/";
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
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
