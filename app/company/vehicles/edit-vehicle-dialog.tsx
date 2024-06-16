import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import api from "@/lib/axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ApiError } from "@/types/error";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Vehicle } from "@/types/vehicle";

const formSchema = z.object({
  brand: z.string().min(1, { message: "Brand is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  licensePlate: z.string().min(1, { message: "License Plate is required" }),
  vin: z.string({ required_error: "VIN is required" }).length(17, { message: "VIN needs to be exactly 17 characters long." }),
  color: z.string().min(1, { message: "Color is required" }),
  registerDate: z.date({ required_error: "Register date is required" }),
  acquisitionDate: z.date({ required_error: "Acquisition date is required" }),
  category: z.string({ required_error: "Category is required" }),
  kms: z.number({ required_error: "Kms is required" }),
  capacity: z.number({ required_error: "Capacity is required" }),
  fuelType: z.enum(["diesel", "petrol", "electric"]),
  averageFuelConsumption: z.number({ required_error: "Average Fuel Consumption is required" }),
  status: z.enum(["none", "inUse", "repairing"]),
});

interface EditVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleData: Vehicle;
  onVehicleUpdated: () => void;
}

const EditVehicleDialog: React.FC<EditVehicleDialogProps> = ({ open, onOpenChange, vehicleData, onVehicleUpdated }) => {
  const { toast } = useToast();
  const [registerDate, setRegisterDate] = useState<Date>();
  const [acquisitionDate, setAcquisitionDate] = useState<Date>();
  const [isInitialized, setIsInitialized] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: vehicleData?.brand || "",
      model: vehicleData?.model || "",
      licensePlate: vehicleData?.licensePlate || "",
      vin: vehicleData?.vin || "",
      color: vehicleData?.color || "",
      registerDate: vehicleData ? new Date(vehicleData.registerDate) : new Date(),
      acquisitionDate: vehicleData ? new Date(vehicleData.acquisitionDate) : new Date(),
      category: vehicleData?.category || "",
      kms: vehicleData?.kms || 0,
      capacity: vehicleData?.capacity || 0,
      fuelType: vehicleData?.fuelType || "diesel",
      averageFuelConsumption: vehicleData?.averageFuelConsumption || 0,
      status: vehicleData?.status || "none",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!open) {
      setIsInitialized(false);
      reset({
        brand: "",
        model: "",
        licensePlate: "",
        vin: "",
        color: "",
        registerDate: new Date(),
        acquisitionDate: new Date(),
        category: "",
        kms: 0,
        capacity: 0,
        fuelType: "diesel",
        status: "none",
        averageFuelConsumption: 0,
      });
    }
  }, [open, reset]);

  useEffect(() => {
    setValue("brand", vehicleData.brand);
    setValue("model", vehicleData.model);
    setValue("licensePlate", vehicleData.licensePlate);
    setValue("vin", vehicleData.vin);
    setValue("color", vehicleData.color);
    setValue("registerDate", new Date(vehicleData.registerDate));
    setValue("acquisitionDate", new Date(vehicleData.acquisitionDate));
    setValue("category", vehicleData.category);
    setValue("kms", vehicleData.kms);
    setValue("capacity", vehicleData.capacity);
    setValue("fuelType", vehicleData.fuelType);
    setValue("averageFuelConsumption", vehicleData.averageFuelConsumption);
    setValue("status", vehicleData.status);

    setIsInitialized(true);
  }, [vehicleData, setValue]);

  const mutation = useMutation((updatedVehicle) => api.patch(`/vehicles/${vehicleData._id}`, updatedVehicle), {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Vehicle updated successfully.",
      });
      onVehicleUpdated();
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
    const { color, kms, averageFuelConsumption, status, ...rest } = data;

    const payload: any = {};

    if (color !== vehicleData.color) payload.color = color;
    if (kms !== vehicleData.kms) payload.kms = kms;
    if (averageFuelConsumption !== vehicleData.averageFuelConsumption) payload.averageFuelConsumption = averageFuelConsumption;
    if (status !== vehicleData.status) payload.status = status;

    if (Object.keys(payload).length > 0) {
      mutation.mutate(payload);
    } else {
      onOpenChange(false);
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Vehicle</DialogTitle>
          <DialogDescription>Update the vehicle details below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-row space-x-2">
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="Brand" {...field} disabled />
                      </FormControl>
                      <FormMessage>{errors.brand?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Model" {...field} disabled />
                      </FormControl>
                      <FormMessage>{errors.model?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Licence Plate</FormLabel>
                      <FormControl>
                        <Input placeholder="License Plate" {...field} disabled />
                      </FormControl>
                      <FormMessage>{errors.licensePlate?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="vin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VIN</FormLabel>
                      <FormControl>
                        <Input placeholder="VIN" {...field} disabled />
                      </FormControl>
                      <FormMessage>{errors.vin?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Color" {...field} />
                      </FormControl>
                      <FormMessage>{errors.color?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Input placeholder="Category" {...field} disabled />
                      </FormControl>
                      <FormMessage>{errors.category?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="registerDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Register Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                              disabled
                            >
                              {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={registerDate}
                            onSelect={(date) => {
                              setRegisterDate(date as Date);
                              field.onChange(date);
                            }}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage>{errors.registerDate?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="acquisitionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Acquisition Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                              disabled
                            >
                              {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={acquisitionDate}
                            onSelect={(date) => {
                              setAcquisitionDate(date as Date);
                              field.onChange(date);
                            }}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage>{errors.acquisitionDate?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="kms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kms</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="Kms" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage>{errors.kms?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="basis-1/2">
                <FormField
                  control={control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Capacity"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          disabled
                        />
                      </FormControl>
                      <FormMessage>{errors.capacity?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="fuelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.fuelType?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="averageFuelConsumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Fuel Consumption</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Average Fuel Consumption"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage>{errors.averageFuelConsumption?.message}</FormMessage>
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="inUse">In Use</SelectItem>
                        <SelectItem value="repairing">Repairing</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.status?.message}</FormMessage>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Update Vehicle</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleDialog;
