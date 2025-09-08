import CustomToast from '@/components/ui/Toast';
import { hasUserEmail } from '@/utils/storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';

SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

const toastConfig = {
  default: ({ text1, props }: any) => <CustomToast text1={text1} props={props} />,
};

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

    const initializeApp = async () => {
      const inAuthGroup = segments[0] === '(tabs)';
      const userHasEmail = hasUserEmail();

      if (userHasEmail && !inAuthGroup) {
        router.replace('/(tabs)/thermostat');
      } else if (!userHasEmail) {
        router.replace('/onboarding');
      }

      await SplashScreen.hideAsync();
    };

    const frame = requestAnimationFrame(initializeApp);

    return () => cancelAnimationFrame(frame);
  }, [loaded, segments, router]);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" options={{ animation: 'none' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
      </Stack> */}
      <Slot />
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
