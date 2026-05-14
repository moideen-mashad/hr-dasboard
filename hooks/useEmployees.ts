import { useQuery } from '@tanstack/react-query';
import { getDocs, query, orderBy, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Employee } from '@/types/employee';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      // In a real app with large data, you would paginate this.
      const q = query(collection(db, 'employees'), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Employee[];
    }
  });
}
