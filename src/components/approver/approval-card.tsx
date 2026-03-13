"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, getInitials } from "@/lib/utils";
import { useApproveLeave, useRejectLeave } from "@/hooks/use-approvals";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export function ApprovalCard({ approval }: { approval: any }) {
  const [comments, setComments] = useState("");
  const approveMutation = useApproveLeave();
  const rejectMutation = useRejectLeave();

  const request = approval.leave_request;
  const emp = request?.employee;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {getInitials(emp?.full_name || "?")}
            </div>
            <div>
              <p className="font-semibold">{emp?.full_name}</p>
              <p className="text-xs text-muted-foreground">{emp?.employee_code}</p>
            </div>
          </div>
          <Badge className="bg-secondary text-secondary-foreground">Stage {approval.stage_number}</Badge>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="font-medium">{request?.leave_type?.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Days</p>
            <p className="font-medium">{request?.total_days}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="font-medium">{formatDate(request?.start_date)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">To</p>
            <p className="font-medium">{formatDate(request?.end_date)}</p>
          </div>
        </div>

        {request?.reason && (
          <div className="mt-3 rounded-lg bg-muted p-2">
            <p className="text-xs text-muted-foreground">Reason</p>
            <p className="text-sm">{request.reason}</p>
          </div>
        )}

        <Textarea
          className="mt-3 text-sm"
          placeholder="Comments (required for rejection)..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={2}
        />
      </CardContent>

      <CardFooter className="gap-2 border-t p-4">
        <Button
          onClick={() => approveMutation.mutate({ id: approval.id, comments })}
          disabled={approveMutation.isPending}
          className="flex-1"
        >
          {approveMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="mr-2 h-4 w-4" />
          )}
          Approve
        </Button>
        <Button
          onClick={() => rejectMutation.mutate({ id: approval.id, comments })}
          disabled={rejectMutation.isPending || !comments.trim()}
          className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          {rejectMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <XCircle className="mr-2 h-4 w-4" />
          )}
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
}
