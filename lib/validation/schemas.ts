import { z } from "zod";

export const EmployeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dept: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["active", "on_leave", "terminated"]).default("active"),
  joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export const ProjectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  progress: z.number().min(0).max(100),
  status: z.string().min(1),
  department: z.string().min(1),
  teamLead: z.string().min(1),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  endDate: z.string().optional(),
});

export type EmployeeInput = z.infer<typeof EmployeeSchema>;
export type ProjectInput = z.infer<typeof ProjectSchema>;
