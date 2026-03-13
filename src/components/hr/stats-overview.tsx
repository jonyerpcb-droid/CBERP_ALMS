"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Users, Clock, CheckCircle, CalendarOff } from "lucide-react";

interface Props {
  totalEmployees: number;
  pendingRequests: number;
  approvedToday: number;
  onLeaveToday: number;
}

export function HRStatsOverview({ totalEmployees, pendingRequests, approvedToday, onLeaveToday }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Employees" value={totalEmployees} icon={Users} />
      <StatCard title="Pending Requests" value={pendingRequests} icon={Clock} />
      <StatCard title="Approved Today" value={approvedToday} icon={CheckCircle} />
      <StatCard title="On Leave Today" value={onLeaveToday} icon={CalendarOff} />
    </div>
  );
}
