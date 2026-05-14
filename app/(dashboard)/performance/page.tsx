"use client";

import { Target, TrendingUp, Users, Award } from "lucide-react";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { OKRProgress } from "@/components/dashboard/OKRProgress";
import { SkillsRadarChart } from "@/components/dashboard/SkillsRadarChart";
import { usePerformanceStats } from "@/hooks/usePerformanceMetrics";
import { Skeleton } from "@/components/ui/skeleton";

export default function PerformancePage() {
  const { data: stats, isLoading } = usePerformanceStats();

  if (!isLoading && !stats) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Performance & OKRs</h2>
          <p className="text-muted-foreground mt-2">
            No metrics data found in Firebase. Please add a document at `metrics/performance`.
          </p>
        </div>
      </div>
    );
  }

  const displayStats = stats || {};

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Performance & OKRs</h2>
        <p className="text-muted-foreground mt-2">
          Track goals, review cycles, and 360° feedback.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">OKRs on Track</p>
            {isLoading ? <Skeleton className="h-8 w-16 mt-1" /> : <h3 className="text-2xl font-bold text-foreground">{displayStats.okrsOnTrack}</h3>}
          </div>
        </div>
        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Avg Performance</p>
            {isLoading ? <Skeleton className="h-8 w-16 mt-1" /> : <h3 className="text-2xl font-bold text-foreground">{displayStats.avgPerformance}</h3>}
          </div>
        </div>
        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Reviews Completed</p>
            {isLoading ? <Skeleton className="h-8 w-16 mt-1" /> : <h3 className="text-2xl font-bold text-foreground">{displayStats.reviewsCompleted}</h3>}
          </div>
        </div>
        <div className="p-6 bg-card rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Promotions</p>
            {isLoading ? <Skeleton className="h-8 w-16 mt-1" /> : <h3 className="text-2xl font-bold text-foreground">{displayStats.promotions}</h3>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-bold text-foreground mb-6">Company Performance Trend</h3>
          <PerformanceChart />
        </div>

        {/* OKRs */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-bold text-foreground mb-6">Company OKRs (Q2)</h3>
          <OKRProgress />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-bold text-foreground mb-6">Department Skills Analysis</h3>
          <SkillsRadarChart />
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col justify-center items-center text-center">
          <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <Target className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Upcoming Review Cycle</h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            The next 360° performance review cycle begins in 14 days. Managers need to finalize their OKR evaluations.
          </p>
          <button className="mt-6 bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
            Configure Cycle
          </button>
        </div>
      </div>
    </div>
  );
}
