// src/hooks/use-leaves.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveService } from "@/services/leave.service";

export function useLeaveTypes() {
  return useQuery({
    queryKey: ["leave-types"],
    queryFn: () => leaveService.getLeaveTypes(),
  });
}

export function useLeaveBalances(employeeId: string) {
  return useQuery({
    queryKey: ["leave-balances", employeeId],
    queryFn: () => leaveService.getMyBalances(employeeId),
    enabled: !!employeeId,
  });
}

export function useMyLeaves(employeeId: string, status?: string) {
  return useQuery({
    queryKey: ["my-leaves", employeeId, status],
    queryFn: () => leaveService.getMyLeaves(employeeId, status),
    enabled: !!employeeId,
  });
}

export function useApplyLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      employee_id: string | number;
      leave_type_id: string;
      start_date: string;
      end_date: string;
      is_half_day: boolean;
      half_day_type: string | null;
      total_days: number;
      reason: string;
    }) => leaveService.applyForLeave(data),  // ← fixed: was applyLeave
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-leaves"] });
      queryClient.invalidateQueries({ queryKey: ["leave-balances"] });
    },
  });
}

export function useCancelLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (leaveId: string) => leaveService.cancelLeave(leaveId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-leaves"] });
      queryClient.invalidateQueries({ queryKey: ["leave-balances"] });
    },
  });
}

// src/hooks/use-leaves.ts — update only this function

export function useHolidays(year?: number) {
  const currentYear = year ?? new Date().getFullYear();
  return useQuery({
    queryKey: ["holidays", currentYear],
    queryFn: () => leaveService.getHolidays(currentYear),
  });
}
