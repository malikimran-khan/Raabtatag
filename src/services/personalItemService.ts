/**
 * Personal Item Service
 * Firestore operations for personal items (keys, phones, tablets, etc.)
 * Cloned 1:1 from the parking-alert web app (src/services/personalItemService.js).
 */
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  runTransaction,
  query,
  orderBy,
  where,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { getCachedData, setCachedData, invalidateCache } from '@/utils/cache';

export interface PersonalItem {
  id?: string;
  ownerName?: string;
  phoneNumber?: string;
  itemType?: string;
  itemDescription?: string;
  qrId?: string;
  status?: string;
  createdAt?: unknown;
  [key: string]: unknown;
}

const getPersonalItemsCollection = () => {
  if (!db) throw new Error('database not connected');
  return collection(db, 'personal_items');
};

export const createPersonalItem = async (
  itemData: PersonalItem,
): Promise<PersonalItem> => {
  if (!db) throw new Error('database not connected');
  if (!itemData.ownerName || !itemData.phoneNumber) {
    throw new Error('Owner name and phone number are required.');
  }

  const itemRef = doc(collection(db, 'personal_items'));
  const payload = {
    ...itemData,
    status: 'pending',
    createdAt: serverTimestamp(),
  };

  await runTransaction(db, async (transaction) => {
    transaction.set(itemRef, payload);
  });

  return { ...itemData, id: itemRef.id, status: 'pending' };
};

export const fetchPersonalItems = async (): Promise<PersonalItem[]> => {
  // Check cache first
  const cached = getCachedData<PersonalItem[]>('personal_items');
  if (cached) return cached;

  const itemsCollection = getPersonalItemsCollection();
  const itemsQuery = query(itemsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(itemsQuery);
  const data = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<PersonalItem, 'id'>),
  }));

  // Cache the results
  setCachedData('personal_items', data);
  return data;
};

export const getPersonalItemByQrId = async (
  qrId: string,
): Promise<PersonalItem | null> => {
  // Check cache first
  const cacheKey = `personal_item_qr_${qrId}`;
  const cached = getCachedData<PersonalItem>(cacheKey);
  if (cached) return cached;

  const itemsCollection = getPersonalItemsCollection();
  const itemQuery = query(itemsCollection, where('qrId', '==', qrId), limit(1));
  const snapshot = await getDocs(itemQuery);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  const data: PersonalItem = {
    id: docSnap.id,
    ...(docSnap.data() as Omit<PersonalItem, 'id'>),
  };

  // Cache the result
  setCachedData(cacheKey, data);
  return data;
};

export const updatePersonalItem = async (
  itemId: string,
  updates: Partial<PersonalItem>,
): Promise<void> => {
  if (!db) throw new Error('database not connected');
  const itemRef = doc(db, 'personal_items', itemId);
  await updateDoc(itemRef, updates as Record<string, unknown>);

  // Invalidate cache after update
  invalidateCache('personal_items');
};

export const deletePersonalItem = async (item: PersonalItem): Promise<void> => {
  if (!db) throw new Error('database not connected');
  if (!item.id) throw new Error('Item id is required.');
  const itemRef = doc(db, 'personal_items', item.id);
  await deleteDoc(itemRef);

  // Invalidate cache after delete
  invalidateCache('personal_items');
};
