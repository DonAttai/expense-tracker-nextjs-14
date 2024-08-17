"use client";

import { formatTime } from "@/lib/format-time";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Transaction } from "@prisma/client";
import DatatableRowAction from "./data-table-row-actions";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const value = row.getValue("type") as string;
      return (
        <Badge
          variant="outline"
          className={value === "INCOME" ? "bg-green-300" : "bg-red-300"}
        >
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div>Amount (NGN)</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Created At</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div> {date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DatatableRowAction row={row} />;
    },
  },
];
