"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { formatFuelType, formatDate, formatVehicleStatus } from "@/types/vehicle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowBigLeft, Pencil } from "lucide-react";
import { useVehicleById } from "@/hooks/useVehicles";
import { useState } from "react";
import EditVehicleDialog from "@/app/company/vehicles/edit-vehicle-dialog";

export default function VehicleDetailsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop() as string;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data, error, isLoading, refetch } = useVehicleById(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading details</div>;
  }

  if (!data) {
    return <div>No vehicle data found</div>;
  }

  const statusText = formatVehicleStatus(data.status);

  return (
    <div className="mx-auto grid w-full gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Vehicle Details</h1>
        <div className="relative ml-auto md:grow-0">
          <Button className="h-10 gap-1 mr-2" size="sm" variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Edit</span>
          </Button>
          <Button className="h-10 gap-1" size="sm" onClick={() => router.push("/company/vehicles")}>
            <ArrowBigLeft className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Return to List</span>
          </Button>
        </div>
      </div>
      <div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                    <Image
                      alt="Vehicle image"
                      className="h-32 w-32 md:h-60 md:w-auto rounded-md object-fit"
                      src={"/placeholder_vehicle.svg"}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-row space-x-1">
                      <div className="basis-1/2">
                        <div className="font-semibold">Brand</div>
                        <div className="text-foreground">{data.brand}</div>
                      </div>
                      <div className="basis-1/2">
                        <div className="font-semibold">Model</div>
                        <div className="text-foreground">{data.model}</div>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-1 mt-4">
                      <div className="basis-1/2">
                        <div className="font-semibold">License Plate</div>
                        <div className="text-foreground">{data.licensePlate}</div>
                      </div>
                      <div className="basis-1/2">
                        <div className="font-semibold">VIN</div>
                        <div className="text-foreground">{data.vin}</div>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-1 mt-4">
                      <div className="basis-1/2">
                        <div className="font-semibold">Color</div>
                        <div className="text-foreground">{data.color}</div>
                      </div>
                      <div className="basis-1/2">
                        <div className="font-semibold">Category</div>
                        <div className="text-foreground">{data.category}</div>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-1 mt-4">
                      <div className="basis-1/2">
                        <div className="font-semibold">Register Date</div>
                        <div className="text-foreground">{formatDate(data.registerDate)}</div>
                      </div>
                      <div className="basis-1/2">
                        <div className="font-semibold">Acquisition Date</div>
                        <div className="text-foreground">{formatDate(data.acquisitionDate)}</div>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-1 mt-4">
                      <div className="basis-1/2">
                        <div className="font-semibold">Fuel</div>
                        <Badge variant="outline">{formatFuelType(data.fuelType)}</Badge>
                      </div>
                      <div className="basis-1/2">
                        <div className="font-semibold">Consumption</div>
                        <div className="text-foreground">{data.averageFuelConsumption.toFixed(2)} l/100km</div>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-1 mt-4">
                      <div className="basis-1/3">
                        <div className="font-semibold">Status</div>
                        <Badge variant="outline">{statusText}</Badge>
                      </div>
                      <div className="basis-1/3">
                        <div className="font-semibold">Kms</div>
                        <div className="text-foreground">{data.kms}</div>
                      </div>
                      <div className="basis-1/3">
                        <div className="font-semibold">Capacity</div>
                        <div className="text-foreground">{data.capacity}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <EditVehicleDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        vehicleData={data}
        onVehicleUpdated={() => {
          refetch();
          setIsEditDialogOpen(false);
        }}
      />
    </div>
  );
}
