import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('hr-theme') as 'dark' | 'light';
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // Default for SSR
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('hr-theme', state.value);
      }
    },
    setTheme: (state, action: { payload: 'dark' | 'light' }) => {
      state.value = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('hr-theme', state.value);
      }
    }
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
