"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProfileCard } from "@/components/employee/profile-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function ProfilePage() {
  const { employee } = useAuth();
  if (!employee) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <ProfileCard employee={employee} />
    </div>
  );
}
