"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppSelector } from "@/hooks/redux";
import { useSkillsAnalysis } from "@/hooks/usePerformanceMetrics";
import { Skeleton } from "@/components/ui/skeleton";

export function SkillsRadarChart() {
  const isDarkMode = useAppSelector(state => state.theme.value === "dark");
  const { data: dbData, isLoading } = useSkillsAnalysis();

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full rounded-full" />;
  }

  const data = dbData || [];

  if (data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center border border-dashed border-border rounded-xl text-muted-foreground">
        No skills analysis data found in Firebase.
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="currentColor" strokeOpacity={0.1} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', opacity: 0.7, fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
              borderRadius: '8px',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              color: isDarkMode ? '#f8fafc' : '#0f172a'
            }}
          />
          <Radar name="Company Avg" dataKey="B" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
          <Radar name="Top Performers" dataKey="A" stroke="#1A2E44" fill="#1A2E44" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
