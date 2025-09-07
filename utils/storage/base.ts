import { MMKV } from 'react-native-mmkv';

// Create a single MMKV instance for the entire app
export const storage = new MMKV();

// Base storage types
export type TemperatureUnit = 'cel' | 'fahrenheit';

export interface ThermostatSettings {
  unit: TemperatureUnit;
  temperature: number; // min: 50, max: 86
  currentTemperature: number; // current room temperature
  active: boolean;
}

// Storage key prefixes for organization
export const STORAGE_PREFIXES = {
  USER: 'user_',
  THERMOSTAT: 'thermostat_',
} as const;
