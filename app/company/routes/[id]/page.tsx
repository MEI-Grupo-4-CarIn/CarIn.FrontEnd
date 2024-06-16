"use client";

import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import api from "@/lib/axios";
import { formatDate, formatStatus } from "@/types/route";
import { formatFuelType } from "@/types/vehicle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Pencil } from "lucide-react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRouteById } from "@/hooks/useRoutes";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { useState } from "react";
import EditRouteDialog from "@/app/company/routes/edit-route-dialog";

export default function RouteDetailsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop() as string;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: routeData, error: routeError, isLoading: routeLoading, refetch: refetchRoute } = useRouteById(id);
  const mapLoaded = useGoogleMaps();

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery(
    ["user", routeData?.userId],
    async () => {
      if (routeData?.userId) {
        const { data } = await api.get(`/users/${routeData.userId}`);
        return data;
      }
      return null;
    },
    {
      enabled: !!routeData?.userId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const {
    data: vehicleData,
    error: vehicleError,
    isLoading: vehicleLoading,
  } = useQuery(
    ["vehicle", routeData?.vehicleId],
    async () => {
      if (routeData?.vehicleId) {
        const { data } = await api.get(`/vehicles/${routeData.vehicleId}`);
        return data;
      }
      return null;
    },
    {
      enabled: !!routeData?.vehicleId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  if (routeLoading || userLoading || vehicleLoading) {
    return <div>Loading...</div>;
  }

  if (routeError || userError || vehicleError) {
    return <div>Error loading details</div>;
  }

  if (!routeData) {
    return <div>No route data found</div>;
  }

  const startCoordinates = {
    lat: routeData.startPoint.coordinates?.[1] ?? 0,
    lng: routeData.startPoint.coordinates?.[0] ?? 0,
  };
  const endCoordinates = {
    lat: routeData.endPoint.coordinates?.[1] ?? 0,
    lng: routeData.endPoint.coordinates?.[0] ?? 0,
  };

  const { text: statusText, variant: statusVariant } = formatStatus(routeData.status);

  return (
    <div className="mx-auto grid w-full gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Route Details</h1>
        <div className="relative ml-auto md:grow-0">
          <Button className="h-10 gap-1 mr-2" size="sm" variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Edit</span>
          </Button>
          <Button className="h-10 gap-1" size="sm" onClick={() => router.push("/company/routes")}>
            <ArrowBigLeft className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Return to List</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex flex-row space-x-1">
                  <div className="basis-1/2">
                    <div className="font-semibold">Starting Point</div>
                    <div className="text-foreground">
                      {routeData.startPoint.city}, {routeData.startPoint.country}
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <div className="font-semibold">Ending Point</div>
                    <div className="text-foreground">
                      {routeData.endPoint.city}, {routeData.endPoint.country}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row space-x-1">
                  <div className="basis-1/2">
                    <div className="font-semibold">Distance</div>
                    <div className="text-foreground">{routeData.distance?.toFixed(0)} km</div>
                  </div>
                  <div className="basis-1/2">
                    <div className="font-semibold">Status</div>
                    <Badge variant={statusVariant}>{statusText}</Badge>
                  </div>
                </div>
                <div className="flex flex-row space-x-1">
                  <div className="basis-1/2">
                    <div className="font-semibold">Avoid Tolls</div>
                    <Checkbox checked={routeData.avoidTolls} disabled />
                  </div>
                  <div className="basis-1/2">
                    <div className="font-semibold">Avoid Highways</div>
                    <Checkbox checked={routeData.avoidHighways} disabled />
                  </div>
                </div>
                <div className="flex flex-row space-x-1">
                  <div className="basis-1/3">
                    <div className="font-semibold">Starting Date</div>
                    <div className="text-foreground">{formatDate(routeData.startDate)}</div>
                  </div>
                  <div className="basis-1/3">
                    <div className="font-semibold">Duration</div>
                    <div className="text-foreground">{routeData.duration} h</div>
                  </div>
                  <div className="basis-1/3">
                    <div className="font-semibold">Estimated End Date</div>
                    <div className="text-foreground">{formatDate(routeData?.estimatedEndDate ?? "")}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-lg font-bold">Driver Details</div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-row space-x-1">
                  <div className="basis-1/2">
                    <div className="font-semibold">Name</div>
                    <div className="text-foreground">
                      {userData?.firstName} {userData?.lastName}
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <div className="font-semibold">Email</div>
                    <div className="text-foreground">{userData?.email}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-lg font-bold">Vehicle Details</div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-row space-x-1">
                  <div className="basis-1/3">
                    <div className="font-semibold">Model</div>
                    <div className="text-foreground">
                      {vehicleData.brand} {vehicleData.model}
                    </div>
                  </div>
                  <div className="basis-1/3">
                    <div className="font-semibold">License Plate</div>
                    <div className="text-foreground">{vehicleData.licensePlate}</div>
                  </div>
                  <div className="basis-1/3">
                    <div className="font-semibold">VIN</div>
                    <div className="text-foreground">{vehicleData.vin}</div>
                  </div>
                </div>
                <div className="flex flex-row space-x-1">
                  <div className="basis-1/3">
                    <div className="font-semibold">Kms</div>
                    <div className="text-foreground">{vehicleData.kms}</div>
                  </div>
                  <div className="basis-1/3">
                    <div className="font-semibold">Fuel</div>
                    <div className="text-foreground">{formatFuelType(vehicleData.fuelType)}</div>
                  </div>
                  <div className="basis-1/3">
                    <div className="font-semibold">Consumption</div>
                    <div className="text-foreground">{vehicleData.averageFuelConsumption.toFixed(2)} l/100km</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <div className="text-lg font-bold">Route Map</div>
            </CardHeader>
            <CardContent className="h-96 lg:h-[calc(100%-4.5rem)]">
              {mapLoaded && window.google ? (
                <div className="h-full w-full">
                  <GoogleMap
                    mapContainerStyle={{ height: "100%", width: "100%" }}
                    center={startCoordinates}
                    zoom={13}
                    onLoad={(map) => {
                      const bounds = new window.google.maps.LatLngBounds();
                      bounds.extend(startCoordinates);
                      bounds.extend(endCoordinates);
                      map.fitBounds(bounds);
                    }}
                  >
                    <Marker position={startCoordinates} label="Start" />
                    <Marker position={endCoordinates} label="End" />
                  </GoogleMap>
                </div>
              ) : (
                <div>Loading Map...</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <EditRouteDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        routeData={routeData}
        onRouteUpdated={() => {
          refetchRoute();
          setIsEditDialogOpen(false);
        }}
      />
    </div>
  );
}
