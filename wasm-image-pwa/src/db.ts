// Function DB
// src/db.ts
const DB_NAME = 'wasmImageDB';
const STORE_NAME = 'images';

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { autoIncrement: true });
      }
    };
  });
}

export async function saveImage(blob: Blob) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).add(blob);
  return tx.oncomplete;
}

export async function getAllImages(): Promise<Blob[]> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const request = tx.objectStore(STORE_NAME).getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as Blob[]);
    request.onerror = () => reject(request.error);
  });
}
