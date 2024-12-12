"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordChecklist from "react-password-checklist";

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
import { toast } from "sonner";

const SignInSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "As palavras-passe devem coincidir!",
      path: ["confirmPassword"],
    }
  );

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      name: "",
      email: "",
      password: password,
      confirmPassword: confirmPassword,
    },
  });

  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    try {
      const response = await fetch("/api/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.status === 201) {
        window.location.href = "/sign-in";
      } else {
        const errorData = await response.json();
        if (errorData?.message) {
          toast.error(errorData.message);
        } else {
          toast.error("Erro ao tentar autenticar. Verifique suas credenciais.");
        }
      }
    } catch (error: unknown) {
      console.log("Erro ao registar utilizador:", error);
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
            <div className="flex  flex-col gap-[16px]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border border-gray-200 w-[280px] rounded"
                        placeholder="Nome"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          className="absolute right-16 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeClosed className="h-5 w-5 " />
                          ) : (
                            <Eye className="h-5 w-5 " />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Palavra-passe</FormLabel>
                    <FormControl className="relative">
                      <div className="w-full relative">
                        <Input
                          {...field}
                          value={confirmPassword}
                          onChange={(e) => {
                            const newPassword = e.target.value;
                            setConfirmPassword(newPassword);
                            field.onChange(newPassword);
                          }}
                          type={showConfirmPassword ? "text" : "password"}
                          className="border border-gray-200 w-[280px] rounded"
                          placeholder="Palavra-passe"
                        />
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-16 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                          {showConfirmPassword ? (
                            <EyeClosed className="h-5 w-5 text-primary-white" />
                          ) : (
                            <Eye className="h-5 w-5 text-primary-white" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                messages={{
                  minLength: "A palavra-passe tem mais de 8 caracteres.",
                  specialChar: "A palavra-passe contém caracteres especiais.",
                  number: "A palavra-passe contém um número.",
                  capital: "A palavra-passe contém uma letra maiúscula.",
                  match: "As palavras-passe coincidem.",
                }}
                value={password}
                valueAgain={confirmPassword}
                onChange={(isValid) => {
                  setIsValid(isValid);
                }}
              />
              <div className="text-sm ">
                <p>
                  Já tem uma conta?{" "}
                  <Link href={"/auth/sign-in"} className="font-bold">
                    Iniciar sessão
                  </Link>
                </p>
              </div>
              <Button
                type="submit"
                className=" rounded h-[40px]"
                disabled={!isValid}
              >
                Registar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
