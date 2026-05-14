export interface Project {
  id?: string;
  name: string;
  status: 'In Progress' | 'Completed' | 'On Hold' | 'Delayed';
  progress: number; // 0 to 100
  startDate: string;
  endDate: string;
  department: string;
  teamLead: string;
}
