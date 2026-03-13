"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRole } from "@/hooks/use-role";
import {
  LayoutDashboard, Users, FileUp, CalendarDays, ClipboardList,
  Settings, UserCircle, PlusCircle, History, CheckSquare,
  Clock, BarChart3, CalendarCheck, ArrowLeftRight,
} from "lucide-react";

const hrLinks = [
  { href: "/hr", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hr/employees", label: "Employees", icon: Users },
  { href: "/hr/import", label: "Import / Export", icon: FileUp },
  { href: "/hr/leave-policies", label: "Leave Policies", icon: ClipboardList },
  { href: "/hr/holidays", label: "Holidays", icon: CalendarDays },
  { href: "/hr/reports", label: "Reports", icon: BarChart3 },
  { href: "/hr/settings", label: "Settings", icon: Settings },
];

const employeeLinks = [
  { href: "/employee", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employee/apply-leave", label: "Apply Leave", icon: PlusCircle },
  { href: "/employee/my-leaves", label: "My Leaves", icon: History },
  { href: "/employee/calendar", label: "Calendar", icon: CalendarCheck },
  { href: "/employee/profile", label: "Profile", icon: UserCircle },
];

const approverLinks = [
  { href: "/approver", label: "Dashboard", icon: LayoutDashboard },
  { href: "/approver/pending", label: "Pending Approvals", icon: Clock },
  { href: "/approver/history", label: "History", icon: CheckSquare },
  { href: "/approver/delegations", label: "Delegations", icon: ArrowLeftRight },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isHR, isApprover } = useRole();

  const sections = [
    ...(isHR ? [{ title: "HR Management", links: hrLinks }] : []),
    ...(isApprover ? [{ title: "Approvals", links: approverLinks }] : []),
    { title: "Employee", links: employeeLinks },
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            C
          </div>
          <span className="text-lg font-bold">Caritas LMS</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
