"use client";

import { useState } from "react";
import { useEmployees } from "@/hooks/use-employee";
import { RoleGuard } from "@/components/shared/role-guard";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials, getStatusColor } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useEmployees(page, search || undefined);

  return (
    <RoleGuard roles={["hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Employees</h1>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Employee</th>
                  <th className="px-4 py-3 text-left font-medium">Code</th>
                  <th className="px-4 py-3 text-left font-medium">Department</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((emp: any) => (
                  <tr key={emp.id} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <Link href={`/hr/employees/${emp.id}`} className="flex items-center gap-3 hover:underline">
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
        )}

        <div className="flex gap-2">
          <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Button onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    </RoleGuard>
  );
}