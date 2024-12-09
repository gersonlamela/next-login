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
import axios from "axios";

const SignInSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export default function SignUpForm() {
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
      // Chamada à API
      const response = await axios.post("/api/auth/createUser", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        window.location.href = "/";
      }
    } catch (error: unknown) {
      console.error("Error registering user:", error);
    }
  }

  return (
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-gray-200 w-[280px] rounded"
                      placeholder="Name"
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
                          <EyeClosed className="h-5 w-5 " />
                        ) : (
                          <Eye className="h-5 w-5 " />
                        )}
                      </div>
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
                  <FormLabel>Confirm Password</FormLabel>
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
                        placeholder="Password"
                      />
                      <div
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeClosed className="h-5 w-5 text-primary-white" />
                        ) : (
                          <Eye className="h-5 w-5 text-primary-white" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={confirmPassword}
              onChange={(isValid) => {
                setIsValid(isValid);
              }}
            />
            <div className="text-sm text-gray-200">
              <p>
                Already have an account?{" "}
                <Link href={"/auth/sign-in"} className="font-bold">
                  Login
                </Link>
              </p>
            </div>
            <Button
              type="submit"
              className=" rounded h-[40px]"
              disabled={!isValid}
            >
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
