import axios from "axios";
import { supabase } from "@/lib/supabase/client";

export const leaveService = {
getLeaveTypes: async () => {
  console.log("🚀 getLeaveTypes: Function started"); // <--- LOG 1
  
  const { data, error } = await supabase
    .from("leave_types")
    .select("*");

  if (error) {
    console.error("❌ Supabase Error:", error.message); // <--- LOG 2
    throw error;
  }
  
  console.log("✅ Leave types found:", data); // <--- LOG 3
  return data || [];
},

  /**
   * ✅ GET LEAVE BALANCES
   * Fetches from Supabase 'leave_balances' table for a specific employee.
   */
  getMyBalances: async (employeeId: string) => {
    const { data, error } = await supabase
      .from("leave_balances")
      .select(`
        *,
        leave_type:leave_types(*)
      `)
      .eq("employee_id", employeeId);

    if (error) {
      console.error("Supabase Error (getMyBalances):", error.message);
      throw error;
    }
    return data || [];
  },

  /**
   * ✅ GET MY LEAVES (HISTORY)
   * Fetches leave applications with status filtering.
   */
  getMyLeaves: async (employeeId: string, status?: string) => {
    let query = supabase
      .from("leaves")
      .select(`
        *,
        leave_type:leave_types(*),
        approver:employees!leaves_approver_id_fkey(*)
      `)
      .eq("employee_id", employeeId)
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase Error (getMyLeaves):", error.message);
      throw error;
    }
    return data || [];
  },

  /**
   * ✅ APPLY FOR LEAVE
   * Uses Axios to trigger your backend logic (emails, validations, etc.)
   */
  applyForLeave: async (data: any) => {
    const response = await axios.post("/api/leaves", data);
    return response.data;
  },

  /**
   * ✅ CANCEL LEAVE
   */
  cancelLeave: async (leaveId: string) => {
    const response = await axios.patch(`/api/leaves/${leaveId}/cancel`);
    return response.data;
  },

  /**
   * ✅ GET HOLIDAYS
   * Fetches from Supabase 'holidays' table.
   */
  getHolidays: async (year: number) => {
    const { data, error } = await supabase
      .from("holidays")
      .select("*")
      .filter("date", "gte", `${year}-01-01`)
      .filter("date", "lte", `${year}-12-31`)
      .order("date", { ascending: true });

    if (error) {
      console.error("Supabase Error (getHolidays):", error.message);
      throw error;
    }
    return data || [];
  },
};
