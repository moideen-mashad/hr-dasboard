import { useQuery } from '@tanstack/react-query';
import { getDocs, query, collection, doc, getDoc, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { getCache, setCache } from '@/lib/cache/localCache';

export const usePerformanceStats = () => {
  return useQuery({
    queryKey: ['performanceStats'],
    queryFn: async () => {
      const docRef = doc(db, 'metrics', 'performance');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data();
      }
      return null;
    }
  });
}

export const usePerformanceTrend = () => {
  return useQuery({
    queryKey: ['performanceTrend'],
    queryFn: async () => {
      const cached = getCache<any[]>('performance-trend-cache');
      
      const q = query(collection(db, 'performanceTrend'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => d.data());
      
      setCache('performance-trend-cache', data, 1000 * 60 * 30);
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
}

export const useOKRs = () => {
  return useQuery({
    queryKey: ['okrs'],
    queryFn: async () => {
      const q = query(collection(db, 'okrs'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    }
  });
}

export const useSkillsAnalysis = () => {
  return useQuery({
    queryKey: ['skillsAnalysis'],
    queryFn: async () => {
      const cached = getCache<any[]>('skills-analysis-cache');
      
      const q = query(collection(db, 'skillsAnalysis'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => d.data());
      
      setCache('skills-analysis-cache', data, 1000 * 60 * 60); // 1 hour TTL
      return data;
    },
    staleTime: 1000 * 60 * 15,
  });
}
