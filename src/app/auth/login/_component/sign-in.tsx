"use client";

import { signInAction } from "@/actions/user";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInType } from "@/schemas/sign-in-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toastErrorMessage, toastSuccessMessage } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signInAction,
    onSuccess: (data) => {
      if (data.success) {
        window.location.href = "/transactions";
        // router.push("/transactions");
        toastSuccessMessage("Login successful");
      }
    },
    onError: () => {
      toastErrorMessage("Invalid email or password");
    },
  });

  const onSubmit = async (values: SignInType) => {
    mutate(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid w-full items-center gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="text-xl font-semibold mb-2 disabled:opacity-50"
            >
              {isPending ? (
                <Loader className="animate-spin inline-block" />
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
