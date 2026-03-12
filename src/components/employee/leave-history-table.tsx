"use client";

import type { LeaveRequest } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusColor, formatDate } from "@/lib/utils";
import { useCancelLeave } from "@/hooks/use-leaves";
import { X } from "lucide-react";

export function LeaveHistoryTable({ leaves }: { leaves: LeaveRequest[] }) {
  const cancelLeave = useCancelLeave();

  return (
    <div className="rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">From</th>
              <th className="px-4 py-3 text-left">To</th>
              <th className="px-4 py-3 text-left">Days</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{leave.leave_type?.name}</td>
                <td className="px-4 py-3">{formatDate(leave.start_date)}</td>
                <td className="px-4 py-3">{formatDate(leave.end_date)}</td>
                <td className="px-4 py-3">{leave.total_days}</td>
                <td className="px-4 py-3">
                  <Badge className={getStatusColor(leave.status)}>{leave.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {leave.status === "pending" && (
                    <Button
                      onClick={() => cancelLeave.mutate(leave.id)}
                    >
                      <X className="mr-1 h-3 w-3" /> Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}