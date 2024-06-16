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

export const columns: (handleEditClick: (vehicle: Vehicle) => void, handleDeleteClick: (route: Vehicle) => void) => ColumnDef<Vehicle>[] = (
  handleEditClick,
  handleDeleteClick
) => [
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
    cell: ({ row }) => {
      const router = useRouter();
      const handleDetailsClick = () => {
        router.push(`/company/vehicles/${row.original._id}`);
      };

      const handleEdit = () => {
        if (row.original) {
          handleEditClick(row.original);
        }
      };

      const handleDelete = () => {
        if (row.original) {
          handleDeleteClick(row.original);
        }
      };

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
            <DropdownMenuItem onClick={handleDetailsClick}>Details</DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    meta: { className: "table-cell max-w-12" },
  },
];
