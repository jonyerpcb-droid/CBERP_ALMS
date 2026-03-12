"use client";

import { useAuth } from "@/hooks/use-auth";
import { useLeaveBalances, useMyLeaves } from "@/hooks/use-leaves";
import { StatCard } from "@/components/ui/stat-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeaveBalanceCards } from "@/components/employee/leave-balance-cards";

export default function EmployeeDashboard() {
  const { employee } = useAuth();
  const { data: balances, isLoading: lb } = useLeaveBalances(employee?.id || "");
  const { data: leaves, isLoading: ll } = useMyLeaves(employee?.id || "");

  if (lb || ll) return <LoadingSpinner />;

  const pending = leaves?.filter((l: typeof leaves[number]) => l.status === "pending").length || 0;
  const approved = leaves?.filter((l: typeof leaves[number]) => l.status === "approved").length || 0;
  const rejected = leaves?.filter((l: typeof leaves[number]) => l.status === "rejected").length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {employee?.full_name}</p>
        </div>
        <Link href="/employee/apply-leave">
          <Button>Apply for Leave</Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Pending" value={pending} icon={Clock} />
        <StatCard title="Approved" value={approved} icon={CheckCircle} />
        <StatCard title="Rejected" value={rejected} icon={XCircle} />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Leave Balances</h2>
        {balances && <LeaveBalanceCards balances={balances} />}
      </div>
    </div>
  );
}
