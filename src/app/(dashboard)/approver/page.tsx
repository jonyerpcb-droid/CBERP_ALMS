"use client";

import { useAuth } from "@/hooks/use-auth";
import { usePendingApprovals } from "@/hooks/use-approvals";
import { StatCard } from "@/components/ui/stat-card";
import { PendingApprovals } from "@/components/approver/pending-approvals";
import { RoleGuard } from "@/components/shared/role-guard";
import { Clock, CheckCircle } from "lucide-react";

export default function ApproverDashboard() {
  const { employee } = useAuth();
  const { data: pending } = usePendingApprovals(employee?.id || "");

  return (
    <RoleGuard roles={["approver", "hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Approver Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard title="Pending" value={pending?.length || 0} icon={Clock} />
          <StatCard title="Approved This Month" value={0} icon={CheckCircle} />
        </div>
        <h2 className="text-xl font-semibold">Pending Approvals</h2>
        <PendingApprovals approverId={employee?.id || ""} />
      </div>
    </RoleGuard>
  );
}
