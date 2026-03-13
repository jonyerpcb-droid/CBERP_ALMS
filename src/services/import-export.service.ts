// src/services/import-export.service.ts
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const importExportService = {
  exportToExcel: async (data: Record<string, any>[], fileName: string) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    if (data.length === 0) return;

    const columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key: key,
      width: 20,
    }));
    worksheet.columns = columns;

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4472C4" },
      };
      cell.alignment = { horizontal: "center" };
    });

    data.forEach((row) => {
      worksheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
  },

  importFromExcel: async (file: File): Promise<Record<string, any>[]> => {
    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) throw new Error("No worksheet found");

    const rows: Record<string, any>[] = [];
    const headers: string[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell) => {
          headers.push(String(cell.value || ""));
        });
      } else {
        const rowData: Record<string, any> = {};
        row.eachCell((cell, colNumber) => {
          rowData[headers[colNumber - 1]] = cell.value;
        });
        rows.push(rowData);
      }
    });

    return rows;
  },

  parseExcelFile: async (file: File): Promise<Record<string, any>[]> => {
    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) throw new Error("No worksheet found");

    const rows: Record<string, any>[] = [];
    const headers: string[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell) => {
          headers.push(
            String(cell.value || "")
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "_")
          );
        });
      } else {
        const rowData: Record<string, any> = {};
        row.eachCell((cell, colNumber) => {
          const key = headers[colNumber - 1];
          if (key) {
            rowData[key] = cell.value;
          }
        });
        if (Object.values(rowData).some((v) => v !== null && v !== undefined && v !== "")) {
          rows.push(rowData);
        }
      }
    });

    return rows;
  },

  uploadStagingData: async (data: Record<string, any>[]): Promise<void> => {
    const { default: axios } = await import("axios");
    await axios.post("/api/employees/import", { data });
  },

  downloadTemplate: async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees");

    const templateColumns = [
      { header: "Employee Code", key: "employee_code", width: 18 },
      { header: "Full Name", key: "full_name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 18 },
      { header: "Employee Type", key: "employee_type", width: 18 },
      { header: "Department", key: "department", width: 20 },
      { header: "Designation", key: "designation", width: 20 },
      { header: "Hire Date", key: "hire_date", width: 15 },
    ];

    worksheet.columns = templateColumns;

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4472C4" },
      };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        bottom: { style: "thin" },
      };
    });

    worksheet.addRow({
      employee_code: "EMP001",
      full_name: "John Doe",
      email: "john.doe@example.com",
      phone: "0771234567",
      employee_type: "permanent",
      department: "IT",
      designation: "Software Engineer",
      hire_date: "2024-01-15",
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "employee_import_template.xlsx");
  },
};
