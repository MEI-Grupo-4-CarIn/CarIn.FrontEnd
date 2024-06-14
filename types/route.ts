import { format } from "date-fns";

export interface Route {
  _id: string;
  userId: string;
  vehicleId: string;
  startPoint: Location;
  endPoint: Location;
  startDate: string;
  estimatedEndDate: string;
  distance: number;
  duration: string;
  status: "pending" | "inProgress" | "completed" | "cancelled";
  avoidTolls: boolean;
  avoidHighways: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  city: string;
  country: string;
  coordinates: [number, number];
}

interface StatusDetails {
  text: string;
  variant: "default" | "secondary" | "destructive" | "outline" | null | undefined;
}

export function formatStatus(status: string): StatusDetails {
  switch (status) {
    case "pending":
      return { text: "Pending", variant: "secondary" };
    case "inProgress":
      return { text: "In Progress", variant: "outline" };
    case "completed":
      return { text: "Completed", variant: "default" };
    case "cancelled":
      return { text: "Cancelled", variant: "destructive" };
    default:
      return { text: status, variant: "default" };
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "dd-MM-yyyy HH:mm");
}
