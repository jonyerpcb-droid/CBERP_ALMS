// src/components/hr/excel-import.tsx
"use client";

import { useState, useRef } from "react";
import { importExportService } from "@/services/import-export.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Loader2, FileSpreadsheet } from "lucide-react";
import toast from "react-hot-toast";

export function ExcelImport() {
  const [importing, setImporting] = useState(false);
  const [parsedData, setParsedData] = useState<Record<string, any>[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const data = await importExportService.parseExcelFile(file);
      setParsedData(data);
      toast.success(`Parsed ${data.length} row(s) from file`);
    } catch (error: any) {
      toast.error(error.message || "Failed to parse file");
      setParsedData(null);
    } finally {
      setImporting(false);
    }
  };

  const handleUpload = async () => {
    if (!parsedData || parsedData.length === 0) return;

    setImporting(true);
    try {
      await importExportService.uploadStagingData(parsedData);
      toast.success(`Imported ${parsedData.length} employee(s) successfully!`);
      setParsedData(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error: any) {
      toast.error(error.message || "Failed to import data");
    } finally {
      setImporting(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      await importExportService.downloadTemplate();
      toast.success("Template downloaded!");
    } catch (error: any) {
      toast.error(error.message || "Failed to download template");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" /> Import Employees
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" onClick={handleDownloadTemplate} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Template
        </Button>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Excel File</label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
          />
        </div>

        {parsedData && parsedData.length > 0 && (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-3 text-center border">
              <FileSpreadsheet className="mx-auto h-8 w-8 text-primary mb-1" />
              <p className="text-sm font-medium">{parsedData.length} row(s) ready to import</p>
            </div>

            <div className="max-h-48 overflow-auto rounded-md border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/50">
                    {Object.keys(parsedData[0]).map((key) => (
                      <th key={key} className="px-2 py-1 text-left font-medium">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsedData.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-b">
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-2 py-1">
                          {String(val ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {parsedData.length > 5 && (
                <p className="p-2 text-center text-xs text-muted-foreground">
                  ...and {parsedData.length - 5} more row(s)
                </p>
              )}
            </div>

            <Button onClick={handleUpload} disabled={importing} className="w-full">
              {importing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              {importing ? "Importing..." : "Confirm Import"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
