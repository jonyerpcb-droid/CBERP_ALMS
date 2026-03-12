import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export const leaveApplicationSchema = z.object({
  leave_type_id: z.string().min(1, "Select leave type"),
  start_date: z.string().min(1, "Required"),
  end_date: z.string().min(1, "Required"),
  is_half_day: z.boolean().default(false),
  half_day_type: z.enum(["first_half", "second_half"]).nullable().optional(),
  reason: z.string().min(5, "Min 5 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type LeaveApplicationFormData = z.infer<typeof leaveApplicationSchema>;