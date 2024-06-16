import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import api from "@/lib/axios";
import { useUsers } from "@/hooks/useUsers";
import { useVehicles } from "@/hooks/useVehicles";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { ApiError } from "@/types/error";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  startCity: z.string().min(1, { message: "Start City is required" }),
  startCountry: z.string().min(1, { message: "Start Country is required" }),
  endCity: z.string().min(1, { message: "End City is required" }),
  endCountry: z.string().min(1, { message: "End Country is required" }),
  userId: z.string().min(1, { message: "User is required" }),
  vehicleId: z.string().min(1, { message: "Vehicle is required" }),
  startDate: z.date({ required_error: "Start Date is required" }),
  avoidTolls: z.boolean().optional(),
  avoidHighways: z.boolean().optional(),
});

interface AddRouteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRouteAdded: () => void;
}

const AddRouteDialog: React.FC<AddRouteDialogProps> = ({ open, onOpenChange, onRouteAdded }) => {
  const { toast } = useToast();
  const [userSearch, setUserSearch] = useState<string>("");
  const [debouncedUserSearch, setDebouncedUserSearch] = useState<string>(userSearch);
  const [vehicleSearch, setVehicleSearch] = useState<string>("");
  const [debouncedVehicleSearch, setDebouncedVehicleSearch] = useState<string>(vehicleSearch);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const mutation = useMutation((newRoute) => api.post("/routes", newRoute), {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Route created successfully.",
      });
      onRouteAdded();
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
    const { startCity, startCountry, endCity, endCountry, startDate, avoidTolls, avoidHighways, ...rest } = data;

    const payload = {
      ...rest,
      startPoint: {
        city: startCity,
        country: startCountry,
      },
      endPoint: {
        city: endCity,
        country: endCountry,
      },
      startDate: new Date(startDate).toISOString(),
      status: "pending",
      avoidTolls: avoidTolls || false,
      avoidHighways: avoidHighways || false,
    };

    mutation.mutate(payload);
  };

  const debouncedSearchUsers = useCallback(
    debounce((searchTerm: string) => {
      setDebouncedUserSearch(searchTerm);
    }, 500),
    []
  );

  const handleUserSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(event.target.value);
    debouncedSearchUsers(event.target.value);
  };

  const debouncedSearchVehicles = useCallback(
    debounce((searchTerm: string) => {
      setDebouncedVehicleSearch(searchTerm);
    }, 500),
    []
  );

  const handleVehicleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleSearch(event.target.value);
    debouncedSearchVehicles(event.target.value);
  };

  const { data: usersData } = useUsers(debouncedUserSearch, "driver", 6, 1);
  const { data: vehiclesData } = useVehicles(debouncedVehicleSearch, "all", 6, 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Route</DialogTitle>
          <DialogDescription>Create a new route by filling out the form below.</DialogDescription>
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
                        <Input placeholder="Start City" {...field} />
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
                        <Input placeholder="Start Country" {...field} />
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
                        <Input placeholder="End City" {...field} />
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
                        <Input placeholder="End Country" {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select User" />
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
                          {!usersData?.data || usersData.data.length === 0 ? (
                            <div className="text-sm">No users found</div>
                          ) : (
                            usersData?.data.map((user) => (
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2">
                          <Input
                            placeholder="Search Vehicle"
                            value={vehicleSearch}
                            onChange={handleVehicleSearchChange}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                        </div>
                        {!vehiclesData?.data || vehiclesData?.data.length === 0 ? (
                          <div className="p-2">No vehicles found</div>
                        ) : (
                          vehiclesData?.data.map((vehicle) => (
                            <SelectItem key={vehicle._id} value={vehicle._id ? vehicle._id : ""}>
                              {vehicle.brand} {vehicle.model}
                            </SelectItem>
                          ))
                        )}
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
              <Button type="submit">Add Route</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRouteDialog;
