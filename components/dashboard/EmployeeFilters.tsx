"use client";

import { Search, Filter, ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSearch, setDept } from "@/store/filterSlice";

const DEPARTMENTS = [
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
  "Operations",
  "Sales",
  "Security"
];

export const EmployeeFilters = () => {
  const dispatch = useAppDispatch();
  const { search, dept } = useAppSelector(state => state.filters);

  const selectedDeptLabel = dept === "all" ? "All Departments" : dept;

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center w-full">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search employees by name or email..." 
          className="pl-9 h-11 bg-card border-border hover:border-primary/30 focus-visible:ring-primary/20 transition-all rounded-xl"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="outline" className="h-11 w-full md:w-56 justify-between border-border bg-card hover:bg-muted/50 rounded-xl px-4 group">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium text-foreground">{selectedDeptLabel}</span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Button>
          } />
          <DropdownMenuContent className="w-56 rounded-xl border-border bg-popover shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground font-semibold px-3 py-2">Filter by Department</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={dept} onValueChange={(val) => dispatch(setDept(val))}>
                <DropdownMenuRadioItem value="all" className="flex items-center justify-between cursor-pointer rounded-lg mx-1 my-0.5 hover:bg-accent transition-colors">
                  All Departments
                </DropdownMenuRadioItem>
                {DEPARTMENTS.map((d) => (
                  <DropdownMenuRadioItem key={d} value={d} className="flex items-center justify-between cursor-pointer rounded-lg mx-1 my-0.5 hover:bg-accent transition-colors">
                    {d}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
