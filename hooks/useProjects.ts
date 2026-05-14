"use client";

import { useState, useEffect } from 'react';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Project } from '@/types/project';
import { getCache, setCache } from '@/lib/cache/localCache';

export const useProjects = () => {
  const [data, setData] = useState<Project[]>(() => getCache<Project[]>('projects-cache') || []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('name', 'asc'));
    
    // Real-time stream (WebSocket equivalent)
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const projects = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        setData(projects);
        setCache('projects-cache', projects, 1000 * 60 * 15);
        setIsLoading(false);
      },
      (err) => {
        console.error("Projects stream error:", err);
        setError(err as Error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { data, isLoading, error };
};
