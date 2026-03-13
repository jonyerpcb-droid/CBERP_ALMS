import { Employee, RoleType } from "./database";

export interface AuthUser {
  id: string;
  email: string;
  employee: Employee;
  roles: RoleType[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}
