"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DatePicker({ date, onSelect, placeholder = "Pick a date" }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : placeholder}
      </Button>
      {open && (
        <div className="absolute top-12 z-50 rounded-md border bg-popover p-3 shadow-md">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(d) => {
              onSelect(d);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
