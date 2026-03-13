"use client";

import type { LeaveBalance } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn, percentage } from "@/lib/utils";

const colors: Record<string, string> = {
  "Annual Leave": "from-teal-500 to-teal-600",
  "Sick Leave": "from-rose-500 to-rose-600",
  "Casual Leave": "from-amber-500 to-amber-600",
  "Maternity Leave": "from-purple-500 to-purple-600",
  "Unpaid Leave": "from-gray-500 to-gray-600",
  "Compensatory Off": "from-blue-500 to-blue-600",
};

export function LeaveBalanceCards({ balances }: { balances: LeaveBalance[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {balances.map((b) => {
        const remaining = b.allocated_days - b.used_days - b.pending_days;
        const pct = percentage(b.used_days, b.allocated_days);
        const color = colors[b.leave_type?.name || ""] || "from-gray-500 to-gray-600";

        return (
          <Card key={b.id} className="overflow-hidden">
            <div className={cn("h-2 bg-gradient-to-r", color)} />
            <CardContent className="p-4">
              <h3 className="font-semibold">{b.leave_type?.name}</h3>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold">{b.allocated_days}</p>
                  <p className="text-[10px] uppercase text-muted-foreground">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{b.used_days}</p>
                  <p className="text-[10px] uppercase text-muted-foreground">Used</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{remaining}</p>
                  <p className="text-[10px] uppercase text-muted-foreground">Left</p>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full bg-gradient-to-r transition-all", color)}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              {b.pending_days > 0 && (
                <p className="mt-2 text-xs text-yellow-600">{b.pending_days} day(s) pending</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
