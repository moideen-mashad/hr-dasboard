"use client";

import { useState, useEffect } from 'react';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Employee } from '@/types/employee';

export const useEmployees = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'employees'), orderBy('name', 'asc'));
    
    // Real-time stream (WebSocket equivalent)
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const employees = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Employee[];
        
        setData(employees);
        setIsLoading(false);
      },
      (err) => {
        console.error("Employee stream error:", err);
        setError(err as Error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { data, isLoading, error };
};
