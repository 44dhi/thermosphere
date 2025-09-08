import { colours } from '@/constants/colours';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, useColorScheme } from 'react-native';

interface NavigationIconButtonProps extends PressableProps {
  icon: React.ReactNode | React.ReactElement;
  themeOverride?: 'dark' | 'light';
}

const NavigationIconButton = ({ icon, themeOverride, ...props }: NavigationIconButtonProps) => {
  const colorScheme = useColorScheme();
  const colorTheme = themeOverride ? colours[themeOverride] : colours[colorScheme || 'light'];
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colorTheme.navigationIconButton.background,
          opacity:
            typeof colorTheme.navigationIconButton.hover === 'number' && pressed
              ? colorTheme.navigationIconButton.hover
              : 1,
        },
        pressed && { backgroundColor: colorTheme.navigationIconButton.hover },
      ]}
      {...props}
    >
      {icon}
    </Pressable>
  );
};

export default NavigationIconButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
});
