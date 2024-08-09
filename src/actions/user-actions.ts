"use server";
// import { db } from "@/lib/db";
import { compare, hash } from "bcryptjs";
import {
  UserWithRoleType,
  userSchema,
  UserType,
  userSchemaWithRole,
} from "@/schemas/user-schema";
import { revalidatePath } from "next/cache";
import { signInSchema, SignInType } from "@/schemas/sign-in-schema";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import db from "@/lib/db";

// export const createAdminAction = async (userData: UserWithRoleType) => {
//   const validatedData = userSchemaWithRole.safeParse(userData);
//   if (!validatedData.success) {
//     throw new Error("Invalid request body!");
//   }
//   const { data } = validatedData;

//   try {
//     let user = await getUserByEmail(data.email);
//     if (user) throw new Error("Email has been taken");

//     // hash password
//     data.password = await hash(data.password, 10);
//     // create user
//     user = await db.user.create({ data });
//     // revalidate path
//     revalidatePath("/admin/dashboard/users");
//     return user;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("Server error");
//     }
//   }
// };

// create user action
export const createUserAction = async (userData: UserType) => {
  const validatedData = userSchema.safeParse(userData);
  if (!validatedData.success) {
    throw new Error("Invalid request body!");
  }
  const { data } = validatedData;

  try {
    let user = await getUserByEmail(data.email);
    if (user) throw new Error("Email has been taken");

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
  redirect("/login");
};

// sign in action
// export const signInAction = async (values: SignInType) => {
//   try {
//     const { email, password } = await signInSchema.parseAsync(values);
//     const user = await db.user.findUnique({ where: { email } });
//     if (!user) throw new Error("Invalid email or password");
//     if (user && (await compare(password, user.password))) {
//       // generate token
//       const token = jwt.sign(
//         { sub: user.id, role: user.role },
//         process.env.JWT_SECRET!,
//         {
//           expiresIn: "15m",
//         }
//       );

//       // set cookies
//       cookies().set("access-token", token);
//       return { message: "Login successful" };
//     }
//     throw new Error("Invalid email or password");
//   } catch (error) {
//     if (error instanceof ZodError) {
//       throw new Error("Invalid credentials");
//     } else {
//       throw error;
//     }
//   }
//   // redirect("/dashboard");
// };

export const signInAction = async (values: SignInType) => {
  try {
    const { email, password } = await signInSchema.parseAsync(values);

    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/transactions",
      email,
      password,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error("Invalid credentials");
    } else {
      throw error;
    }
  }

  redirect("/dashboard");
};

// get user by email
const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } });
};

// logout action form custom auth
export async function logoutAction() {
  const getCookies = cookies();
  getCookies.delete("access-token");
  redirect("/login");
}

export async function signOutAction() {
  await signOut();
}
