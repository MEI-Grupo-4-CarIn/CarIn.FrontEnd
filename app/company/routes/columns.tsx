"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Route, formatStatus, formatDate } from "@/types/route";

// Extend the ColumnMeta to include the className property
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "startPoint",
    header: "Starting Point",
    cell: ({ row }) => `${row.original.startPoint.city}, ${row.original.startPoint.country}`,
    meta: { className: "font-medium max-w-20 md:max-w-40 text-clip table-cell" },
  },
  {
    accessorKey: "endPoint",
    header: "Ending Point",
    cell: ({ row }) => `${row.original.endPoint.city}, ${row.original.endPoint.country}`,
    meta: { className: "font-medium max-w-20 md:max-w-40 text-clip table-cell" },
  },
  {
    accessorKey: "startDate",
    header: "Date",
    cell: ({ row }) => formatDate(row.original.startDate),
    meta: { className: "font-medium max-w-28 md:max-w-40 truncate hover:text-clip table-cell" },
  },
  {
    accessorKey: "distance",
    header: "Distance",
    cell: ({ row }) => `${row.original.distance.toFixed(0)} km`,
    meta: { className: "font-medium max-w-28 md:max-w-40 truncate hover:text-clip hidden md:table-cell" },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { text, variant } = formatStatus(row.original.status);
      return <Badge variant={variant}>{text}</Badge>;
    },
    meta: { className: "hidden md:table-cell" },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    meta: { className: "table-cell max-w-12" },
  },
];
