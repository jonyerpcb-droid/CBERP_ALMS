"use client";

import { Bell } from "lucide-react";
import { useNotifications, useMarkAllAsRead } from "@/hooks/use-notifications";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

export function NotificationBell() {
  const { employee } = useAuthStore();
  const { data: notifications } = useNotifications(employee?.id || "");
  const markAll = useMarkAllAsRead();
  const [open, setOpen] = useState(false);
  const count = notifications?.length || 0;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-full p-2 hover:bg-accent"
      >
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b p-3">
            <h3 className="font-semibold">Notifications</h3>
            {count > 0 && (
              <button
                className="text-xs text-primary hover:underline"
                onClick={() => markAll.mutate(employee?.id || "")}
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications && notifications.length > 0 ? (
              notifications.map((n: any) => (
                <div key={n.id} className="border-b p-3 last:border-0 hover:bg-accent/50">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {formatDate(n.created_at, "MMM dd, hh:mm a")}
                  </p>
                </div>
              ))
            ) : (
              <p className="p-6 text-center text-sm text-muted-foreground">
                No new notifications
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}