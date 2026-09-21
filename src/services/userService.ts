/**
 * User Service
 * Firestore operations for user documents.
 * Cloned 1:1 from the parking-alert web app (src/services/userService.js).
 */
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getCachedData, setCachedData } from '@/utils/cache';

export interface UserDoc {
  id: string;
  name?: string;
  cnic?: string;
  mobile?: string;
  uniqueId?: string;
  qrCode?: string;
  createdAt?: unknown;
  [key: string]: unknown;
}

export const createUser = async (userData: UserDoc): Promise<UserDoc> => {
  if (!db) throw new Error('database not connected');
  const usersCol = collection(db, 'users');
  const payload = { ...userData, createdAt: serverTimestamp() };
  const docRef = await addDoc(usersCol, payload as Record<string, unknown>);
  const user: UserDoc = { ...userData, id: docRef.id };
  return user;
};

export const getUserById = async (uniqueId: string): Promise<UserDoc> => {
  // Check cache first
  const cacheKey = `user_${uniqueId}`;
  const cached = getCachedData<UserDoc>(cacheKey);
  if (cached) return cached;

  if (!db) throw new Error('database not connected');
  const docRef = doc(db, 'users', uniqueId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error('User not found');
  const data: UserDoc = {
    id: snap.id,
    ...(snap.data() as Omit<UserDoc, 'id'>),
  };

  // Cache the result
  setCachedData(cacheKey, data);
  return data;
};
