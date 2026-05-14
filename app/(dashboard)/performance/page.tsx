import { Target } from "lucide-react";

export default function PerformancePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Performance & OKRs</h2>
        <p className="text-muted-foreground mt-2">
          Track goals, review cycles, and 360° feedback.
        </p>
      </div>

      <div className="border border-border bg-card rounded-2xl shadow-sm min-h-[500px] flex flex-col items-center justify-center p-6">
        <Target className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground">Performance Metrics</h3>
        <p className="text-muted-foreground text-center mt-2 max-w-sm">
          OKR progress bars, top performers leaderboard, and review status pipelines.
        </p>
      </div>
    </div>
  );
}
