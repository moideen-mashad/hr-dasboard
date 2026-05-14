import { useQuery } from '@tanstack/react-query';
import { getDocs, query, collection, doc, getDoc, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

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
      // Order by a theoretical 'order' field to keep months chronological
      const q = query(collection(db, 'performanceTrend'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => d.data());
    }
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
      const q = query(collection(db, 'skillsAnalysis'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => d.data());
    }
  });
}
