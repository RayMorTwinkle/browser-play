import { createStorage, StorageEnum } from '../base/index.js';

export interface DisclaimerStatusType {
  agreed: boolean;
  agreedAt?: number;
}

export type DisclaimerStorageType = ReturnType<typeof createStorage<DisclaimerStatusType>> & {
  agree: () => Promise<void>;
  reset: () => Promise<void>;
};

const defaultStatus: DisclaimerStatusType = {
  agreed: false,
  agreedAt: undefined,
};

const storage = createStorage<DisclaimerStatusType>('disclaimer-status-key', defaultStatus, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const disclaimerStorage: DisclaimerStorageType = {
  ...storage,
  agree: async () => {
    await storage.set({
      agreed: true,
      agreedAt: Date.now(),
    });
  },
  reset: async () => {
    await storage.set(defaultStatus);
  },
};
