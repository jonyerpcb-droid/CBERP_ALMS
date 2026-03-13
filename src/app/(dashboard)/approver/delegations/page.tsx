"use client";

import { DelegationForm } from "@/components/approver/delegation-form";
import { RoleGuard } from "@/components/shared/role-guard";

export default function DelegationsPage() {
  return (
    <RoleGuard roles={["approver", "hr"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Delegations</h1>
        <DelegationForm />
      </div>
    </RoleGuard>
  );
}
