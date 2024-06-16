"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Vehicle, formatVehicleStatus } from "@/types/vehicle";

// Extend the ColumnMeta to include the className property
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

interface ActionsProps {
  row: any;
  onDetailsClick: (id: string) => void;
}

const ActionsCell: React.FC<ActionsProps> = ({ row, onDetailsClick }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onDetailsClick(row.original._id)}>Details</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: (onDetailsClick: (id: string) => void) => ColumnDef<Vehicle>[] = (onDetailsClick) => [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image alt="User image" className="aspect-square rounded-md object-fit" height={64} src={"/placeholder_vehicle.svg"} width={64} />
    ),
    meta: { className: "hidden sm:table-cell" },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => `${row.original.brand} ${row.original.model}`,
    meta: { className: "font-medium max-w-16 md:max-w-40 text-clip table-cell" },
  },
  {
    accessorKey: "licensePlate",
    header: "License Plate",
    cell: ({ row }) => row.original.licensePlate,
    meta: { className: "font-medium max-w-28 md:max-w-40 truncate hover:text-clip table-cell" },
  },
  {
    accessorKey: "kms",
    header: "Kms",
    cell: ({ row }) => row.original.kms,
    meta: { className: "font-medium max-w-28 md:max-w-40 truncate hover:text-clip table-cell" },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant="outline">{formatVehicleStatus(row.original.status)}</Badge>,
    meta: { className: "hidden md:table-cell" },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell row={row} onDetailsClick={onDetailsClick} />,
    meta: { className: "table-cell max-w-12" },
  },
];
