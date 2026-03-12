import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const notificationService = {
  async getUnread(employeeId: string) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("employee_id", employeeId)
      .eq("is_read", false)
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) throw error;
    return data;
  },

  async markAsRead(id: string) {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);
    if (error) throw error;
  },

  async markAllAsRead(employeeId: string) {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("employee_id", employeeId)
      .eq("is_read", false);
    if (error) throw error;
  },
};