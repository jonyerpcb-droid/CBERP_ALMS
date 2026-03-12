export type EmployeeType = "permanent" | "contractual";
export type EmployeeStatus = "active" | "inactive" | "on_leave" | "terminated";
export type HalfDayType = "first_half" | "second_half";
export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled" | "escalated";
export type ApprovalStatus = "pending" | "approved" | "rejected" | "skipped";
export type RoleType = "hr" | "approver" | "employee";

export interface Department {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubDepartment {
  id: string;
  department_id: string;
  name: string;
  is_active: boolean;
  department?: Department;
}

export interface Designation {
  id: string;
  title: string;
  level: number;
}

export interface Employee {
  id: string;
  auth_user_id: string | null;
  employee_code: string;
  full_name: string;
  email: string;
  phone: string | null;
  employee_type: EmployeeType;
  status: EmployeeStatus;
  department_id: string | null;
  sub_department_id: string | null;
  designation_id: string | null;
  supervisor_id: string | null;
  manager_id: string | null;
  project_director_id: string | null;
  hire_date: string | null;
  created_at: string;
  updated_at: string;
  department?: Department;
  sub_department?: SubDepartment;
  designation?: Designation;
  supervisor?: Employee;
  manager?: Employee;
  project_director?: Employee;
  roles?: EmployeeRole[];
}

export interface EmployeeRole {
  id: string;
  employee_id: string;
  role: RoleType;
  granted_at: string;
}

export interface LeaveType {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface LeavePolicy {
  id: string;
  employee_type: EmployeeType;
  leave_type_id: string;
  days_per_year: number;
  carry_forward: boolean;
  max_carry_forward: number;
  leave_type?: LeaveType;
}

export interface LeaveBalance {
  id: string;
  employee_id: string;
  leave_type_id: string;
  year: number;
  allocated_days: number;
  used_days: number;
  pending_days: number;
  leave_type?: LeaveType;
}

export interface Holiday {
  id: string;
  name: string;
  holiday_date: string;
  created_at: string;
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type_id: string;
  start_date: string;
  end_date: string;
  is_half_day: boolean;
  half_day_type: HalfDayType | null;
  total_days: number;
  reason: string | null;
  status: LeaveStatus;
  current_stage: number;
  created_at: string;
  updated_at: string;
  employee?: Employee;
  leave_type?: LeaveType;
  approvals?: LeaveApproval[];
}

export interface LeaveApproval {
  id: string;
  leave_request_id: string;
  stage_number: number;
  approver_id: string;
  status: ApprovalStatus;
  comments: string | null;
  acted_at: string | null;
  approver?: Employee;
}

export interface Delegation {
  id: string;
  delegator_id: string;
  delegate_id: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface Notification {
  id: string;
  employee_id: string;
  title: string;
  message: string;
  is_read: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
}