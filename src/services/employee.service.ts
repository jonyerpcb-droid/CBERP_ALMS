// src/services/employee.service.ts
import axios from "axios";

export interface Employee {
  id: string;
  full_name: string;
  employee_code: string;
  email: string;
  phone?: string;
  employee_type: string;
  status: string;
  hire_date?: string;
  department?: { name: string };
  designation?: { title: string };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const employeeService = {
  getAll: async (
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<PaginatedResponse<Employee>> => {
    const params: Record<string, any> = { page, limit };
    if (search) params.search = search;
    const response = await axios.get("/api/employees", { params });
    return response.data;
  },

  getById: async (id: string): Promise<Employee> => {
    const response = await axios.get(`/api/employees/${id}`);
    return response.data;
  },
};