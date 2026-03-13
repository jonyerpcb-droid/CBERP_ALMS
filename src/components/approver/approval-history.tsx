// src/components/approver/approval-history.tsx
"use client";

import { useApprovalHistory } from "@/hooks/use-approvals";
import { Badge } from "@/components/ui/badge";
import { formatDate, getStatusColor } from "@/lib/utils";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";

interface ApprovalHistoryItem {
  id: string;
  status: string;
  acted_at?: string;
  comments?: string;
  leave_request?: {
    employee?: { full_name: string };
    leave_type?: { name: string };
  };
}

export function ApprovalHistory({ approverId }: { approverId: string }) {
  const { data: history, isLoading } = useApprovalHistory(approverId);

  if (isLoading) return <LoadingSpinner />;

  if (!history || history.length === 0) {
    return <EmptyState title="No history" description="No approval history found" />;
  }

  return (
    <div className="rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Decision</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Comments</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h: ApprovalHistoryItem) => (
              <tr key={h.id} className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{h.leave_request?.employee?.full_name}</td>
                <td className="px-4 py-3">{h.leave_request?.leave_type?.name}</td>
                <td className="px-4 py-3">
                  <Badge className={getStatusColor(h.status)}>{h.status}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {h.acted_at ? formatDate(h.acted_at) : "—"}
                </td>
                <td className="max-w-[200px] truncate px-4 py-3">{h.comments || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
