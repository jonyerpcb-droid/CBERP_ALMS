"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMyLeaves } from "@/hooks/use-leaves";
import { LeaveHistoryTable } from "@/components/employee/leave-history-table";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

const filters = ["all", "pending", "approved", "rejected", "cancelled"];

export default function MyLeavesPage() {
  const { employee, isLoading: authLoading, primaryRole } = useAuth();
  const [status, setStatus] = useState("all");

  const employeeId = employee?.id ?? "";

  // The 'leaves' variable here is what's likely causing the .filter error elsewhere
  const { data: leaves, isLoading: leavesLoading } = useMyLeaves(employeeId, status);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  // ✅ Fix 1: Add a check for 'employee' before checking the role
  // This prevents errors if 'employee' is null during the initial load
  if (!employee || primaryRole() !== "employee") {
    return (
      <EmptyState
        title="Access Restricted"
        description="This page is only available for employees."
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Leaves</h1>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            onClick={() => setStatus(f)}
            variant={status === f ? "default" : "outline"}
            className="capitalize"
          >
            {f}
          </Button>
        ))}
      </div>

      {leavesLoading ? (
        <LoadingSpinner />
      ) : /* ✅ Fix 2: Defensive check for 'leaves' array */
        Array.isArray(leaves) && leaves.length > 0 ? (
        <LeaveHistoryTable leaves={leaves} />
      ) : (
        <EmptyState
          title="No leaves found"
          description="You haven't taken any leaves yet or there was an error loading them."
        />
      )}
    </div>
  );
}
