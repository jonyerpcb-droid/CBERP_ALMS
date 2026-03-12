"use client";

import { useState } from "react";
import { useHolidays } from "@/hooks/use-leaves";
import { holidayService } from "@/services/holiday.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Plus, Trash2, CalendarDays, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function HolidayManager() {
  const year = new Date().getFullYear();
  const { data: holidays, isLoading } = useHolidays(year);
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!name || !date) return;
    setAdding(true);
    try {
      await holidayService.create({ name, holiday_date: date });
      queryClient.invalidateQueries({ queryKey: ["holidays"] });
      setName("");
      setDate("");
      toast.success("Holiday added");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await holidayService.remove(id);
      queryClient.invalidateQueries({ queryKey: ["holidays"] });
      toast.success("Removed");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" /> Holidays — {year}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input placeholder="Holiday name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1" />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Button onClick={handleAdd} disabled={adding}>
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-2">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : holidays && holidays.length > 0 ? (
            holidays.map((h: any) => (
              <div key={h.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(h.holiday_date)}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(h.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-sm text-muted-foreground">No holidays added</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}