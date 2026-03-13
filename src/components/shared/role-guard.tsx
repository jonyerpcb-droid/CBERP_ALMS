"use client";

import { useRole } from "@/hooks/use-role";
import type { RoleType } from "@/types";

interface RoleGuardProps {
  roles: RoleType[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ roles, children, fallback }: RoleGuardProps) {
  const { hasRole } = useRole();
  const hasAccess = roles.some((role) => hasRole(role));

  if (!hasAccess) {
    return fallback ? <>{fallback}</> : <p className="p-8 text-center text-muted-foreground">Access denied</p>;
  }

  return <>{children}</>;
}
