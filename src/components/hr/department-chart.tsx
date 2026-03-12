"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DepartmentChart({ data }: { data: { department: string; leaves: number }[] }) {
  const max = Math.max(...data.map((d) => d.leaves), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leaves by Department</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((d) => (
          <div key={d.department} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{d.department}</span>
              <span className="font-medium">{d.leaves}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(d.leaves / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}