import Header from '@/components/thermostat/Header';
import { HapticTab } from '@/components/ui/HapticTab';
import { colours } from '@/constants/colours';
import { Tabs } from 'expo-router';
import { House, Settings2 } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabbarBackground = colorScheme === 'dark' ? colours.dark.tabbar.background : colours.light.tabbar.background;
  const primaryForegroundColor =
    colorScheme === 'dark' ? colours.dark.primary?.foreground : colours.light.primary?.foreground;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryForegroundColor,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: tabbarBackground,
          height: 88,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="thermostat"
        options={{
          title: 'Home',
          animation: 'fade',
          header: () => <Header />,
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          animation: 'fade',
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark' ? colours.dark.fills.main.background : colours.light.fills.main.background,
          },
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSansBold',
            fontSize: 20,
          },
          tabBarIcon: ({ color }) => <Settings2 size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
