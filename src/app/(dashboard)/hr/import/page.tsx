// src/app/(dashboard)/hr/import/page.tsx
"use client";

import { ExcelImport } from "@/components/hr/excel-import";
import { ExcelExport } from "@/components/hr/excel-export";
import { RoleGuard } from "@/components/shared/role-guard";

export default function ImportPage() {
  return (
    <RoleGuard roles={["hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Import / Export</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <ExcelImport />
          <ExcelExport />
        </div>
      </div>
    </RoleGuard>
  );
}
