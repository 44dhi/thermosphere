import { storage, STORAGE_PREFIXES } from './base';

// User storage keys
export const USER_KEYS = {
  EMAIL: `${STORAGE_PREFIXES.USER}email`,
} as const;

// Email storage functions
export const setUserEmail = (email: string): void => {
  storage.set(USER_KEYS.EMAIL, email);
};

export const getUserEmail = (): string | undefined => {
  return storage.getString(USER_KEYS.EMAIL);
};

export const removeUserEmail = (): void => {
  storage.delete(USER_KEYS.EMAIL);
};

export const hasUserEmail = (): boolean => {
  return storage.contains(USER_KEYS.EMAIL);
};
