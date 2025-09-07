import { storage, STORAGE_PREFIXES, type TemperatureUnit, type ThermostatSettings } from './base';

// Thermostat storage keys
export const THERMOSTAT_KEYS = {
  UNIT: `${STORAGE_PREFIXES.THERMOSTAT}unit`,
  TEMPERATURE: `${STORAGE_PREFIXES.THERMOSTAT}temperature`,
  CURRENT_TEMPERATURE: `${STORAGE_PREFIXES.THERMOSTAT}current_temperature`,
  ACTIVE: `${STORAGE_PREFIXES.THERMOSTAT}active`,
} as const;

// Temperature constraints for different units
export const TEMPERATURE_CONSTRAINTS = {
  FAHRENHEIT: {
    MIN: 50,
    MAX: 86,
  },
  CELSIUS: {
    MIN: 10,
    MAX: 30,
  },
} as const;

// Helper functions to get temperature constraints based on unit
export const getTemperatureConstraints = (unit: TemperatureUnit) => {
  return unit === 'fahrenheit' 
    ? TEMPERATURE_CONSTRAINTS.FAHRENHEIT 
    : TEMPERATURE_CONSTRAINTS.CELSIUS;
};

export const getMinTemperature = (unit: TemperatureUnit): number => {
  return getTemperatureConstraints(unit).MIN;
};

export const getMaxTemperature = (unit: TemperatureUnit): number => {
  return getTemperatureConstraints(unit).MAX;
};

// Default thermostat settings
export const DEFAULT_THERMOSTAT_SETTINGS: ThermostatSettings = {
  unit: 'fahrenheit',
  temperature: 72,
  currentTemperature: 50, // Start with a lower current temperature
  active: true,
};

// Unit storage functions
export const setThermostatUnit = (unit: TemperatureUnit): void => {
  storage.set(THERMOSTAT_KEYS.UNIT, unit);
};

export const getThermostatUnit = (): TemperatureUnit => {
  const unit = storage.getString(THERMOSTAT_KEYS.UNIT) as TemperatureUnit;
  return unit || DEFAULT_THERMOSTAT_SETTINGS.unit;
};

// Temperature storage functions
export const setThermostatTemperature = (temperature: number, unit?: TemperatureUnit): void => {
  const currentUnit = unit || getThermostatUnit();
  const constraints = getTemperatureConstraints(currentUnit);
  
  // Clamp temperature within valid range for the current unit
  const clampedTemp = Math.max(
    constraints.MIN,
    Math.min(constraints.MAX, temperature)
  );
  storage.set(THERMOSTAT_KEYS.TEMPERATURE, clampedTemp);
};

export const getThermostatTemperature = (): number => {
  const temperature = storage.getNumber(THERMOSTAT_KEYS.TEMPERATURE);
  return temperature ?? DEFAULT_THERMOSTAT_SETTINGS.temperature;
};

// Current temperature storage functions
export const setCurrentTemperature = (temperature: number, unit?: TemperatureUnit): void => {
  const currentUnit = unit || getThermostatUnit();
  const constraints = getTemperatureConstraints(currentUnit);
  
  // Clamp temperature within valid range for the current unit
  const clampedTemp = Math.max(
    constraints.MIN,
    Math.min(constraints.MAX, temperature)
  );
  storage.set(THERMOSTAT_KEYS.CURRENT_TEMPERATURE, clampedTemp);
};

export const getCurrentTemperature = (): number => {
  const temperature = storage.getNumber(THERMOSTAT_KEYS.CURRENT_TEMPERATURE);
  return temperature ?? DEFAULT_THERMOSTAT_SETTINGS.currentTemperature;
};

// Active state storage functions
export const setThermostatActive = (active: boolean): void => {
  storage.set(THERMOSTAT_KEYS.ACTIVE, active);
};

export const getThermostatActive = (): boolean => {
  const active = storage.getBoolean(THERMOSTAT_KEYS.ACTIVE);
  return active ?? DEFAULT_THERMOSTAT_SETTINGS.active;
};

// Combined settings functions
export const setThermostatSettings = (settings: Partial<ThermostatSettings>): void => {
  const currentUnit = settings.unit || getThermostatUnit();
  
  if (settings.unit !== undefined) {
    setThermostatUnit(settings.unit);
  }
  if (settings.temperature !== undefined) {
    setThermostatTemperature(settings.temperature, currentUnit);
  }
  if (settings.currentTemperature !== undefined) {
    setCurrentTemperature(settings.currentTemperature, currentUnit);
  }
  if (settings.active !== undefined) {
    setThermostatActive(settings.active);
  }
};

export const getThermostatSettings = (): ThermostatSettings => {
  return {
    unit: getThermostatUnit(),
    temperature: getThermostatTemperature(),
    currentTemperature: getCurrentTemperature(),
    active: getThermostatActive(),
  };
};

// Utility functions
export const resetThermostatSettings = (): void => {
  setThermostatSettings(DEFAULT_THERMOSTAT_SETTINGS);
};

export const hasThermostatSettings = (): boolean => {
  return storage.contains(THERMOSTAT_KEYS.UNIT) || 
         storage.contains(THERMOSTAT_KEYS.TEMPERATURE) || 
         storage.contains(THERMOSTAT_KEYS.CURRENT_TEMPERATURE) ||
         storage.contains(THERMOSTAT_KEYS.ACTIVE);
};

// Temperature conversion utilities
export const convertTemperature = (temp: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'cel' && toUnit === 'fahrenheit') {
    return (temp * 9/5) + 32;
  } else if (fromUnit === 'fahrenheit' && toUnit === 'cel') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
  const rounded = Math.round(temp);
  return unit === 'cel' ? `${rounded}°C` : `${rounded}°F`;
};

// Temperature animation utilities
export const animateTemperatureTowardsTarget = (): void => {
  const settings = getThermostatSettings();
  
  // Only animate if HVAC is active
  if (!settings.active) {
    return;
  }
  
  const currentTemp = settings.currentTemperature;
  const targetTemp = settings.temperature;
  const difference = targetTemp - currentTemp;
  
  // If already at target, no need to animate
  if (Math.abs(difference) < 0.1) {
    return;
  }
  
  // Move 1 degree towards target (or 0.5 degrees for smaller steps)
  const step = Math.abs(difference) > 1 ? (difference > 0 ? 1 : -1) : (difference > 0 ? 0.5 : -0.5);
  const newCurrentTemp = currentTemp + step;
  
  setCurrentTemperature(newCurrentTemp);
};

// Initialize temperature animation timer
let temperatureAnimationInterval: NodeJS.Timeout | null = null;

export const startTemperatureAnimation = (): void => {
  // Clear existing interval if any
  if (temperatureAnimationInterval) {
    clearInterval(temperatureAnimationInterval);
  }
  
  // Start new interval - animate every 10 seconds
  temperatureAnimationInterval = setInterval(() => {
    animateTemperatureTowardsTarget();
  }, 10000);
};

export const stopTemperatureAnimation = (): void => {
  if (temperatureAnimationInterval) {
    clearInterval(temperatureAnimationInterval);
    temperatureAnimationInterval = null;
  }
};
