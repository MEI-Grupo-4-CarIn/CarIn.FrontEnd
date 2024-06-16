import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import api from "@/lib/axios";
import { useUserById, useUsers } from "@/hooks/useUsers";
import { useVehicleById, useVehicles } from "@/hooks/useVehicles";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { ApiError } from "@/types/error";
import { useToast } from "@/components/ui/use-toast";
import { Route } from "@/types/route";
import { set } from "lodash";

const formSchema = z.object({
  startCity: z.string().min(1, { message: "Start City is required" }),
  startCountry: z.string().min(1, { message: "Start Country is required" }),
  endCity: z.string().min(1, { message: "End City is required" }),
  endCountry: z.string().min(1, { message: "End Country is required" }),
  userId: z.string().min(1, { message: "User is required" }),
  vehicleId: z.string().min(1, { message: "Vehicle is required" }),
  startDate: z.date({ required_error: "Start Date is required" }),
  status: z.enum(["pending", "inProgress", "completed", "cancelled"]),
  avoidTolls: z.boolean().optional(),
  avoidHighways: z.boolean().optional(),
});

interface EditRouteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routeData: Route;
  onRouteUpdated: () => void;
}

const EditRouteDialog: React.FC<EditRouteDialogProps> = ({ open, onOpenChange, routeData, onRouteUpdated }) => {
  const { toast } = useToast();
  const [userSearch, setUserSearch] = useState<string>("");
  const [debouncedUserSearch, setDebouncedUserSearch] = useState<string>(userSearch);
  const [vehicleSearch, setVehicleSearch] = useState<string>("");
  const [debouncedVehicleSearch, setDebouncedVehicleSearch] = useState<string>(vehicleSearch);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: userData, isLoading: isUserLoading } = useUserById(parseInt(routeData.userId));
  const { data: vehicleData, isLoading: isVehicleLoading } = useVehicleById(routeData.vehicleId);
  const { data: usersData, isLoading: isUsersLoading } = useUsers(debouncedUserSearch, "driver", 6, 1);
  const { data: vehiclesData, isLoading: isVehiclesLoading } = useVehicles(debouncedVehicleSearch, "all", 6, 1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startCity: routeData?.startPoint.city || "",
      startCountry: routeData?.startPoint.country || "",
      endCity: routeData?.endPoint.city || "",
      endCountry: routeData?.endPoint.country || "",
      userId: routeData?.userId || "",
      vehicleId: routeData?.vehicleId || "",
      startDate: routeData ? new Date(routeData.startDate) : new Date(),
      status: routeData?.status || "pending",
      avoidTolls: routeData?.avoidTolls || false,
      avoidHighways: routeData?.avoidHighways || false,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = form;

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
    if (userData) {
      setSelectedUser(userData);
    }
    if (vehicleData) {
      setSelectedVehicle(vehicleData);
    }
  }, [userData, vehicleData]);

  const combinedUsersData = selectedUser
    ? [selectedUser, ...(usersData?.data?.filter((user) => user.userId !== selectedUser.userId) || [])]
    : usersData?.data || [];

  const combinedVehiclesData = selectedVehicle
    ? [selectedVehicle, ...(vehiclesData?.data?.filter((vehicle) => vehicle._id !== selectedVehicle._id) || [])]
    : vehiclesData?.data || [];

  const handleUserChange = (value: string) => {
    const user = combinedUsersData.find((user) => String(user.userId) === value);
    setSelectedUser(user);
    setValue("userId", value);
  };

  const handleVehicleChange = (value: string) => {
    const vehicle = combinedVehiclesData.find((vehicle) => vehicle._id === value);
    setSelectedVehicle(vehicle);
    setValue("vehicleId", value);
  };

  useEffect(() => {
    if (!open) {
      setIsInitialized(false);
      reset({
        startCity: "",
        startCountry: "",
        endCity: "",
        endCountry: "",
        userId: "",
        vehicleId: "",
        startDate: new Date(),
        status: "pending",
        avoidTolls: false,
        avoidHighways: false,
      });
    }
  }, [open, reset]);

  useEffect(() => {
    if (!isUserLoading && !isVehicleLoading && !isUsersLoading && !isVehiclesLoading) {
      setValue("startCity", routeData.startPoint.city);
      setValue("startCountry", routeData.startPoint.country);
      setValue("endCity", routeData.endPoint.city);
      setValue("endCountry", routeData.endPoint.country);
      setValue("userId", routeData.userId);
      setValue("vehicleId", routeData.vehicleId);
      setValue("startDate", new Date(routeData.startDate));
      setValue("avoidTolls", routeData.avoidTolls);
      setValue("avoidHighways", routeData.avoidHighways);

      setIsInitialized(true);
    }
  }, [routeData, setValue, isUserLoading, isVehicleLoading, isUsersLoading, isVehiclesLoading]);

  const mutation = useMutation((updatedRoute) => api.patch(`/routes/${routeData._id}`, updatedRoute), {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Route updated successfully.",
      });
      onRouteUpdated();
      onOpenChange(false);
    },
    onError: (error: ApiError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    const { status, avoidTolls, avoidHighways, startDate, ...rest } = data;

    const payload: any = {};

    if (rest.userId !== routeData.userId) payload.userId = rest.userId;
    if (rest.vehicleId !== routeData.vehicleId) payload.vehicleId = rest.vehicleId;
    if (new Date(startDate).toISOString() !== new Date(routeData.startDate).toISOString()) payload.startDate = startDate;
    if (status !== routeData.status) payload.status = status;
    if (avoidTolls !== routeData.avoidTolls) payload.avoidTolls = avoidTolls || false;
    if (avoidHighways !== routeData.avoidHighways) payload.avoidHighways = avoidHighways || false;

    if (Object.keys(payload).length > 0) {
      mutation.mutate(payload);
    } else {
      onOpenChange(false);
    }
  };

  const debouncedSearchUsers = debounce((searchTerm: string) => {
    setDebouncedUserSearch(searchTerm);
  }, 500);

  const handleUserSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(event.target.value);
    debouncedSearchUsers(event.target.value);
  };

  const debouncedSearchVehicles = debounce((searchTerm: string) => {
    setDebouncedVehicleSearch(searchTerm);
  }, 500);

  const handleVehicleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleSearch(event.target.value);
    debouncedSearchVehicles(event.target.value);
  };

  if (isUserLoading || isVehicleLoading || isUsersLoading || isVehiclesLoading || !isInitialized) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Route</DialogTitle>
          <DialogDescription>Update the route details below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-row space-x-2">
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="startCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start City</FormLabel>
                      <FormControl>
                        <Input placeholder="Start City" {...field} disabled />
                      </FormControl>
                      <FormMessage>{errors.startCity?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="startCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Start Country" {...field} disabled />
                      </FormControl>
                      <FormMessage>{errors.startCountry?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="endCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End City</FormLabel>
                      <FormControl>
                        <Input placeholder="End City" {...field} disabled />
                      </FormControl>
                      <FormMessage>{errors.endCity?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="endCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Country</FormLabel>
                      <FormControl>
                        <Input placeholder="End Country" {...field} disabled />
                      </FormControl>
                      <FormMessage>{errors.endCountry?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Select onValueChange={handleUserChange} value={field.value || (routeData ? routeData.userId : "")}>
                      <SelectTrigger>
                        <SelectValue placeholder={userData ? `${userData.firstName} ${userData.lastName}` : "Select User"} />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2">
                          <Input
                            className="mb-2"
                            placeholder="Search User"
                            value={userSearch}
                            onChange={handleUserSearchChange}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          {!combinedUsersData || combinedUsersData.length === 0 ? (
                            <div className="text-sm">No users found</div>
                          ) : (
                            combinedUsersData.map((user) => (
                              <SelectItem key={user.userId} value={String(user.userId)}>
                                {user.firstName} {user.lastName}
                              </SelectItem>
                            ))
                          )}
                        </div>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.userId?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle</FormLabel>
                  <FormControl>
                    <Select onValueChange={handleVehicleChange} value={field.value || (routeData ? routeData.vehicleId : "")}>
                      <SelectTrigger>
                        <SelectValue placeholder={vehicleData ? `${vehicleData.brand} ${vehicleData.model}` : "Select Vehicle"} />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2">
                          <Input
                            className="mb-2"
                            placeholder="Search Vehicle"
                            value={vehicleSearch}
                            onChange={handleVehicleSearchChange}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          {!combinedVehiclesData || combinedVehiclesData.length === 0 ? (
                            <div className="text-sm">No vehicles found</div>
                          ) : (
                            combinedVehiclesData.map((vehicle) => (
                              <SelectItem key={vehicle._id} value={vehicle._id}>
                                {vehicle.brand} {vehicle.model}
                              </SelectItem>
                            ))
                          )}
                        </div>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.vehicleId?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} />
                  </FormControl>
                  <FormMessage>{errors.startDate?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value || (routeData ? routeData.status : "")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.status?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="flex flex-row space-x-1">
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="avoidTolls"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="m-0">Avoid Tolls</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="avoidHighways"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="m-0">Avoid Highways</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Route</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRouteDialog;
