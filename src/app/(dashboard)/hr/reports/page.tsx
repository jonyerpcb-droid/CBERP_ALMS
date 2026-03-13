"use client";

import { RoleGuard } from "@/components/shared/role-guard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <RoleGuard roles={["hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" /> Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Reports and charts will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
