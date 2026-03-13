"use client";

import { RoleGuard } from "@/components/shared/role-guard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <RoleGuard roles={["hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" /> System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">System settings will be configured here.</p>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
