import db from "@/lib/db";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { CreateTransaction } from "./_components/create-transaction";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function Transctions() {
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect("/");

  const transactions = await db.transaction?.findMany({
    where: { userId: user?.id },
    orderBy: {
      createdAt: "desc",
    },
  });

  // calculate total income
  const income = transactions
    .filter((transaction) => transaction.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // calculate total expenses
  const expenses = transactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // formatted income
  const formattedIncome = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(income);

  // formatted expenses
  const formattedExpenses = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(expenses);

  // balance
  const balance = income - expenses;

  // fofrmatted balance
  const formattedBalance = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  return (
    <div className="min-h-[calc(100vh-4rem)] container mx-auto py-10">
      <div>
        <div className="text-center sm:text-right ">
          <CreateTransaction />
        </div>
        <div className="py-8 sm:py-4">
          <Card className="py-4 sm:max-w-56">
            <CardContent>
              <div className="flex flex-wrap gap-2 justify-between mb-2">
                <span>
                  <span className="font-bold text-lg">Income</span>: NGN
                  {formattedIncome.toLocaleString()}
                </span>
                <span>
                  <span className="font-bold text-lg">Expense</span>: NGN
                  {formattedExpenses.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-bold text-lg">Balance</span>: NGN
                {formattedBalance.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
        <h3 className="text-2xl font-semibold text-center mb-2">
          Transactions
        </h3>
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}
