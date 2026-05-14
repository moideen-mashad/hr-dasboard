import { useQuery } from '@tanstack/react-query';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { getCache, setCache } from '@/lib/cache/localCache';

export interface DashboardMetrics {
  totalHeadcount: number;
  totalHeadcountDelta: number;
  newHires: number;
  newHiresDelta: number;
  attritionRate: number;
  attritionRateDelta: number;
  onLeaveToday: number;
}

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: async () => {
      // 1. Try to get from localStorage cache for instant UI
      const cachedData = getCache<DashboardMetrics>('dashboard-metrics');
      
      // 2. Fetch fresh data from Firestore
      const docRef = doc(db, 'metrics', 'dashboard');
      const snapshot = await getDoc(docRef);
      
      if (snapshot.exists()) {
        const freshData = snapshot.data() as DashboardMetrics;
        // 3. Update localStorage cache for next session (TTL: 30 minutes)
        setCache('dashboard-metrics', freshData, 1000 * 60 * 30);
        return freshData;
      }
      
      return cachedData || {
        totalHeadcount: 0,
        totalHeadcountDelta: 0,
        newHires: 0,
        newHiresDelta: 0,
        attritionRate: 0,
        attritionRateDelta: 0,
        onLeaveToday: 0
      };
    },
    // Keep React Query state fresh
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
