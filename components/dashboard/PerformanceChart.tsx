"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAppSelector } from "@/hooks/redux";
import { usePerformanceTrend } from "@/hooks/usePerformanceMetrics";
import { Skeleton } from "@/components/ui/skeleton";

export function PerformanceChart() {
  const isDarkMode = useAppSelector(state => state.theme.value === "dark");
  const { data: dbData, isLoading } = usePerformanceTrend();
  
  const strokeColor = "#1A2E44"; // Brand accent color

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  const data = dbData || [];

  if (data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center border border-dashed border-border rounded-xl text-muted-foreground">
        No performance trend data found in Firebase.
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }} 
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
              borderRadius: '8px',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              color: isDarkMode ? '#f8fafc' : '#0f172a'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="performance" 
            stroke={strokeColor} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPerformance)" 
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
