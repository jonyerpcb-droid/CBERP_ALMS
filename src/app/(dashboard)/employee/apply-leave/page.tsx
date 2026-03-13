import { LeaveApplicationForm } from "@/components/employee/leave-application-form";

export default function ApplyLeavePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Apply for Leave</h1>
      <LeaveApplicationForm />
    </div>
  );
  
}
