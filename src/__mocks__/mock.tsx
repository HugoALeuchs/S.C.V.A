import { WasteStorage } from "../interfaces/WasteStorageInterface";

const storages: WasteStorage[] = [
  {
    storageID: "1",
    storageName: "Armazem 1",
    storageVolume: 100,
    storageVolumeUsed: 80,
    storageVolumeFree: 20,
  },
  {
    storageID: "2",
    storageName: "Armazem 2",
    storageVolume: 100,
    storageVolumeUsed: 70,
    storageVolumeFree: 30,
  },
  {
    storageID: "3",
    storageName: "Armazem 3",
    storageVolume: 100,
    storageVolumeUsed: 10,
    storageVolumeFree: 90,
  },
];

function getAllStorages(): WasteStorage[] {
  return storages;
}

function getStorageByID(storageID: string): WasteStorage | undefined {
  return storages.find((storage) => storage.storageID === storageID);
}

function updateStorageByID(
  storageID: string,
  storage: WasteStorage
): WasteStorage {
  const index = storages.findIndex(
    (storage) => storage.storageID === storageID
  );
  storages[index] = storage;
  return storages[index];
}

export { getAllStorages, getStorageByID, updateStorageByID };
