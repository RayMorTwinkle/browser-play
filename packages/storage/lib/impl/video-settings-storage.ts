import { createStorage, StorageEnum } from '../base/index.js';

export interface VideoSettingsType {
  autoResume: boolean;
  speed: number;
  enabled: boolean;
}

export type VideoSettingsStorageType = ReturnType<typeof createStorage<VideoSettingsType>> & {
  toggleAutoResume: () => Promise<void>;
  setSpeed: (speed: number) => Promise<void>;
  toggleEnabled: () => Promise<void>;
};

const defaultSettings: VideoSettingsType = {
  autoResume: true,
  speed: 1,
  enabled: true,
};

const storage = createStorage<VideoSettingsType>('video-settings-key', defaultSettings, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const videoSettingsStorage: VideoSettingsStorageType = {
  ...storage,
  toggleAutoResume: async () => {
    await storage.set(currentState => ({
      ...currentState,
      autoResume: !currentState.autoResume,
    }));
  },
  setSpeed: async (speed: number) => {
    await storage.set(currentState => ({
      ...currentState,
      speed,
    }));
  },
  toggleEnabled: async () => {
    await storage.set(currentState => ({
      ...currentState,
      enabled: !currentState.enabled,
    }));
  },
};
