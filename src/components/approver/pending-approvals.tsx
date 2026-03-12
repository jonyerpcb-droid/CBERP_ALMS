// src/components/approver/pending-approvals.tsx
"use client";

import { usePendingApprovals } from "@/hooks/use-approvals";
import { ApprovalCard } from "./approval-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";

interface PendingApproval {
  id: string;
  [key: string]: unknown;
}

export function PendingApprovals({ approverId }: { approverId: string }) {
  const { data: approvals, isLoading } = usePendingApprovals(approverId);

  if (isLoading) return <LoadingSpinner />;

  if (!approvals || approvals.length === 0) {
    return (
      <EmptyState
        title="All caught up!"
        description="No pending requests"
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {approvals.map((a: PendingApproval) => (
        <ApprovalCard key={a.id} approval={a} />
      ))}
    </div>
  );
}