"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";

const SignInSchema = z.object({
  email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
  password: z.string(),
});

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: password,
    },
  });

  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    const { email, password } = data;

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        if (errorData?.message) {
          toast.error(errorData.message);
        } else {
          toast.error("Erro ao tentar autenticar. Verifique suas credenciais.");
        }
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      toast.error("Erro inesperado. Por favor, tente novamente.");
    }
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full h-auto flex flex-col items-start gap-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-center flex-col w-full gap-[16px]"
          >
            <div className="flex flex-col gap-[16px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border border-gray-200 w-[280px] rounded"
                        placeholder="exemplo@exemplo.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Palavra-passe</FormLabel>
                    <FormControl className="relative">
                      <div className="w-full relative">
                        <Input
                          {...field}
                          value={password}
                          onChange={(e) => {
                            const newPassword = e.target.value;
                            setPassword(newPassword);
                            field.onChange(newPassword);
                          }}
                          type={showPassword ? "text" : "password"}
                          className="border border-gray-200 w-[280px] rounded"
                          placeholder="Palavra-passe"
                        />
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeClosed className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm ">
                <p>
                  Não tens conta?{" "}
                  <Link href={"/auth/sign-up"} className="font-bold">
                    Registar
                  </Link>
                </p>
              </div>
              <Button type="submit" className="rounded h-[40px]">
                Iniciar sessão
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
