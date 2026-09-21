/**
 * Vehicle Service
 * Firestore operations for vehicle requests and QR generation.
 * Cloned 1:1 from the parking-alert web app (src/services/vehicleService.js).
 */
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  runTransaction,
  query,
  orderBy,
  where,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { getCachedData, setCachedData, invalidateCache } from '@/utils/cache';

export interface VehicleRequest {
  id?: string;
  ownerName?: string;
  email?: string;
  contactNumber?: string;
  address?: string;
  vehicleName?: string;
  vehicleNumber?: string;
  vehicleColor?: string;
  vehicleNumberNormalized?: string;
  qrId?: string;
  status?: string;
  createdAt?: unknown;
  [key: string]: unknown;
}

const getRequestsCollection = () => {
  if (!db) throw new Error('database not connected');
  return collection(db, 'vehicle_requests');
};

export const createVehicleRequest = async (
  requestData: VehicleRequest,
): Promise<VehicleRequest> => {
  if (!db) throw new Error('database not connected');
  if (!requestData.vehicleNumberNormalized) {
    throw new Error('Vehicle number validation is missing.');
  }

  const requestRef = doc(collection(db, 'vehicle_requests'));
  const vehicleNumberRef = doc(
    db,
    'vehicle_numbers',
    requestData.vehicleNumberNormalized,
  );
  const payload = {
    ...requestData,
    status: 'pending',
    createdAt: serverTimestamp(),
  };

  await runTransaction(db, async (transaction) => {
    const existingVehicleNumber = await transaction.get(vehicleNumberRef);

    if (existingVehicleNumber.exists()) {
      throw new Error(
        'This vehicle number is already registered or pending approval.',
      );
    }

    transaction.set(requestRef, payload);
    transaction.set(vehicleNumberRef, {
      requestId: requestRef.id,
      vehicleNumber: requestData.vehicleNumber,
      vehicleNumberNormalized: requestData.vehicleNumberNormalized,
      createdAt: serverTimestamp(),
    });
  });

  return { ...requestData, id: requestRef.id, status: 'pending' };
};

export const vehicleNumberExists = async (
  vehicleNumberNormalized: string,
): Promise<boolean> => {
  const requestsCollection = getRequestsCollection();
  const normalizedQuery = query(
    requestsCollection,
    where('vehicleNumberNormalized', '==', vehicleNumberNormalized),
    limit(1),
  );
  const snapshot = await getDocs(normalizedQuery);

  if (!snapshot.empty) return true;

  // Backward compatibility for older records created before normalized plate storage.
  const allRequestsSnapshot = await getDocs(requestsCollection);
  return allRequestsSnapshot.docs.some((docSnap) => {
    const existingNumber =
      (docSnap.data() as { vehicleNumber?: string } | undefined)?.vehicleNumber ||
      '';
    return (
      existingNumber.replace(/[^A-Za-z0-9]/g, '').toUpperCase() ===
      vehicleNumberNormalized
    );
  });
};

export const fetchVehicleRequests = async (): Promise<VehicleRequest[]> => {
  // Check cache first for static data
  const cached = getCachedData<VehicleRequest[]>('vehicle_requests');
  if (cached) return cached;

  const requestsCollection = getRequestsCollection();
  const requestsQuery = query(requestsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(requestsQuery);
  const data = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<VehicleRequest, 'id'>),
  }));

  // Cache the results
  setCachedData('vehicle_requests', data);
  return data;
};

export const getVehicleRequestByQrId = async (
  qrId: string,
): Promise<VehicleRequest | null> => {
  // Check cache first
  const cacheKey = `vehicle_qr_${qrId}`;
  const cached = getCachedData<VehicleRequest>(cacheKey);
  if (cached) return cached;

  const requestsCollection = getRequestsCollection();
  const requestQuery = query(
    requestsCollection,
    where('qrId', '==', qrId),
    limit(1),
  );
  const snapshot = await getDocs(requestQuery);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  const data: VehicleRequest = {
    id: docSnap.id,
    ...(docSnap.data() as Omit<VehicleRequest, 'id'>),
  };

  // Cache the result
  setCachedData(cacheKey, data);
  return data;
};

export const updateVehicleRequest = async (
  requestId: string,
  updates: Partial<VehicleRequest>,
): Promise<void> => {
  if (!db) throw new Error('database not connected');
  const requestRef = doc(db, 'vehicle_requests', requestId);
  await updateDoc(requestRef, updates as Record<string, unknown>);

  // Invalidate cache after update
  invalidateCache('vehicle_requests');
};
