import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.coerce.number().positive(),
  type: z.enum(["EXPENSE", "INCOME"]),
  description: z.string().min(1, { message: "Description required" }),
});
export type TransactionType = z.infer<typeof transactionSchema>;
