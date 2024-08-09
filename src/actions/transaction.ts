"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import {
  transactionSchema,
  TransactionType,
} from "@/schemas/transaction-schema";
import { revalidatePath } from "next/cache";

// create transaction
export const createTransactionAction = async (formData: TransactionType) => {
  const validatedData = transactionSchema.safeParse(formData);
  if (!validatedData.success) {
    throw new Error("Invalid transaction data");
  }
  const { data } = validatedData;
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("unauthorised");
    }
    const transactions = await db.transaction.findMany({ where: { userId } });

    // income
    const income = transactions
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, curr) => acc + curr.amount, 0);

    // expenses
    const expenses = transactions
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, curr) => acc + curr.amount, 0);

    // check if expense in greater than income
    if (data.type === "EXPENSE") {
      if (income < expenses + data.amount) {
        throw new Error("Expenses cannot be greater that income");
      }
    }

    await db.transaction.create({
      data: { ...data, userId },
    });
    revalidatePath("/transactions");
  } catch (error) {
    throw error;
  }
};

// update transaction action
export const updateTransactionAction = async ({
  id,
  values,
}: {
  id: string;
  values: TransactionType;
}) => {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const validatedData = transactionSchema.safeParse(values);
    if (!validatedData.success) {
      throw new Error("Invalid transaction data");
    }
    const { data } = validatedData;

    const transaction = await db.transaction.findUnique({ where: { id } });
    if (!transaction) {
      throw new Error("Transaction not found!");
    }

    if (!userId) {
      throw new Error("unauthorised");
    }
    const transactions = await db.transaction.findMany({ where: { userId } });

    // income
    const income = transactions
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, curr) => acc + curr.amount, 0);

    // expenses
    const expenses = transactions
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, curr) => acc + curr.amount, 0);

    // check if expense in greater than income
    if (data.type === "EXPENSE") {
      if (transactions.length <= 1) {
        throw new Error("Not allowed");
      }
      if (income < expenses + data.amount) {
        throw new Error("Expenses cannot be greater that income");
      }
    }

    await db.transaction.update({
      where: { id },
      data: { ...data },
    });
    revalidatePath("/transactions");
  } catch (error) {
    throw error;
  }
};

// delete transaction action
export const deleteTransactionAction = async (id: string) => {
  try {
    const transaction = await db.transaction.findUnique({ where: { id } });
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    await db.transaction.delete({ where: { id } });
    revalidatePath("/transactions");
  } catch (error) {
    throw error;
  }
};
