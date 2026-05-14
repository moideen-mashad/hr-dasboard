import { EmployeeTable } from "@/components/dashboard/EmployeeTable";
import { AddEmployeeDialog } from "@/components/dashboard/AddEmployeeDialog";

export default function EmployeesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Employees</h2>
          <p className="text-muted-foreground mt-2">
            Manage your workforce directory and details.
          </p>
        </div>
        <AddEmployeeDialog />
      </div>

      <div className="bg-card rounded-2xl shadow-sm p-6 border border-border">
        <EmployeeTable />
      </div>
    </div>
  );
}
