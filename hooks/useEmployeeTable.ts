"use client";

import { useMemo } from 'react';
import { useEmployees } from "@/hooks/useEmployees";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setSort, setPage, setPageSize } from "@/store/filterSlice";

export const useEmployeeTable = () => {
  const dispatch = useAppDispatch();
  const { data: employees = [], isLoading, error } = useEmployees();
  const { dept, search, sortKey, sortDir, page, pageSize } = useAppSelector(s => s.filters);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      dispatch(setSort({ key, dir: sortDir === 'asc' ? 'desc' : 'asc' }));
    } else {
      dispatch(setSort({ key, dir: 'asc' }));
    }
  };

  const tableData = useMemo(() => {
    const filtered = employees
      .filter(e => 
        (dept === 'all' || e.dept === dept) &&
        (e.name.toLowerCase().includes(search.toLowerCase()) || 
         e.email.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        const aVal = a[sortKey as keyof typeof a];
        const bVal = b[sortKey as keyof typeof b];
        
        if (aVal === undefined || bVal === undefined) return 0;
        if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
        return aVal < bVal ? 1 : -1;
      });

    const totalResults = filtered.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return {
      paginated,
      totalPages,
      totalResults,
      startIndex: totalResults > 0 ? start + 1 : 0,
      endIndex: Math.min(start + pageSize, totalResults),
    };
  }, [employees, dept, search, sortKey, sortDir, page, pageSize]);

  return {
    ...tableData,
    isLoading,
    error,
    page,
    pageSize,
    sortKey,
    sortDir,
    toggleSort,
    setPage: (p: number) => dispatch(setPage(p)),
    setPageSize: (s: number) => dispatch(setPageSize(s)),
  };
};
