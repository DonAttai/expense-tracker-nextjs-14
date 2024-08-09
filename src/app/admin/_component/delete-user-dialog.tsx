"use client";
import { deleteUserAction } from "@/actions/user";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toastErrorMessage, toastSuccessMessage } from "@/lib/toast";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
interface DeleteTransactionDailogProps {
  isOpen: boolean;
  toggleModal: () => void;
  user: User;
}
export function DeleteUserDailog({
  isOpen,
  toggleModal,
  user,
}: DeleteTransactionDailogProps) {
  const { id: userId } = user;

  const { mutate, isPending } = useMutation({
    mutationFn: deleteUserAction,
    onSuccess: () => {
      toastSuccessMessage("User was successfully deleted");
    },
    onError: (error) => {
      toastErrorMessage(error.message);
    },
  });

  const deleteUser = () => {
    mutate(userId);
    toggleModal();
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={toggleModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={toggleModal}>
            Cancel
          </Button>
          <Button disabled={isPending} onClick={deleteUser}>
            {isPending ? "Deleting..." : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
