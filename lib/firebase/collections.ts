import { collection, CollectionReference, DocumentData } from 'firebase/firestore';
import { db } from './config';
import { Employee } from '@/types/employee';
import { Project } from '@/types/project';

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const employeesCollection = createCollection<Employee>('employees');
export const projectsCollection = createCollection<Project>('projects');
