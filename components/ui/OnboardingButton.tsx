import { colours } from '@/constants/colours';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, useColorScheme } from 'react-native';
import ThemedText from './ThemedText';

interface OnboardingButtonProps extends PressableProps {
  title?: string;
  icon?: React.ReactNode | React.ReactElement;
  themeOverride?: 'dark' | 'light';
}

const OnboardingButton = ({ children, title, icon, themeOverride, ...props }: OnboardingButtonProps) => {
  const colorScheme = useColorScheme();
  const colorTheme = themeOverride ? colours[themeOverride] : colours[colorScheme || 'light'];
  return (
    <Pressable
      {...props}
      disabled={props.disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colorTheme.onboarding.button.background,
          borderColor: colorTheme.onboarding.button.border,
          boxShadow: colorTheme.onboarding.button.shadow,
        },
        pressed && styles.pressed,
        props.disabled ? { opacity: 0.5 } : null,
      ]}
    >
      {icon}
      {title && (
        <ThemedText themeOverride={themeOverride} variant="paragraph.large.bold">
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
};

export default OnboardingButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 32,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
});
