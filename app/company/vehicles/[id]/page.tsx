"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { formatFuelType } from "@/types/vehicle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Pencil } from "lucide-react";
import { useVehicleById } from "@/hooks/useVehicles";
import { useState } from "react";

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
                <div className="flex flex-col md:flex-row">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                    <Image
                      alt="Vehicle image"
                      className="h-32 w-32 md:h-full md:w-auto rounded-md object-fit"
                      src={"/placeholder_vehicle.svg"}
                      width={128}
                      height={128}
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-row space-x-1">
                      <div className="basis-1/3">
                        <div className="font-semibold">Model</div>
                        <div className="text-foreground">
                          {data.brand} {data.model}
                        </div>
                      </div>
                      <div className="basis-1/3">
                        <div className="font-semibold">License Plate</div>
                        <div className="text-foreground">{data.licensePlate}</div>
                      </div>
                      <div className="basis-1/3">
                        <div className="font-semibold">VIN</div>
                        <div className="text-foreground">{data.vin}</div>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-1 mt-4">
                      <div className="basis-1/3">
                        <div className="font-semibold">Kms</div>
                        <div className="text-foreground">{data.kms}</div>
                      </div>
                      <div className="basis-1/3">
                        <div className="font-semibold">Fuel</div>
                        <div className="text-foreground">{formatFuelType(data.fuelType)}</div>
                      </div>
                      <div className="basis-1/3">
                        <div className="font-semibold">Consumption</div>
                        <div className="text-foreground">{data.averageFuelConsumption.toFixed(2)} l/100km</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* <EditRouteDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        routeData={routeData}
        onRouteUpdated={() => {
          refetch();
          setIsEditDialogOpen(false);
        }}
      /> */}
    </div>
  );
}
