"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth-store";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/lib/constants";

export function useAuth() {
  const router = useRouter();
  const store = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      try {
        const employee = await authService.getCurrentEmployee();
        const roles = await authService.getCurrentRoles();
        store.setEmployee(employee);
        store.setRoles(roles);
      } catch {
        store.reset();
      } finally {
        store.setLoading(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_OUT") {
        store.reset();
        router.push(ROUTES.LOGIN);
      }
      if (event === "SIGNED_IN") {
        const employee = await authService.getCurrentEmployee();
        const roles = await authService.getCurrentRoles();
        store.setEmployee(employee);
        store.setRoles(roles);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    employee: store.employee,
    roles: store.roles,
    isLoading: store.isLoading,
    hasRole: store.hasRole,
    primaryRole: store.primaryRole,
  };
}