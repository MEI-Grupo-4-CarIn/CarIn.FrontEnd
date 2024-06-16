"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Route, Car } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTotalRoutes } from "@/hooks/useRoutes";
import { useTotalVehicles } from "@/hooks/useVehicles";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const router = useRouter();
  const { data: totalRoutes, isError: routesError } = useTotalRoutes();
  const { data: totalVehicles, isError: vehiclesError } = useTotalVehicles();
  const { toast } = useToast();

  React.useEffect(() => {
    if (routesError) {
      toast({
        title: "Error",
        description: "Failed to fetch total routes.",
        variant: "destructive",
      });
    }
    if (vehiclesError) {
      toast({
        title: "Error",
        description: "Failed to fetch total vehicles.",
        variant: "destructive",
      });
    }
  }, [routesError, vehiclesError, toast]);

  return (
    <div className="mx-auto w-full p-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Routes</h1>
                <div className="relative ml-auto md:grow-0">
                  <Route className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">Be always updated on your fleet's routes.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/company/routes")}>View All Routes</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Routes</CardDescription>
            <CardTitle className="text-4xl">{totalRoutes ?? "Loading..."}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+25% from last month</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Vehicles</h1>
                <div className="relative ml-auto md:grow-0">
                  <Car className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">Manage your fleet's vehicles efficiently.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/company/vehicles")}>View All Vehicles</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Vehicles</CardDescription>
            <CardTitle className="text-4xl">{totalVehicles ?? "Loading..."}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+10% from last year</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
