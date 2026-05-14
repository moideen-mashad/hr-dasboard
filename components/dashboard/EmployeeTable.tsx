"use client";

import { useEmployeeTable } from "@/hooks/useEmployeeTable";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const EmployeeTable = () => {
  const {
    paginated,
    totalPages,
    totalResults,
    startIndex,
    endIndex,
    isLoading,
    page,
    pageSize,
    sortKey,
    sortDir,
    toggleSort,
    setPage,
    setPageSize,
  } = useEmployeeTable();

  const SortIcon = ({ column }: { column: string }) => {
    if (sortKey !== column) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    return sortDir === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50"><TableRow><TableHead colSpan={5}><Skeleton className="h-10 w-full" /></TableHead></TableRow></TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}><TableCell colSpan={5}><Skeleton className="h-12 w-full" /></TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl border border-border overflow-x-auto bg-card shadow-sm">
        <Table className="min-w-[800px] md:min-w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort('name')}>
                <div className="flex items-center">Name <SortIcon column="name" /></div>
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort('dept')}>
                <div className="flex items-center">Department <SortIcon column="dept" /></div>
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort('role')}>
                <div className="flex items-center">Role <SortIcon column="role" /></div>
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort('status')}>
                <div className="flex items-center">Status <SortIcon column="status" /></div>
              </TableHead>
              <TableHead className="text-right cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort('joinDate')}>
                <div className="flex items-center justify-end">Join Date <SortIcon column="joinDate" /></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No records match your criteria.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="font-medium text-foreground">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">{employee.email}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{employee.dept}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.role}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                      {employee.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-card border border-border p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Rows:</span>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline" size="sm" className="h-8 rounded-lg border-border">
                  {pageSize}
                </Button>
              } />
              <DropdownMenuContent align="start" className="rounded-xl border-border min-w-[80px]">
                {[10, 25, 50].map((size) => (
                  <DropdownMenuItem key={size} onClick={() => setPageSize(size)}>{size}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <span className="hidden sm:inline border-l h-4 mx-2" />
          <span>Showing {startIndex}-{endIndex} of {totalResults}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1} className="rounded-lg h-9 w-9 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1 font-medium text-sm">
            {page} <span className="text-muted-foreground mx-1">/</span> {totalPages || 1}
          </div>
          <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages || totalPages === 0} className="rounded-lg h-9 w-9 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
