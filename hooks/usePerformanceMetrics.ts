"use client";

import { useState, useEffect } from 'react';
import { query, collection, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { getCache, setCache } from '@/lib/cache/localCache';

export const usePerformanceStats = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'metrics', 'performance');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.data());
      }
      setIsLoading(false);
    });
    return () => unsubscribe(); // Cleanup to prevent memory leak
  }, []);

  return { data, isLoading };
}

export const usePerformanceTrend = () => {
  const [data, setData] = useState<any[]>(() => getCache<any[]>('performance-trend-cache') || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'performanceTrend'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const freshData = snapshot.docs.map(d => d.data());
      setData(freshData);
      setCache('performance-trend-cache', freshData, 1000 * 60 * 30);
      setIsLoading(false);
    });
    return () => unsubscribe(); // Cleanup to prevent memory leak
  }, []);

  return { data, isLoading };
}

export const useOKRs = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'okrs'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const freshData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setData(freshData);
      setIsLoading(false);
    });
    return () => unsubscribe(); // Cleanup to prevent memory leak
  }, []);

  return { data, isLoading };
}

export const useSkillsAnalysis = () => {
  const [data, setData] = useState<any[]>(() => getCache<any[]>('skills-analysis-cache') || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'skillsAnalysis'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const freshData = snapshot.docs.map(d => d.data());
      setData(freshData);
      setCache('skills-analysis-cache', freshData, 1000 * 60 * 60);
      setIsLoading(false);
    });
    return () => unsubscribe(); // Cleanup to prevent memory leak
  }, []);

  return { data, isLoading };
}
