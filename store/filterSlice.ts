import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  dept: string;
  search: string;
  sortKey: string;
  sortDir: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

const initialState: FilterState = {
  dept: 'all',
  search: '',
  sortKey: 'name',
  sortDir: 'asc',
  page: 1,
  pageSize: 10,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDept: (state, action: PayloadAction<string>) => { 
      state.dept = action.payload; 
      state.page = 1; // Reset to page 1 on filter change
    },
    setSearch: (state, action: PayloadAction<string>) => { 
      state.search = action.payload; 
      state.page = 1; // Reset to page 1 on search
    },
    setSort: (state, action: PayloadAction<{ key: string; dir: 'asc' | 'desc' }>) => {
      state.sortKey = action.payload.key;
      state.sortDir = action.payload.dir;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
  },
});

export const { setDept, setSearch, setSort, setPage, setPageSize } = filterSlice.actions;
export default filterSlice.reducer;
