"use client";

import { StatCard } from "@/components/ui/stat-card";
import { RoleGuard } from "@/components/shared/role-guard";
import { Users, Clock, CheckCircle, CalendarOff } from "lucide-react";

export default function HRDashboard() {
  return (
    <RoleGuard roles={["hr"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">HR Dashboard</h1>
          <p className="text-muted-foreground">Overview of leave management system</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Employees" value={0} icon={Users} />
          <StatCard title="Pending Requests" value={0} icon={Clock} />
          <StatCard title="Approved Today" value={0} icon={CheckCircle} />
          <StatCard title="On Leave Today" value={0} icon={CalendarOff} />
        </div>
      </div>
    </RoleGuard>
  );
}