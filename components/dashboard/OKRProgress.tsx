"use client";

import { Target, CheckCircle2, AlertCircle } from "lucide-react";
import { useOKRs } from "@/hooks/usePerformanceMetrics";
import { Skeleton } from "@/components/ui/skeleton";

export function OKRProgress() {
  const { data: dbData, isLoading } = useOKRs();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-12" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  const okrs = dbData || [];

  if (okrs.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-xl text-muted-foreground">
        No OKRs found in Firebase.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {okrs.map((okr: any, index: number) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {okr.status === "completed" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : okr.status === "at_risk" ? (
                <AlertCircle className="h-4 w-4 text-destructive" />
              ) : (
                <Target className="h-4 w-4 text-primary" />
              )}
              <span className="text-sm font-medium text-foreground">{okr.title}</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">{okr.progress}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                okr.status === 'completed' ? 'bg-emerald-500' :
                okr.status === 'at_risk' ? 'bg-destructive' : 'bg-primary'
              }`}
              style={{ width: `${okr.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
