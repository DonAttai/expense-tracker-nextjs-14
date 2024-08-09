import "server-only";
import { User } from "@prisma/client";
import db from "./db";

// get user by email from db
export async function getUser(email: string): Promise<User | null> {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
}
