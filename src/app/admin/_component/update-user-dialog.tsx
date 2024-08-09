"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toastErrorMessage, toastSuccessMessage } from "@/lib/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUserSchema, UpdateUserType } from "@/schemas/user-schema";
import { updateUserAction } from "@/actions/user";
import { User } from "@prisma/client";

type UpdateUserDialogProps = {
  user: User;
  isOpen: boolean;
  toggleModal: () => void;
};

export function UpdateUserDialog({
  user,
  isOpen,
  toggleModal,
}: UpdateUserDialogProps) {
  const { id, name, role, status } = user;
  const form = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      role,
      status,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserAction,
    onSuccess: () => {
      form.reset();
      toastSuccessMessage("User was successfully updated");
      toggleModal();
    },

    onError: (error) => {
      toastErrorMessage(error.message);
    },
  });

  const onSubmit = (values: UpdateUserType) => {
    mutate({ id, values });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => toggleModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update {name}</DialogTitle>
          <DialogDescription>Update the user role or status</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
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
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
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
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="w-full text-lg"
              >
                {isPending ? (
                  <Loader className="animate-spin inline-block" />
                ) : (
                  "Update User"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
