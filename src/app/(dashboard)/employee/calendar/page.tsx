"use client";

import { useAuth } from "@/hooks/use-auth";
import { useMyLeaves, useHolidays } from "@/hooks/use-leaves";
import { LeaveCalendarView } from "@/components/employee/leave-calendar-view";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function CalendarPage() {
  const { employee } = useAuth();
  const { data: leaves, isLoading: ll } = useMyLeaves(employee?.id || "");
  const { data: holidays, isLoading: lh } = useHolidays();

  if (ll || lh) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leave Calendar</h1>
      <LeaveCalendarView leaves={leaves || []} holidays={holidays || []} />
    </div>
  );
}
