import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UpdateTransactionDialogProps {
  children: ReactNode;
  isOpen: boolean;
  toggleModal: () => void;
}

export default function UpdateTransactionDialog({
  children,
  isOpen,
  toggleModal,
}: UpdateTransactionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Transaction</DialogTitle>
          <DialogDescription>
            Update transaction details. Click update Transaction when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
