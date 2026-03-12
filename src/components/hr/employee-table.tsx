"use client";

import type { Employee } from "@/types";
import { Badge } from "@/components/ui/badge";
import { getInitials, getStatusColor } from "@/lib/utils";
import Link from "next/link";

export function EmployeeTable({ employees }: { employees: Employee[] }) {
  return (
    <div className="rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-left">Code</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b hover:bg-muted/30">
              <td className="px-4 py-3">
                <Link href={`/hr/employees/${emp.id}`} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {getInitials(emp.full_name)}
                  </div>
                  <div>
                    <p className="font-medium">{emp.full_name}</p>
                    <p className="text-xs text-muted-foreground">{emp.email}</p>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3 font-mono text-xs">{emp.employee_code}</td>
              <td className="px-4 py-3">{emp.department?.name || "—"}</td>
              <td className="px-4 py-3">
                <Badge className={getStatusColor(emp.status)}>{emp.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}