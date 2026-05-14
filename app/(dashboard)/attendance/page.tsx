import { Calendar } from "lucide-react";

export default function AttendancePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Attendance & Leaves</h2>
        <p className="text-muted-foreground mt-2">
          Monitor employee attendance and leave requests.
        </p>
      </div>

      <div className="border border-border bg-card rounded-2xl shadow-sm min-h-[500px] flex flex-col items-center justify-center p-6">
        <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground">Attendance Log</h3>
        <p className="text-muted-foreground text-center mt-2 max-w-sm">
          Real-time check-in/check-out feed and leave calendar will be implemented here.
        </p>
      </div>
    </div>
  );
}
