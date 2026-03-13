"use client";

import { useAuthStore } from "@/store/auth-store";
import type { RoleType } from "@/types";

export function useRole() {
  const { roles, hasRole, primaryRole } = useAuthStore();

  return {
    roles,
    isHR: hasRole("hr"),
    isApprover: hasRole("approver"),
    isEmployee: hasRole("employee"),
    primaryRole: primaryRole(),
    hasRole: (role: RoleType) => hasRole(role),
  };
}
