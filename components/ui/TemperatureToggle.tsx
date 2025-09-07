import { colours } from '@/constants/colours';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, useColorScheme } from 'react-native';
import ThemedText from './ThemedText';

interface TemperatureToggleProps extends PressableProps {
  icon: React.ReactNode | React.ReactElement;
  themeOverride?: 'dark' | 'light';
  title: string;
  active: boolean;
}
const TemperatureToggle = ({ icon, themeOverride, title, active, ...props }: TemperatureToggleProps) => {
  const colorScheme = useColorScheme();
  const colorTheme = themeOverride ? colours[themeOverride] : colours[colorScheme || 'light'];
  return (
    <Pressable
      {...props}
      disabled={props.disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colorTheme.temperatureToggle.background },
        pressed && styles.pressed,
        props.disabled ? { opacity: 0.5 } : null,
        active && styles.active,
      ]}
    >
      {icon}
      {title && (
        <ThemedText themeOverride={active ? 'dark' : themeOverride} variant="paragraph.large.bold">
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
};

export default TemperatureToggle;

const styles = StyleSheet.create({
  button: {
    height: 52,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 32,
    gap: 8,
    paddingLeft: 32,
    paddingRight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  active: {
    borderWidth: 1,
    borderColor: 'rgba(244, 244, 245, 0.20)',
    backgroundColor: 'rgba(81, 74, 255, 0.75)',
    boxShadow: '0 0 12px 0 rgba(81, 74, 255, 0.28)',
  },
});
