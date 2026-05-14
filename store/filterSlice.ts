import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  dept: string;
  search: string;
  sortKey: string;
  sortDir: 'asc' | 'desc';
}

const initialState: FilterState = {
  dept: 'all',
  search: '',
  sortKey: 'name',
  sortDir: 'asc',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDept: (state, action: PayloadAction<string>) => { state.dept = action.payload; },
    setSearch: (state, action: PayloadAction<string>) => { state.search = action.payload; },
    setSort: (state, action: PayloadAction<{ key: string; dir: 'asc' | 'desc' }>) => {
      state.sortKey = action.payload.key;
      state.sortDir = action.payload.dir;
    },
  },
});

export const { setDept, setSearch, setSort } = filterSlice.actions;
export default filterSlice.reducer;
