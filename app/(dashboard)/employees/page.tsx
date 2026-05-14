import { EmployeeTable } from "@/components/dashboard/EmployeeTable";
import { AddEmployeeDialog } from "@/components/dashboard/AddEmployeeDialog";
import { EmployeeFilters } from "@/components/dashboard/EmployeeFilters";
import { ExcelImport } from "@/components/dashboard/ExcelImport";

const EmployeesPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Employees</h2>
          <p className="text-muted-foreground mt-1">
            Manage your workforce directory and details.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExcelImport />
          <AddEmployeeDialog />
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm p-6 border border-border space-y-6">
        <EmployeeFilters />
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeesPage;
