"use client";

import type { Employee } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getInitials, formatDate, getStatusColor } from "@/lib/utils";
import { Mail, Phone, Building, Briefcase, Calendar } from "lucide-react";

export function ProfileCard({ employee }: { employee: Employee }) {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            {getInitials(employee.full_name)}
          </div>
          <div>
            <CardTitle>{employee.full_name}</CardTitle>
            <p className="text-sm text-muted-foreground">{employee.employee_code}</p>
            <div className="mt-1 flex gap-2">
              <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
              <Badge>{employee.employee_type}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm">{employee.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm">{employee.phone || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Department</p>
              <p className="text-sm">{employee.department?.name || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Designation</p>
              <p className="text-sm">{employee.designation?.title || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Hire Date</p>
              <p className="text-sm">{employee.hire_date ? formatDate(employee.hire_date) : "—"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}