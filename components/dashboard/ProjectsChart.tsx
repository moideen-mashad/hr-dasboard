"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Cell
} from 'recharts';
import { useAppSelector } from "@/hooks/redux";
import { useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";

export const ProjectsChart = () => {
  const isDarkMode = useAppSelector(state => state.theme.value === "dark");
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return <Skeleton className="h-[350px] w-full rounded-xl" />;
  }

  const data = projects || [];

  if (data.length === 0) {
    return (
      <div className="h-[350px] w-full flex flex-col items-center justify-center border border-dashed border-border rounded-xl text-muted-foreground p-6 text-center">
        <p className="font-medium">No projects found in Firebase.</p>
        <p className="text-sm mt-1">Add documents to the "projects" collection to see them here.</p>
      </div>
    );
  }

  // Color mapping based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#10b981'; // Emerald-500
      case 'In Progress': return '#3b82f6'; // Blue-500
      case 'On Hold': return '#f59e0b'; // Amber-500
      case 'Delayed': return '#ef4444'; // Red-500
      default: return '#6366f1'; // Indigo-500
    }
  };

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} strokeOpacity={0.1} />
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'currentColor', opacity: 0.8, fontSize: 12 }}
            width={80}
          />
          <Tooltip 
            cursor={{ fill: 'currentColor', opacity: 0.05 }}
            contentStyle={{ 
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
              borderRadius: '12px',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              color: isDarkMode ? '#f8fafc' : '#0f172a'
            }}
            formatter={(value: any) => [`${value}%`, 'Progress']}
          />
          <Bar 
            dataKey="progress" 
            radius={[0, 4, 4, 0]} 
            barSize={20}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
