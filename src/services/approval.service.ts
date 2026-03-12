import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const approvalService = {
  async getPendingApprovals(approverId: string) {
    const { data, error } = await supabase
      .from("leave_approvals")
      .select(
        `*, leave_request:leave_requests(*, employee:employees(id, full_name, employee_code, department:departments(name)), leave_type:leave_types(id, name))`
      )
      .eq("approver_id", approverId)
      .eq("status", "pending");

    if (error) throw error;
    return data;
  },

  async getApprovalHistory(approverId: string) {
    const { data, error } = await supabase
      .from("leave_approvals")
      .select(
        `*, leave_request:leave_requests(*, employee:employees(id, full_name, employee_code), leave_type:leave_types(id, name))`
      )
      .eq("approver_id", approverId)
      .neq("status", "pending")
      .order("acted_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async approveLeave(approvalId: string, comments?: string) {
    const { error } = await supabase
      .from("leave_approvals")
      .update({
        status: "approved",
        comments,
        acted_at: new Date().toISOString(),
      })
      .eq("id", approvalId);
    if (error) throw error;
  },

  async rejectLeave(approvalId: string, comments: string) {
    const { error } = await supabase
      .from("leave_approvals")
      .update({
        status: "rejected",
        comments,
        acted_at: new Date().toISOString(),
      })
      .eq("id", approvalId);
    if (error) throw error;
  },
};