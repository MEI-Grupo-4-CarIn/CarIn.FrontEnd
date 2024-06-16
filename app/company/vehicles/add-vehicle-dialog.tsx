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
import { useState } from "react";

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
});

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVehicleAdded: () => void;
}

const AddVehicleDialog: React.FC<AddVehicleDialogProps> = ({ open, onOpenChange, onVehicleAdded }) => {
  const { toast } = useToast();
  const [registerDate, setRegisterDate] = useState<Date>();
  const [acquisitionDate, setAcquisitionDate] = useState<Date>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const mutation = useMutation((newVehicle) => api.post("/vehicles", newVehicle), {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Vehicle created successfully.",
      });
      onVehicleAdded();
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const payload = {
      ...data,
      registerDate: new Date(data.registerDate).toISOString(),
      acquisitionDate: new Date(data.acquisitionDate).toISOString(),
      status: "none",
    };

    mutation.mutate(payload as any);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>Create a new vehicle by filling out the form below.</DialogDescription>
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
                        <Input placeholder="Brand" {...field} />
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
                        <Input placeholder="Model" {...field} />
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
                        <Input placeholder="License Plate" {...field} />
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
                        <Input placeholder="VIN" {...field} />
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
                        <Input placeholder="Category" {...field} />
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
                        <Input type="number" min="1" placeholder="Capacity" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
            <DialogFooter>
              <Button type="submit">Add Vehicle</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleDialog;
