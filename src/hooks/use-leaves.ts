import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client"; // ✅ This fixes all "Cannot find name" errors

/* ---------------------------
   Leave Types
---------------------------- */
export function useLeaveTypes() {
  return useQuery({
    queryKey: ["leave-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leave_types")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw new Error(error.message);

      return data ?? [];
    },
  });
}

/* ---------------------------
   Leave Balances
---------------------------- */
export function useLeaveBalances(employeeId: string) {
  return useQuery({
    queryKey: ["leave-balances", employeeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leave_balances")
        .select(`
          *,
          leave_types(name)
        `)
        .eq("employee_id", employeeId);

      if (error) throw new Error(error.message);

      return data ?? [];
    },
    enabled: !!employeeId,
  });
}

/* ---------------------------
   My Leaves
---------------------------- */
export function useMyLeaves(employeeId: string, status: string = "all") {
  return useQuery({
    queryKey: ["my-leaves", employeeId, status],
    queryFn: async () => {
      let query = supabase
        .from("leaves")
        .select(`
          *,
          leave_types(name)
        `)
        .eq("employee_id", employeeId)
        .order("created_at", { ascending: false });

      if (status !== "all") {
        query = query.eq("status", status);
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);

      return data ?? [];
    },
    enabled: !!employeeId,
  });
}

/* ---------------------------
   Apply Leave
---------------------------- */
export function useApplyLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leaveData: {
      employee_id: string;
      leave_type_id: string;
      start_date: string;
      end_date: string;
      total_days: number;
      reason: string;
      is_half_day?: boolean;
      half_day_type?: string | null;
    }) => {
      const { data, error } = await supabase
        .from("leaves")
        .insert([leaveData])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-leaves"] });
      queryClient.invalidateQueries({ queryKey: ["leave-balances"] });
    },
  });
}

/* ---------------------------
   Cancel Leave
---------------------------- */
export function useCancelLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leaveId: string) => {
      const { data, error } = await supabase
        .from("leaves")
        .update({ status: "cancelled" })
        .eq("id", leaveId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-leaves"] });
      queryClient.invalidateQueries({ queryKey: ["leave-balances"] });
    },
  });
}

/* ---------------------------
   Holidays
---------------------------- */
export function useHolidays(year?: number) {
  const currentYear = year ?? new Date().getFullYear();

  return useQuery({
    queryKey: ["holidays", currentYear],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("holidays")
        .select("*")
        .gte("date", `${currentYear}-01-01`)
        .lte("date", `${currentYear}-12-31`)
        .order("date", { ascending: true });

      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });
}
