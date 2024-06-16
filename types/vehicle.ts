export interface Vehicle {
  _id?: string;
  model: string;
  brand: string;
  licensePlate: string;
  vin: string;
  color: string;
  registerDate: string;
  acquisitionDate: string;
  category: string;
  kms: number;
  capacity: number;
  fuelType: "diesel" | "petrol" | "electric";
  averageFuelConsumption: number;
  status: "none" | "inUser" | "repairing";
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function formatVehicleStatus(status: string): string {
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

export function formatFuelType(fuelType: string): string {
  switch (fuelType) {
    case "diesel":
      return "Diesel";
    case "petrol":
      return "Petrol";
    case "electric":
      return "Electric";
    default:
      return fuelType;
  }
}
