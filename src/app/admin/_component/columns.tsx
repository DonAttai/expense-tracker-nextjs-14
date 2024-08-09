"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DatatableRowActions from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant="outline"
          className={cn("text-black bg-red-300", {
            "bg-green-300": status === "ACTIVE",
          })}
        >
          {status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DatatableRowActions row={row} />;
    },
  },
];
