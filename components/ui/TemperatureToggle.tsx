import { colours } from '@/constants/colours';
import React, { useEffect } from 'react';
import { Pressable, PressableProps, StyleSheet, useColorScheme } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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

  // Animated value for smooth transitions
  const activeProgress = useSharedValue(active ? 1 : 0);

  // Update animated value when active prop changes
  useEffect(() => {
    activeProgress.value = withTiming(active ? 1 : 0, { duration: 300 });
  }, [active, activeProgress]);

  // Animated styles for smooth color and shadow transitions
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      activeProgress.value,
      [0, 1],
      [colorTheme.temperatureToggle.background, 'rgba(81, 74, 255, 0.75)'],
    );

    const borderColor = interpolateColor(activeProgress.value, [0, 1], ['transparent', 'rgba(244, 244, 245, 0.20)']);

    return {
      backgroundColor,
      borderColor,
      borderWidth: activeProgress.value,
      shadowOpacity: activeProgress.value * 0.28,
      shadowRadius: 12 * activeProgress.value,
      elevation: 8 * activeProgress.value, // For Android shadow
    };
  });

  return (
    <Pressable
      {...props}
      disabled={props.disabled}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, props.disabled ? { opacity: 0.5 } : null]}
    >
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        {icon}
        {title && (
          <ThemedText themeOverride={active ? 'dark' : themeOverride} variant="paragraph.large.bold">
            {title}
          </ThemedText>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default TemperatureToggle;

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 32,
    overflow: 'hidden', // Ensure shadow doesn't get clipped
  },
  animatedContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 32,
    gap: 8,
    paddingLeft: 32,
    paddingRight: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(81, 74, 255, 0.28)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
});
