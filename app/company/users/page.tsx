"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import debounce from "lodash/debounce";
import { useUsers } from "@/hooks/useUsers";
import { DataTable } from "@/app/company/users/data-table";
import { columns } from "@/app/company/users/columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ApiError } from "@/types/error";
import Loading from "@/app/company/users/loading";

export default function UsersPage() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, error } = useUsers(debouncedQuery, selectedTab, pageSize, pageIndex + 1);

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

  const renderContent = () => {
    return (
      <DataTable
        columns={columns}
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
      <h1 className="text-3xl font-semibold">Users</h1>
      <h2 className="text-sm text-muted-foreground">List of users registered on the system.</h2>
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <div className="flex items-center gap-2">
          <TabsList className="hidden md:block">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="driver">Drivers</TabsTrigger>
            <TabsTrigger value="manager">Managers</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
          </TabsList>
          <div className="md:hidden flex-auto">
            <Select value={selectedTab} onValueChange={handleTabChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select tab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="driver">Drivers</SelectItem>
                <SelectItem value="manager">Managers</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
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
        </div>
        <Card className="mt-2">
          <CardContent>
            <TabsContent value="all">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="driver">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="manager">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
            <TabsContent value="admin">
              <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
