"use client";

import * as React from "react";
import { format, isBefore, isToday, startOfToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimePicker } from "@/components/ui/timePicker";
import { ControllerRenderProps } from "react-hook-form";

interface DateTimePickerProps extends ControllerRenderProps {
  label?: string;
}

const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(({ value, onChange, label }, ref) => {
  const [date, setDate] = React.useState<Date | undefined>(value ? new Date(value) : undefined);
  const [time, setTime] = React.useState<string | undefined>(date ? format(date, "HH:mm") : undefined);

  React.useEffect(() => {
    if (date && time) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      onChange(newDate);
    }
  }, [date, time, onChange]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const now = new Date();
      const [hours, minutes] = time ? time.split(":").map(Number) : [0, 0];
      const newDate = new Date(selectedDate);

      if (isToday(selectedDate)) {
        const currentMinutes = now.getMinutes();
        newDate.setHours(now.getHours());
        newDate.setMinutes(currentMinutes + 1);
        setTime(`${String(now.getHours()).padStart(2, "0")}:${String(currentMinutes + 1).padStart(2, "0")}`);
      } else {
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
      }

      setDate(newDate);
      onChange(newDate);
    }
  };

  return (
    <div ref={ref}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP HH:mm") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={handleDateChange} disabled={(date) => isBefore(date, startOfToday())} initialFocus />
          <div className="p-3 border-t border-border">
            <TimePicker
              value={time}
              onChange={(newTime) => {
                const [hours, minutes] = newTime.split(":").map(Number);
                const newDate = new Date(date || new Date());
                newDate.setHours(hours);
                newDate.setMinutes(minutes);
                setTime(newTime);
                setDate(newDate);
                onChange(newDate);
              }}
              date={date}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
