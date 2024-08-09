import { z } from "zod";

export const userSchemaWithRole = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  name: z.string().min(3, { message: "Name must be at least 3 character" }),
  role: z.enum(["ADMIN", "USER"]),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const userSchema = userSchemaWithRole.omit({ role: true });

export type UserWithRoleType = z.infer<typeof userSchemaWithRole>;
export type UserType = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  role: z.enum(["ADMIN", "USER"]),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;
