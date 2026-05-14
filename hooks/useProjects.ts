import { useQuery } from '@tanstack/react-query';
import { getDocs, query, collection, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Project } from '@/types/project';
import { getCache, setCache } from '@/lib/cache/localCache';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const cached = getCache<Project[]>('projects-cache');
      
      const q = query(collection(db, 'projects'), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      
      const freshData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];

      setCache('projects-cache', freshData, 1000 * 60 * 15); // 15 min TTL
      return freshData;
    },
    staleTime: 1000 * 60 * 5,
  });
}
