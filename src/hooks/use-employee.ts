// src/hooks/use-employee.ts
import { useQuery } from "@tanstack/react-query";
import { employeeService } from "@/services/employee.service";

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

export function useEmployee(id: string) {
  return useQuery<Employee>({
    queryKey: ["employee", id],
    queryFn: () => employeeService.getById(id),
    enabled: !!id,
  });
}

export function useEmployees(page: number, search?: string) {
  return useQuery<PaginatedResponse<Employee>>({
    queryKey: ["employees", page, search],
    queryFn: () => employeeService.getAll(page, 10, search),
  });
}