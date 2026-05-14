"use client";

import { Users, UserPlus, TrendingDown, CalendarClock, Target, BarChart3, PieChart } from "lucide-react";
import dynamic from "next/dynamic";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { Skeleton } from "@/components/ui/skeleton";

// Code Splitting - Dynamic Imports for Heavy Components
const PerformanceChart = dynamic(() => import("@/components/dashboard/PerformanceChart").then(mod => mod.PerformanceChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full" />
});

const ProjectsChart = dynamic(() => import("@/components/dashboard/ProjectsChart").then(mod => mod.ProjectsChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[350px] w-full" />
});

const SkillsRadarChart = dynamic(() => import("@/components/dashboard/SkillsRadarChart").then(mod => mod.SkillsRadarChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full rounded-full" />
});

const OKRProgress = dynamic(() => import("@/components/dashboard/OKRProgress").then(mod => mod.OKRProgress), {
  ssr: false,
  loading: () => <div className="space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
});

const KPICard = ({ title, value, delta, icon, isLoading }: { title: string, value: string | number, delta?: number, icon: React.ReactNode, isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-row items-center justify-between pb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-32 mt-4" />
      </div>
    );
  }

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
};

export default function DashboardOverview() {
  const { data: metrics, isLoading } = useDashboardMetrics();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Analytics Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Real-time metrics and project tracking from your organization.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard 
          title="Total Headcount" 
          value={metrics?.totalHeadcount?.toLocaleString() || "0"} 
          delta={metrics?.totalHeadcountDelta} 
          isLoading={isLoading}
          icon={<Users className="h-5 w-5 text-primary" />} 
        />
        <KPICard 
          title="New Hires (Month)" 
          value={metrics?.newHires || "0"} 
          delta={metrics?.newHiresDelta} 
          isLoading={isLoading}
          icon={<UserPlus className="h-5 w-5 text-primary" />} 
        />
        <KPICard 
          title="Attrition Rate" 
          value={`${metrics?.attritionRate || "0"}%`} 
          delta={metrics?.attritionRateDelta} 
          isLoading={isLoading}
          icon={<TrendingDown className="h-5 w-5 text-primary" />} 
        />
        <KPICard 
          title="On Leave Today" 
          value={metrics?.onLeaveToday || "0"} 
          isLoading={isLoading}
          icon={<CalendarClock className="h-5 w-5 text-primary" />} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Performance Trend */}
        <div className="col-span-4 border border-border bg-card rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Performance Trend
              </h3>
              <p className="text-sm text-muted-foreground">Monthly organization-wide performance</p>
            </div>
          </div>
          <PerformanceChart />
        </div>

        {/* OKR Progress */}
        <div className="col-span-3 border border-border bg-card rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Key OKRs
              </h3>
              <p className="text-sm text-muted-foreground">Current quarter objectives</p>
            </div>
          </div>
          <OKRProgress />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Project Tracking */}
        <div className="col-span-4 border border-border bg-card rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Project Roadmap & Progress
              </h3>
              <p className="text-sm text-muted-foreground">Live tracking of active initiatives</p>
            </div>
          </div>
          <ProjectsChart />
        </div>

        {/* Skills Radar */}
        <div className="col-span-3 border border-border bg-card rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Skills Analysis
              </h3>
              <p className="text-sm text-muted-foreground">Talent distribution across domains</p>
            </div>
          </div>
          <SkillsRadarChart />
        </div>
      </div>
    </div>
  );
}
