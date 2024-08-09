"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserAction } from "@/actions/user";
import { userSchema, UserType } from "@/schemas/user-schema";
import toast from "react-hot-toast";
import {
  FormField,
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toastSuccessMessage } from "@/lib/toast";

export default function Register() {
  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createUserAction,

    onSuccess: () => {
      toastSuccessMessage("Account was successfully created");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: UserType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
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
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full text-lg">
          {isPending ? (
            <Loader className="animate-spin inline-block disabled:opacity-50" />
          ) : (
            "Create User"
          )}
        </Button>
      </form>
    </Form>
  );
}
