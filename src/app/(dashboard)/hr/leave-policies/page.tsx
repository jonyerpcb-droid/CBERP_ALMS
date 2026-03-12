"use client";

import { useLeaveTypes } from "@/hooks/use-leaves";
import { RoleGuard } from "@/components/shared/role-guard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function LeavePoliciesPage() {
  const { data: leaveTypes, isLoading } = useLeaveTypes();

  return (
    <RoleGuard roles={["hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Leave Policies</h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leaveTypes?.map((lt: typeof leaveTypes[number]) => (
              <Card key={lt.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{lt.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{lt.description || "No description"}</p>
                  <Badge className={`mt-2 ${lt.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {lt.is_active ? "Active" : "Inactive"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}