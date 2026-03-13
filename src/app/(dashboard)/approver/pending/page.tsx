"use client";

import { useAuth } from "@/hooks/use-auth";
import { PendingApprovals } from "@/components/approver/pending-approvals";
import { RoleGuard } from "@/components/shared/role-guard";

export default function PendingPage() {
  const { employee } = useAuth();

  return (
    <RoleGuard roles={["approver", "hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pending Approvals</h1>
        <PendingApprovals approverId={employee?.id || ""} />
      </div>
    </RoleGuard>
  );
}
