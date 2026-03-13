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

export function LeaveApplicationForm() {
  const router = useRouter();
  const { employee } = useAuthStore();
  
  // ✅ Data fetching via hook
  const { data: leaveTypes, isLoading: loadingTypes } = useLeaveTypes();
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
      toast.error("User not authenticated. Please log in again.");
      return;
    }

    if (!form.leave_type_id || !form.start_date || !form.end_date) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await applyLeave.mutateAsync({
        employee_id: employee.id,
        leave_type_id: form.leave_type_id,
        start_date: form.start_date,
        end_date: form.end_date,
        is_half_day: form.is_half_day,
        half_day_type: form.is_half_day ? (form.half_day_type || "first_half") : null,
        total_days: totalDays,
        reason: form.reason,
      });

      toast.success("Application submitted successfully!");
      router.push("/employee/my-leaves");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    }
  };

  return (
    <Card className="max-w-2xl border-primary/10 shadow-lg">
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
              required
              disabled={loadingTypes}
            >
              <option value="">{loadingTypes ? "Loading types..." : "Select Leave Type"}</option>
              {/* ✅ Added Array.isArray check to prevent crash */}
              {Array.isArray(leaveTypes) && leaveTypes.map((lt: any) => (
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

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="half-day"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              checked={form.is_half_day}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_half_day: e.target.checked,
                  half_day_type: e.target.checked ? "first_half" : "",
                })
              }
            />
            <Label htmlFor="half-day" className="cursor-pointer">Request Half Day</Label>
          </div>

          {totalDays > 0 && (
            <div className="rounded-lg bg-primary/5 p-4 text-center border border-primary/10">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Total Days</p>
              <p className="text-2xl font-bold text-primary">{totalDays}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Reason for Leave</Label>
            <Textarea
              placeholder="Briefly explain the reason for your request..."
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              rows={3}
              className="resize-none"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={applyLeave.isPending || loadingTypes}
          >
            {applyLeave.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
