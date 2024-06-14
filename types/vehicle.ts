export interface Vehicle {
  id: string;
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
