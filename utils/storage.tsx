import { MMKV } from 'react-native-mmkv';

// Create MMKV instance
export const storage = new MMKV();

// Storage keys
export const STORAGE_KEYS = {
  USER_EMAIL: 'user_email',
} as const;

// Email storage functions
export const setUserEmail = (email: string): void => {
  storage.set(STORAGE_KEYS.USER_EMAIL, email);
};

export const getUserEmail = (): string | undefined => {
  return storage.getString(STORAGE_KEYS.USER_EMAIL);
};

export const removeUserEmail = (): void => {
  storage.delete(STORAGE_KEYS.USER_EMAIL);
};

export const hasUserEmail = (): boolean => {
  return storage.contains(STORAGE_KEYS.USER_EMAIL);
};