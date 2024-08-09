import db from "@/lib/db";
import { userSchemaWithRole, UserWithRoleType } from "@/schemas/user-schema";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";

export const createUserAction = async (userData: UserWithRoleType) => {
  const validatedData = userSchemaWithRole.safeParse(userData);
  if (!validatedData.success) {
    throw new Error("Invalid request body!");
  }
  const { data } = validatedData;

  try {
    let user = await db.user.findUnique({ where: { email: data.email } });
    if (user) throw new Error("Email has been taken");

    // hash password
    data.password = await hash(data.password, 10);
    // create user
    user = await db.user.create({ data });
    // revalidate path
    revalidatePath("/admin");
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
};
