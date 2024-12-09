"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password is required"),
});

export default function SignInForm() {
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
      // Enviar as credenciais para a API de login
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
        console.log(errorData);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
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
                      placeholder="example@example.com"
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
                  <FormLabel>Password</FormLabel>
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
                        placeholder="Password"
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeClosed className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm text-gray-200">
              <p>
                {`Don't`} have an account?{" "}
                <Link href={"/auth/sign-up"} className="font-bold">
                  Register
                </Link>
              </p>
            </div>
            <Button type="submit" className="rounded h-[40px]">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
