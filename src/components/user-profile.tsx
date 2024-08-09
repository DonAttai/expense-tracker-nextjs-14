import { ArrowRightLeft, Lock, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getSession from "@/lib/get-session";
import Link from "next/link";
import { signOut } from "@/auth";

export async function UserProfileButton() {
  const session = await getSession();
  const user = session?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback>
            <User className="font-bold text-gray-400" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.name || "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/transactions" className="sm:hidden">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Transactions
            </Link>
          </DropdownMenuItem>

          {user?.role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Lock className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="font-semibold">Logout</button>
    </form>
  );
}
