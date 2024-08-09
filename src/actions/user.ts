"use server";

import { auth, signIn } from "@/auth";
import db from "@/lib/db";
import { signInSchema, SignInType } from "@/schemas/sign-in-schema";
import {
  updateUserSchema,
  UpdateUserType,
  userSchema,
  UserType,
} from "@/schemas/user-schema";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

// create user
export const createUserAction = async (userData: UserType) => {
  const validatedData = userSchema.safeParse(userData);
  if (!validatedData.success) {
    throw new Error("Invalid request body!");
  }
  const { data } = validatedData;

  try {
    let user = await db.user.findUnique({ where: { email: data.email! } });
    if (user) throw new Error(`Account with the email: ${data.email} exists`);

    // hash password
    data.password = await hash(data.password, 10);
    await db.user.create({ data });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Server error");
    }
  }
  redirect("/auth/login");
};

// sign in with credentials action
export const signInAction = async (values: SignInType) => {
  try {
    const { email, password } = await signInSchema.parseAsync(values);
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error("Invalid credentials");
    }
    throw error;
  }
};

// update user action
export const updateUserAction = async ({
  id,
  values,
}: {
  id: string;
  values: UpdateUserType;
}) => {
  const session = await auth();
  const userId = session?.user.id;
  try {
    const validatedData = updateUserSchema.safeParse(values);
    if (!validatedData.success) {
      throw new Error("Invalid data type");
    }

    const { data } = validatedData;

    if (!userId) throw new Error("Unauthorized");
    if (userId === id) {
      throw new Error("You can't update your own details");
    }

    await db.user.update({ where: { id }, data: { ...data } });
    revalidatePath("/admin");
  } catch (error) {
    throw error;
  }
};

// delete user action
export const deleteUserAction = async (id: string) => {
  const session = await auth();
  const userId = session?.user.id;

  try {
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    if (userId === id) {
      throw new Error("You can't delete your won account ");
    }
    await db.user.delete({ where: { id } });
    revalidatePath("/admin");
  } catch (error) {
    throw error;
  }
};
