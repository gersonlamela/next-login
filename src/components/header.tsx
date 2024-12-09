"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { DropdownMenuUser } from "./user-dropdown";
import { useEffect, useState } from "react";

export interface User {
  id: number;
  email: string;
  name: string;
}

interface HeaderProps {
  user: User | null; // Permite que user seja null
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const [userAuth, setUserAuth] = useState<typeof user>(user);

  useEffect(() => {
    setUserAuth(user);
  }, [user]);

  return (
    <div className="w-full h-[80px] border-b flex items-center justify-between px-[50px] lg:px-[168px]">
      <Link href={"/"}>Sistema Login</Link>
      <div className="flex items-center justify-center gap-[15px]">
        {userAuth?.name ? (
          <DropdownMenuUser user={userAuth} />
        ) : (
          <Link
            href={`${
              pathname === "/auth/sign-in" ? "/auth/sign-up" : "/auth/sign-in"
            }`}
          >
            <Button variant={"outline"}>
              {pathname === "/auth/sign-in" ? "Registar" : "Iniciar sessão"}{" "}
              <LogIn size={4} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
