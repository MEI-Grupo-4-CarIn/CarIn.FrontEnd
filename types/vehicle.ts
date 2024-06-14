export interface Vehicle {
  _id: string;
  model: string;
  brand: string;
  email: string;
  licensePlate: string;
  vin: string;
  color: string;
  registerDate: string;
  acquisitionDate: string;
  category: string;
  kms: number;
  capacity: number;
  fuelType: string;
  averageFuelConsumption: number;
  status: "none" | "inUser" | "repairing";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export function formatStatus(status: string): string {
  switch (status) {
    case "none":
      return "None";
    case "inUse":
      return "In Use";
    case "repairing":
      return "Repairing";
    default:
      return status;
  }
}
