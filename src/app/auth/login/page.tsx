import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import SignIn from "./_component/sign-in";
import Link from "next/link";

export default async function LogIn() {
  const session = await auth();
  const user = session?.user;

  if (user) redirect("/transactions");
  return (
    <section className="min-h-[calc(100vh-7rem-8px)] flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <SignIn />
          {/* google signin */}

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirect: false });
            }}
          >
            <Button
              type="submit"
              variant={"outline"}
              className="w-full text-lg  font-semibold"
            >
              Sign in With Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
