import { Users, UserPlus, TrendingDown, CalendarClock } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Overview</h2>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your organization today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard 
          title="Total Headcount" 
          value="1,248" 
          delta={2.4} 
          icon={<Users className="h-5 w-5 text-primary" />} 
        />
        <KPICard 
          title="New Hires (Month)" 
          value="24" 
          delta={12} 
          icon={<UserPlus className="h-5 w-5 text-primary" />} 
        />
        <KPICard 
          title="Attrition Rate" 
          value="4.2%" 
          delta={-0.8} 
          icon={<TrendingDown className="h-5 w-5 text-primary" />} 
        />
        <KPICard 
          title="On Leave Today" 
          value="32" 
          icon={<CalendarClock className="h-5 w-5 text-primary" />} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 border border-border bg-card rounded-2xl shadow-sm p-6 min-h-[400px] flex flex-col items-center justify-center transition-all hover:shadow-md">
          <p className="text-muted-foreground font-medium">Department Breakdown Chart (Coming Soon)</p>
        </div>
        <div className="col-span-3 border border-border bg-card rounded-2xl shadow-sm p-6 min-h-[400px] flex flex-col items-center justify-center transition-all hover:shadow-md">
          <p className="text-muted-foreground font-medium">Recent Activity (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, delta, icon }: { title: string, value: string, delta?: number, icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 transition-all hover:shadow-md hover:border-primary/20 group">
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{title}</h3>
        <div className="p-2 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {delta !== undefined && (
          <p className={`text-xs font-medium ${delta >= 0 ? 'text-emerald-500' : 'text-red-500'} mt-2 flex items-center`}>
            {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}% <span className="text-muted-foreground ml-1 font-normal">from last month</span>
          </p>
        )}
      </div>
    </div>
  );
}
