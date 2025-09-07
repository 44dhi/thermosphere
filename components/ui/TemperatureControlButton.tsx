import { colours } from '@/constants/colours';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, useColorScheme } from 'react-native';

interface TemperatureControlButtonProps extends PressableProps {
  icon: React.ReactNode | React.ReactElement;
  themeOverride?: 'dark' | 'light';
}

const TemperatureControlButton = ({ icon, themeOverride, ...props }: TemperatureControlButtonProps) => {
  const colorScheme = useColorScheme();
  const colorTheme = themeOverride ? colours[themeOverride] : colours[colorScheme || 'light'];
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colorTheme.temperatureButton.background },
        pressed && styles.containerHover,
        pressed && {backgroundColor: colorTheme.temperatureButton.hover},
        props.disabled ? { opacity: 0.5 } : null,
      ]}
      {...props}
    >
      {icon}
    </Pressable>
  );
};

export default TemperatureControlButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  containerHover: {},
});
