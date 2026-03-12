"use client";

import { useAuth } from "@/hooks/use-auth";
import { ApprovalHistory } from "@/components/approver/approval-history";
import { RoleGuard } from "@/components/shared/role-guard";

export default function HistoryPage() {
  const { employee } = useAuth();

  return (
    <RoleGuard roles={["approver", "hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Approval History</h1>
        <ApprovalHistory approverId={employee?.id || ""} />
      </div>
    </RoleGuard>
  );
}