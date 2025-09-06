import { hasUserEmail } from '@/utils/storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();

  const [loaded] = useFonts({
    PlusJakartaSansBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    Geist: require('../assets/fonts/Geist-Medium.ttf'),
    GeistBold: require('../assets/fonts/Geist-SemiBold.ttf'),
  });

  useEffect(() => {
    if (!loaded) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (hasUserEmail() && !inAuthGroup) {
      // User has email stored, redirect to thermostat
      router.replace('/(tabs)/thermostat');
    } else if (!hasUserEmail() && inAuthGroup) {
      // User doesn't have email stored, redirect to onboarding
      router.replace('/onboarding');
    }
  }, [loaded, segments]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="onboarding" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="index" options={{ headerShown: true, animation: 'slide_from_bottom' }} /> */}
        <Stack.Screen name="onboarding" options={{ animation: 'none' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
