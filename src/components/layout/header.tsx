"use client";

import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/services/auth.service";
import { NotificationBell } from "@/components/shared/notification-bell";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { getInitials } from "@/lib/utils";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const { employee } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <MobileNav />
        <h2 className="hidden text-lg font-semibold sm:block">
          Welcome, {employee?.full_name?.split(" ")[0] || "User"}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NotificationBell />

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-full p-1 hover:bg-accent"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {getInitials(employee?.full_name || "U")}
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-lg border bg-card py-1 shadow-lg">
              <div className="border-b px-4 py-3">
                <p className="text-sm font-medium">{employee?.full_name}</p>
                <p className="text-xs text-muted-foreground">{employee?.email}</p>
              </div>
              <button
                onClick={() => {
                  router.push("/employee/profile");
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
              >
                <User className="h-4 w-4" /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-accent"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}