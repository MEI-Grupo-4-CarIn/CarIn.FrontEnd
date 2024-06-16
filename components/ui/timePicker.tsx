import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  date?: Date;
}

export function TimePicker({ value, onChange, date }: TimePickerProps) {
  const now = React.useMemo(() => new Date(), []);

  const isTodayDate = date && now.toDateString() === date.toDateString();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const [selectedHour, setSelectedHour] = React.useState<number | null>(value ? parseInt(value.split(":")[0], 10) : null);
  const [selectedMinute, setSelectedMinute] = React.useState<number | null>(value ? parseInt(value.split(":")[1], 10) : null);

  React.useEffect(() => {
    if (isTodayDate && selectedHour === now.getHours() && (selectedMinute === null || selectedMinute <= now.getMinutes())) {
      const newMinute = (now.getMinutes() + 1) % 60;
      const newHour = newMinute === 0 ? now.getHours() + 1 : now.getHours();
      const newTime = `${String(newHour).padStart(2, "0")}:${String(newMinute).padStart(2, "0")}`;
      setSelectedHour(newHour);
      setSelectedMinute(newMinute);
      onChange(newTime);
    }
  }, [isTodayDate, selectedHour, selectedMinute, now, onChange]);

  React.useEffect(() => {
    if (date && value) {
      const [hours, minutes] = value.split(":").map(Number);
      setSelectedHour(hours);
      setSelectedMinute(minutes);
    }
  }, [date, value]);

  return (
    <div className="flex space-x-2">
      <Select
        onValueChange={(hour) => {
          setSelectedHour(parseInt(hour, 10));
          onChange(`${hour}:${selectedMinute !== null ? String(selectedMinute).padStart(2, "0") : "00"}`);
        }}
        value={selectedHour !== null ? String(selectedHour).padStart(2, "0") : ""}
        disabled={!date}
      >
        <SelectTrigger>
          <SelectValue placeholder="HH" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem key={hour} value={String(hour).padStart(2, "0")} disabled={isTodayDate && hour < now.getHours()}>
              {String(hour).padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(minute) => {
          setSelectedMinute(parseInt(minute, 10));
          onChange(`${selectedHour !== null ? String(selectedHour).padStart(2, "0") : "00"}:${minute}`);
        }}
        value={selectedMinute !== null ? String(selectedMinute).padStart(2, "0") : ""}
        disabled={!date}
      >
        <SelectTrigger>
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((minute) => (
            <SelectItem
              key={minute}
              value={String(minute).padStart(2, "0")}
              disabled={isTodayDate && selectedHour === now.getHours() && minute <= now.getMinutes()}
            >
              {String(minute).padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
