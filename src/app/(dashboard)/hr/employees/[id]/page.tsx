"use client";

import { useParams } from "next/navigation";
import { useEmployee } from "@/hooks/use-employee";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInitials, getStatusColor, formatDate } from "@/lib/utils";

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: emp, isLoading } = useEmployee(id);

  if (isLoading) return <LoadingSpinner />;
  if (!emp) return <p className="p-8">Employee not found</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Employee Details</h1>
      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {getInitials(emp.full_name)}
            </div>
            <div>
              <CardTitle>{emp.full_name}</CardTitle>
              <p className="text-sm text-muted-foreground">{emp.employee_code}</p>
              <Badge className={getStatusColor(emp.status)}>{emp.status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm">{emp.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm">{emp.phone || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Department</p>
            <p className="text-sm">{emp.department?.name || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Designation</p>
            <p className="text-sm">{emp.designation?.title || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="text-sm capitalize">{emp.employee_type}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hire Date</p>
            <p className="text-sm">{emp.hire_date ? formatDate(emp.hire_date) : "—"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}