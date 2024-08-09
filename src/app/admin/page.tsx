import db from "@/lib/db";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { DataTable } from "./_component/data-table";
import { columns } from "./_component/columns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function Admin() {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/auth/login");

  const users = await db.user.findMany({});

  if (user?.role !== "ADMIN") {
    return (
      <h3 className="text-3xl min-h-[calc(100vh-4rem)]">
        You are not authorised to view this page
      </h3>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}
