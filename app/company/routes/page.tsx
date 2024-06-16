"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import { useRoutes } from "@/hooks/useRoutes";
import { DataTable } from "@/app/company/routes/data-table";
import { columns } from "@/app/company/routes/columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ApiError } from "@/types/error";
import Loading from "@/app/company/routes/loading";
import AddRouteDialog from "@/app/company/routes/add-route-dialog";
import EditRouteDialog from "@/app/company/routes/edit-route-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useMutation } from "react-query";
import api from "@/lib/axios";

export default function RoutesPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isNewRouteDialogOpen, setIsNewRouteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [editingRoute, setEditingRoute] = useState<any | null>(null);
  const [deletingRoute, setDeletingRoute] = useState<any | null>(null);

  const { data, error, refetch } = useRoutes(debouncedQuery, selectedTab, pageSize, pageIndex + 1);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setPageIndex(0);
  };

  const debouncedSearch = debounce((searchTerm: string) => {
    setDebouncedQuery(searchTerm);
    setPageIndex(0);
  }, 500);

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

  const handleDetailsClick = (id: string) => {
    router.push(`/company/routes/${id}`);
  };

  const handleEditClick = (route: any) => {
    setEditingRoute(route);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (route: any) => {
    setDeletingRoute(route);
  };

  const mutation = useMutation((routeId: string) => api.delete(`/routes/${routeId}`), {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Route deleted successfully.",
      });
      refetch();
      setDeletingRoute(null);
    },
    onError: (error: ApiError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const renderContent = () => {
    return (
      <DataTable
        columns={columns(handleEditClick, handleDeleteClick)}
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
      <h1 className="text-3xl font-semibold">Routes</h1>
      <h2 className="text-sm text-muted-foreground">List of routes on the system.</h2>
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <div className="flex items-center gap-2">
          <TabsList className="hidden md:block">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <div className="md:hidden flex-auto">
            <Select value={selectedTab} onValueChange={handleTabChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select tab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
          <Button className="h-10 gap-1" size="sm" onClick={() => setIsNewRouteDialogOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Route</span>
          </Button>
        </div>
        <Card className="mt-2">
          <CardContent>
            <TabsContent value="all">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="pending">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="inProgress">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="completed">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="cancelled">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
      <AddRouteDialog
        open={isNewRouteDialogOpen}
        onOpenChange={setIsNewRouteDialogOpen}
        onRouteAdded={() => {
          refetch();
          setIsNewRouteDialogOpen(false);
        }}
      />
      {editingRoute && (
        <EditRouteDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          routeData={editingRoute}
          onRouteUpdated={() => {
            refetch();
            setIsEditDialogOpen(false);
            setEditingRoute(null);
          }}
        />
      )}
      {deletingRoute && (
        <AlertDialog
          open={Boolean(deletingRoute)}
          onOpenChange={(open) => {
            if (!open) setDeletingRoute(null);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete the route.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deletingRoute) {
                    mutation.mutate(deletingRoute._id);
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
