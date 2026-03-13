import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, differenceInDays } from "date-fns";
import type { LeaveStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, fmt: string = "MMM dd, yyyy") {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, fmt);
}

export function daysBetween(start: string, end: string): number {
  return differenceInDays(parseISO(end), parseISO(start)) + 1;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: LeaveStatus | string): string {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    escalated: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

export function percentage(used: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((used / total) * 100);
}
