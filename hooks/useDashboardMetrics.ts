"use client";

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
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

const DEFAULT_METRICS: DashboardMetrics = {
  totalHeadcount: 0,
  totalHeadcountDelta: 0,
  newHires: 0,
  newHiresDelta: 0,
  attritionRate: 0,
  attritionRateDelta: 0,
  onLeaveToday: 0
};

export const useDashboardMetrics = () => {
  const [data, setData] = useState<DashboardMetrics>(() => getCache<DashboardMetrics>('dashboard-metrics') || DEFAULT_METRICS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const docRef = doc(db, 'metrics', 'dashboard');
    
    // Real-time listener (WebSocket equivalent via Firebase)
    const unsubscribe = onSnapshot(docRef, 
      (snapshot) => {
        if (snapshot.exists()) {
          const freshData = snapshot.data() as DashboardMetrics;
          setData(freshData);
          setCache('dashboard-metrics', freshData, 1000 * 60 * 30);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error("Metrics stream error:", err);
        setError(err as Error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { data, isLoading, error };
};
