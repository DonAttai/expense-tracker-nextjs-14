import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  transactionSchema,
  TransactionType,
} from "@/schemas/transaction-schema";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toastErrorMessage, toastSuccessMessage } from "@/lib/toast";
import { updateTransactionAction } from "@/actions/transaction";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "@prisma/client";

interface UpdateTransactionFormProps {
  transaction: Transaction;
  toggleModal: () => void;
}

export default function UpdateTransactionForm({
  transaction,
  toggleModal,
}: UpdateTransactionFormProps) {
  const { amount, id, type, description } = transaction;
  const form = useForm<TransactionType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount,
      type: type as TransactionType["type"],
      description,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateTransactionAction,
    onSuccess: (data) => {
      form.reset();
      toastSuccessMessage("transaction was successfully created");
      toggleModal();
    },

    onError: (error) => {
      toastErrorMessage(error.message);
    },
  });

  const onSubmit = (values: TransactionType) => {
    mutate({ id, values });
  };

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Decription" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Transaction Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EXPENSE">Expense</SelectItem>
                    <SelectItem value="INCOME">Income</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-lg disabled:opacity-50"
          >
            {isPending ? (
              <Loader className="animate-spin inline-block" />
            ) : (
              "Update Transaction"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
