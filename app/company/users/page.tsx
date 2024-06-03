"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination";

export default function Users() {
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold">Users</h1>
      <h2 className="text-sm text-muted-foreground">List of users registered on the system.</h2>
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TabsList className="hidden md:block">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="drivers">Drivers</TabsTrigger>
                  <TabsTrigger value="managers">Managers</TabsTrigger>
                  <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>
                <div className="md:hidden flex-auto">
                  <Select value={selectedTab} onValueChange={handleTabChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tab" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="drivers">Drivers</SelectItem>
                      <SelectItem value="managers">Managers</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative ml-auto md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
                </div>
                <Button className="h-10 gap-1" size="sm">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 items-center w-full">
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> users
                </div>
                <Pagination className="flex-1">
                  <PaginationContent className="flex items-center">
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="drivers">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TabsList className="hidden md:block">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="drivers">Drivers</TabsTrigger>
                  <TabsTrigger value="managers">Managers</TabsTrigger>
                  <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>
                <div className="md:hidden flex-auto">
                  <Select value={selectedTab} onValueChange={handleTabChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tab" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="drivers">Drivers</SelectItem>
                      <SelectItem value="managers">Managers</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative ml-auto md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
                </div>
                <Button className="h-10 gap-1" size="sm">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Lewis Hamilton</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">lewis.hamilton@email.com</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> users
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="managers">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TabsList className="hidden md:block">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="drivers">Drivers</TabsTrigger>
                  <TabsTrigger value="managers">Managers</TabsTrigger>
                  <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>
                <div className="md:hidden flex-auto">
                  <Select value={selectedTab} onValueChange={handleTabChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tab" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="drivers">Drivers</SelectItem>
                      <SelectItem value="managers">Managers</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative ml-auto md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
                </div>
                <Button className="h-10 gap-1" size="sm">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="admins">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TabsList className="hidden md:block">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="drivers">Drivers</TabsTrigger>
                  <TabsTrigger value="managers">Managers</TabsTrigger>
                  <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>
                <div className="md:hidden flex-auto">
                  <Select value={selectedTab} onValueChange={handleTabChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tab" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="drivers">Drivers</SelectItem>
                      <SelectItem value="managers">Managers</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative ml-auto md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
                </div>
                <Button className="h-10 gap-1" size="sm">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" />
                    </TableCell>
                    <TableCell className="font-medium max-w-16 md:max-w-40 text-clip">Duarte Fernandes</TableCell>
                    <TableCell className="font-medium max-w-28 md:max-w-40 truncate hover:text-clip">a14858@alunos.ipca.pt</TableCell>
                    <TableCell className="hidden md:table-cell">Driver</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="max-w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
