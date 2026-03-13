// src/components/hr/excel-export.tsx
"use client";

import { useState } from "react";
import { importExportService } from "@/services/import-export.service";
import { employeeService } from "@/services/employee.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function ExcelExport() {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const { data } = await employeeService.getAll(1, 10000);
      const exportData = data.map((emp: any) => ({
        "Employee Code": emp.employee_code,
        "Full Name": emp.full_name,
        Email: emp.email,
        Phone: emp.phone || "",
        Type: emp.employee_type,
        Department: emp.department?.name || "",
        Status: emp.status,
      }));
      await importExportService.exportToExcel(
        exportData,
        `employees_${new Date().toISOString().split("T")[0]}`
      );
      toast.success("Exported!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" /> Export Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleExport} disabled={exporting} className="w-full">
          {exporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Export All Employees
        </Button>
      </CardContent>
    </Card>
  );
}
