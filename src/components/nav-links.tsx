"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
import { usePathname } from "next/navigation";

type LinkProps = Omit<ComponentProps<typeof Link>, "className">;
export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="h-16 bg-slate-400 flex items-center justify-end px-8  text-white  sm:justify-between sm:px-24">
      {children}
    </nav>
  );
}

export function NavLink(props: LinkProps) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn("text-lg font-semibold", {
        "bg-gray-600 px-2 py-1 rounded-md  ": pathname === props.href,
        "hidden sm:block": pathname === "/transactions",
      })}
    />
  );
}
