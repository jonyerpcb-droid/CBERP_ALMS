import { create } from "zustand";
import type { Employee, RoleType } from "@/types";

interface AuthState {
  employee: Employee | null;
  roles: RoleType[];
  isLoading: boolean;
  setEmployee: (employee: Employee | null) => void;
  setRoles: (roles: RoleType[]) => void;
  setLoading: (loading: boolean) => void;
  hasRole: (role: RoleType) => boolean;
  primaryRole: () => RoleType;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  employee: null,
  roles: [],
  isLoading: true,

  setEmployee: (employee) => set({ employee }),
  setRoles: (roles) => set({ roles }),
  setLoading: (isLoading) => set({ isLoading }),

  hasRole: (role) => get().roles.includes(role),

  primaryRole: () => {
    const roles = get().roles;
    if (roles.includes("hr")) return "hr";
    if (roles.includes("approver")) return "approver";
    return "employee";
  },

  reset: () => set({ employee: null, roles: [], isLoading: false }),
}));