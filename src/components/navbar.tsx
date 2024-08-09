import React from "react";
import { Nav, NavLink } from "./nav-links";
import { UserProfileButton } from "./user-profile";
import getSession from "@/lib/get-session";
import Link from "next/link";

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;
  return (
    <Nav>
      <Link href={"/"} className="text-lg font-semibold hidden sm:block">
        Expense Tracker
      </Link>
      <div>
        {user ? (
          <div className="flex gap-4 items-center">
            <NavLink href={"/transactions"}>Transactions</NavLink>
            <UserProfileButton />
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <NavLink href={"/auth/register"}>Register</NavLink>
            <NavLink href={"/auth/login"}>Login</NavLink>
          </div>
        )}
      </div>
    </Nav>
  );
}
