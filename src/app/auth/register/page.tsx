import React from "react";
import Register from "./_components/register";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/transactions");
  }
  return (
    <div className="min-h-[calc(100vh-7rem-8px)] flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Register />
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirect: false });
            }}
            className="my-2"
          >
            <Button type="submit" variant={"outline"} className="w-full">
              Sign Up With Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
