import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // Fresh 5 min
      gcTime: 1000 * 60 * 30,        // Keep in memory 30 min
      refetchOnWindowFocus: false,    // Don't spam Firestore
      retry: 2,
    },
  },
});
