"use client";

import { HolidayManager } from "@/components/hr/holiday-manager";
import { RoleGuard } from "@/components/shared/role-guard";

export default function HolidaysPage() {
  return (
    <RoleGuard roles={["hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Holidays</h1>
        <div className="max-w-2xl">
          <HolidayManager />
        </div>
      </div>
    </RoleGuard>
  );
}
