"use client";
import { deleteTransactionAction } from "@/actions/transaction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Transaction } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
interface DeleteTransactionDailogProps {
  isOpen: boolean;
  toggleModal: () => void;
  transaction: Transaction;
}
export function DeleteTransactionDailog({
  isOpen,
  toggleModal,
  transaction,
}: DeleteTransactionDailogProps) {
  const { id: transactionId } = transaction;

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTransactionAction,
  });

  const deleteTransaction = () => {
    mutate(transactionId);
    toggleModal();
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={toggleModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={toggleModal}>
            Cancel
          </Button>
          <Button disabled={isPending} onClick={deleteTransaction}>
            {isPending ? "Deleting..." : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
