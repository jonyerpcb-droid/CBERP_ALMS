export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || "Caritas Leave Management";

export const ROUTES = {
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  HR_DASHBOARD: "/hr",
  HR_EMPLOYEES: "/hr/employees",
  HR_IMPORT: "/hr/import",
  HR_LEAVE_POLICIES: "/hr/leave-policies",
  HR_HOLIDAYS: "/hr/holidays",
  HR_REPORTS: "/hr/reports",
  HR_SETTINGS: "/hr/settings",
  EMPLOYEE_DASHBOARD: "/employee",
  EMPLOYEE_APPLY: "/employee/apply-leave",
  EMPLOYEE_MY_LEAVES: "/employee/my-leaves",
  EMPLOYEE_CALENDAR: "/employee/calendar",
  EMPLOYEE_PROFILE: "/employee/profile",
  APPROVER_DASHBOARD: "/approver",
  APPROVER_PENDING: "/approver/pending",
  APPROVER_HISTORY: "/approver/history",
  APPROVER_DELEGATIONS: "/approver/delegations",
} as const;

export const ITEMS_PER_PAGE = 20;