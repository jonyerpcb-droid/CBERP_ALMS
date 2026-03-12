// src/app/(dashboard)/employee/my-leaves/page.tsx
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
  const { employee } = useAuth();
  const [status, setStatus] = useState("all");
  const { data: leaves, isLoading } = useMyLeaves(employee?.id || "", status);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Leaves</h1>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            onClick={() => setStatus(f)}
            className={`capitalize ${status === f ? "bg-blue-600 text-white" : "border border-gray-300"}`}
          >
            {f}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : leaves && leaves.length > 0 ? (
        <LeaveHistoryTable leaves={leaves} />
      ) : (
        <EmptyState title="No leaves found" description="You haven't taken any leaves yet." />
      )}
    </div>
  );
}