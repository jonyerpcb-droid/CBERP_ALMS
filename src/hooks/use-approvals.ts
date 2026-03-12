"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { approvalService } from "@/services/approval.service";
import toast from "react-hot-toast";

export function usePendingApprovals(approverId: string) {
  return useQuery({
    queryKey: ["pendingApprovals", approverId],
    queryFn: () => approvalService.getPendingApprovals(approverId),
    enabled: !!approverId,
    refetchInterval: 30000,
  });
}

export function useApprovalHistory(approverId: string) {
  return useQuery({
    queryKey: ["approvalHistory", approverId],
    queryFn: () => approvalService.getApprovalHistory(approverId),
    enabled: !!approverId,
  });
}

export function useApproveLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comments }: { id: string; comments?: string }) =>
      approvalService.approveLeave(id, comments),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingApprovals"] });
      queryClient.invalidateQueries({ queryKey: ["approvalHistory"] });
      toast.success("Leave approved");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useRejectLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comments }: { id: string; comments: string }) =>
      approvalService.rejectLeave(id, comments),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingApprovals"] });
      queryClient.invalidateQueries({ queryKey: ["approvalHistory"] });
      toast.success("Leave rejected");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}