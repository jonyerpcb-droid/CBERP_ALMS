"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useLeaveTypes, useApplyLeave } from "@/hooks/use-leaves";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { daysBetween } from "@/lib/utils";
import { Loader2, Send } from "lucide-react";
import toast from "react-hot-toast";

// 1. Defined the type locally to ensure TypeScript recognizes the structure
export type LeaveRequest = {
  employee_id: string | number;
  leave_type_id: string;
  start_date: string;
  end_date: string;
  is_half_day: boolean;
  half_day_type: string | null;
  total_days: number;
  reason: string;
};

export function LeaveApplicationForm() {
  const router = useRouter();
  const { employee } = useAuthStore();
  const { data: leaveTypes } = useLeaveTypes();
  
  // applyLeave is the mutation object returned by your custom hook
  const applyLeave = useApplyLeave();

  const [form, setForm] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
    is_half_day: false,
    half_day_type: "" as string,
    reason: "",
  });

  const totalDays =
    form.start_date && form.end_date
      ? form.is_half_day
        ? 0.5
        : daysBetween(form.start_date, form.end_date)
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employee) {
      toast.error("User not authenticated");
      return;
    }

    if (!form.leave_type_id || !form.start_date || !form.end_date) {
      toast.error("Please fill all required fields");
      return;
    }

    // 2. We use mutateAsync and pass the object. 
    // The "void" error happens if useApplyLeave hook isn't typed.
    try {
      await applyLeave.mutateAsync({
        employee_id: employee.id,
        leave_type_id: form.leave_type_id,
        start_date: form.start_date,
        end_date: form.end_date,
        is_half_day: form.is_half_day,
        half_day_type: form.is_half_day ? form.half_day_type : null,
        total_days: totalDays,
        reason: form.reason,
      });

      toast.success("Application submitted!");
      router.push("/employee/my-leaves");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Apply for Leave</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Leave Type *</Label>
            <select
              value={form.leave_type_id}
              onChange={(e) => setForm({ ...form, leave_type_id: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              <option value="">Select</option>
              {leaveTypes?.map((lt: { id: string; name: string }) => (
                <option key={lt.id} value={lt.id}>
                  {lt.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input 
                type="date" 
                value={form.start_date} 
                onChange={(e) => setForm({ ...form, start_date: e.target.value })} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>End Date *</Label>
              <Input 
                type="date" 
                value={form.end_date} 
                onChange={(e) => setForm({ ...form, end_date: e.target.value })} 
                required 
                min={form.start_date} 
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              checked={form.is_half_day}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_half_day: e.target.checked,
                  half_day_type: e.target.checked ? "first_half" : "",
                })
              }
            />
            Half Day
          </label>

          {totalDays > 0 && (
            <div className="rounded-lg bg-primary/10 p-3 text-center border border-primary/20">
              <p className="text-sm text-muted-foreground">Total Duration</p>
              <p className="text-lg font-bold text-primary">{totalDays} day(s)</p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Reason</Label>
            <Textarea
              placeholder="Please provide a reason for your leave..."
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={applyLeave.isPending}>
            {applyLeave.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {applyLeave.isPending ? "Submitting..." : "Submit Application"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}