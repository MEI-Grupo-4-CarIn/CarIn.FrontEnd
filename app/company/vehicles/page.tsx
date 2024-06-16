"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import debounce from "lodash/debounce";
import { useVehicles } from "@/hooks/useVehicles";
import { DataTable } from "@/app/company/vehicles/data-table";
import { columns } from "@/app/company/vehicles/columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ApiError } from "@/types/error";
import Loading from "@/app/company/vehicles/loading";
import AddVehicleDialog from "@/app/company/vehicles/add-vehicle-dialog";
import EditVehicleDialog from "@/app/company/vehicles/edit-vehicle-dialog";

export default function VehiclesPage() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isNewVehicleDialogOpen, setIsNewVehicleDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [editingVehicle, setEditingVehicle] = useState<any | null>(null);

  const { data, error, refetch } = useVehicles(debouncedQuery, selectedTab, pageSize, pageIndex + 1);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setPageIndex(0);
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setDebouncedQuery(searchTerm);
      setPageIndex(0);
    }, 500),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: (error as ApiError).message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleEditClick = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setIsEditDialogOpen(true);
  };

  const renderContent = () => {
    return (
      <DataTable
        columns={columns(handleEditClick)}
        data={data?.data || []}
        totalItems={data?.meta?.totalItems || 0}
        pageCount={data?.meta?.totalPages || 1}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
    );
  };

  return (
    <div className="mx-auto grid w-full gap-2">
      <h1 className="text-3xl font-semibold">Vehicles</h1>
      <h2 className="text-sm text-muted-foreground">List of vehicles registered on the system.</h2>
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <div className="flex items-center gap-2">
          <TabsList className="hidden md:block">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="inUse">In Use</TabsTrigger>
            <TabsTrigger value="repairing">Repairing</TabsTrigger>
            <TabsTrigger value="none">None</TabsTrigger>
          </TabsList>
          <div className="md:hidden flex-auto">
            <Select value={selectedTab} onValueChange={handleTabChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select tab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="inUse">In Use</SelectItem>
                <SelectItem value="repairing">Repairing</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative ml-auto md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              value={query}
              onChange={handleSearchChange}
            />
          </div>
          <Button className="h-10 gap-1" size="sm" onClick={() => setIsNewVehicleDialogOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Vehicle</span>
          </Button>
        </div>
        <Card className="mt-2">
          <CardContent>
            <TabsContent value="all">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="inUse">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="repairing">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="none">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
      <AddVehicleDialog
        open={isNewVehicleDialogOpen}
        onOpenChange={setIsNewVehicleDialogOpen}
        onVehicleAdded={() => {
          refetch();
          setIsNewVehicleDialogOpen(false);
        }}
      />
      {editingVehicle && (
        <EditVehicleDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          vehicleData={editingVehicle}
          onVehicleUpdated={() => {
            refetch();
            setIsEditDialogOpen(false);
            setEditingVehicle(null);
          }}
        />
      )}
    </div>
  );
}
