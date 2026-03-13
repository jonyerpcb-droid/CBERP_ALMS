"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeftRight } from "lucide-react";
import toast from "react-hot-toast";

export function DelegationForm() {
  const { employee } = useAuthStore();

  const [delegateEmail, setDelegateEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    // Validate date range
    if (new Date(endDate) < new Date(startDate)) {
      toast.error("End date must be after start date");
      return;
    }

    setLoading(true);

    try {
      const { data: delegate, error: delegateError } = await supabase
        .from("employees")
        .select("id")
        .eq("email", delegateEmail)
        .single();

      if (delegateError || !delegate) {
        toast.error("Employee not found");
        return;
      }

      const { error } = await supabase.from("delegations").insert({
        delegator_id: employee.id,
        delegate_id: delegate.id,
        start_date: startDate,
        end_date: endDate,
      });

      if (error) throw error;
      toast.success("Delegation created");
      setDelegateEmail("");
      setStartDate("");
      setEndDate("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5" /> Delegate Approvals
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Delegate To (Email)</Label>
            <Input
              type="email"
              placeholder="colleague@caritasbd.org"
              value={delegateEmail}
              onChange={(e) => setDelegateEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required min={startDate} />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Delegation
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
