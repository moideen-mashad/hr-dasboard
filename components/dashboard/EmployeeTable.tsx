"use client";

import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useEmployees } from "@/hooks/useEmployees";
import { useAppSelector } from "@/hooks/redux";

export function EmployeeTable() {
  const { data: employees = [], isLoading, error } = useEmployees();
  const { dept, search, sortKey, sortDir } = useAppSelector(s => s.filters);

  const filteredEmployees = useMemo(() => {
    return employees
      .filter(e => 
        (dept === 'all' || e.dept === dept) &&
        e.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aVal = a[sortKey as keyof typeof a];
        const bVal = b[sortKey as keyof typeof b];
        
        if (aVal === undefined || bVal === undefined) return 0;
        
        if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
        return aVal < bVal ? 1 : -1;
      });
  }, [employees, dept, search, sortKey, sortDir]);

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Join Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-10 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[120px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-6 w-[90px] ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 text-center border border-destructive/20 bg-destructive/10 rounded-xl text-destructive">
        <p className="font-medium">Failed to load employees from Firebase.</p>
        <p className="text-sm opacity-80 mt-1">Please check your Firebase configuration and rules.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-md border border-border overflow-hidden bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Join Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  {employees.length === 0 
                    ? "No employees found in Firebase. Add some data to your 'employees' collection." 
                    : "No employees match your search criteria."}
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium text-foreground">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">{employee.email}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{employee.dept}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.role}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={employee.status === 'active' ? 'default' : employee.status === 'on_leave' ? 'secondary' : 'destructive'}
                    >
                      {employee.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
