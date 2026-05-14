import { Users } from "lucide-react";

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
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
          Add Employee
        </button>
      </div>

      <div className="border border-border bg-card rounded-2xl shadow-sm min-h-[500px] flex flex-col items-center justify-center p-6">
        <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground">Employee Table</h3>
        <p className="text-muted-foreground text-center mt-2 max-w-sm">
          The employee directory table will be displayed here, supporting pagination, sorting, and filtering.
        </p>
      </div>
    </div>
  );
}
