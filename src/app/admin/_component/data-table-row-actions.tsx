import React, { useReducer } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { User } from "@prisma/client";
import { UpdateUserDialog } from "./update-user-dialog";
import { DeleteUserDailog } from "./delete-user-dialog";

interface DataTableRowActionProps<TData> {
  row: Row<TData>;
}

export default function DatatableRowActions({
  row,
}: DataTableRowActionProps<User>) {
  const user = row.original;
  const [isUpdateModalOpen, toggleUpdateModal] = useReducer(
    (prev) => !prev,
    false
  );
  const [isDeleteModalOpen, toggleDeleteModal] = useReducer(
    (prev) => !prev,
    false
  );

  return (
    <>
      <UpdateUserDialog
        user={user}
        isOpen={isUpdateModalOpen}
        toggleModal={toggleUpdateModal}
      />
      <DeleteUserDailog
        toggleModal={toggleDeleteModal}
        user={user}
        isOpen={isDeleteModalOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <button onClick={toggleUpdateModal}>Update</button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={toggleDeleteModal}>Delete</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
