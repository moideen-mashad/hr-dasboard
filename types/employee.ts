export interface Employee {
  id: string;
  name: string;
  email: string;
  dept: string;
  role: string;
  status: 'active' | 'on_leave' | 'terminated';
  joinDate: string;
  salary: number;
  managerId?: string;
}
