"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
} from "date-fns";
import type { LeaveRequest, Holiday } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  leaves: LeaveRequest[];
  holidays: Holiday[];
}

export function LeaveCalendarView({ leaves, holidays }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const blanks = Array(monthStart.getDay()).fill(null);

  const getLeave = (d: Date) =>
    leaves.find(
      (l) =>
        isWithinInterval(d, {
          start: new Date(l.start_date),
          end: new Date(l.end_date),
        }) && l.status === "approved"
    );

  const getHoliday = (d: Date) =>
    holidays.find((h) => isSameDay(new Date(h.holiday_date), d));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
          <div className="flex gap-1">
            <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-0 h-auto w-auto bg-transparent hover:bg-gray-100">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-0 h-auto w-auto bg-transparent hover:bg-gray-100">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="p-2 text-center text-xs font-medium text-muted-foreground">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((_, i) => (
            <div key={`b-${i}`} />
          ))}
          {days.map((day: Date) => {
            const leave = getLeave(day);
            const holiday = getHoliday(day);
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[60px] rounded-md border p-1 text-xs",
                  isToday(day) && "border-primary bg-primary/5",
                  leave && "bg-teal-50 dark:bg-teal-950",
                  holiday && "bg-rose-50 dark:bg-rose-950"
                )}
              >
                <span className={cn("font-medium", isToday(day) && "text-primary")}>
                  {format(day, "d")}
                </span>
                {leave && (
                  <Badge className="mt-1 block truncate px-1 text-[9px] bg-teal-600 text-white hover:bg-teal-700">
                    {leave.leave_type?.name}
                  </Badge>
                )}
                {holiday && (
                  <Badge className="mt-1 block truncate px-1 text-[9px] bg-rose-600 text-white hover:bg-rose-700">
                    {holiday.name}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}