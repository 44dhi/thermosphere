import ProfileCard from '@/components/settings/ProfileCard';
import OnboardingButton from '@/components/ui/OnboardingButton';
import ThemedText from '@/components/ui/ThemedText';
import { colours } from '@/constants/colours';
import { settings } from '@/constants/settings';
import { removeUserEmail, setThermostatSettings } from '@/utils/storage';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { LogOut, Sun, TicketsPlane } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Switch, useColorScheme, View } from 'react-native';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';


const Settings = () => {
  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === 'dark' ? colours.dark : colours.light;
  const [vacationMode, setVacationMode] = useState(false);
  const [brightness, setBrightness] = useState(0.8);

  function onPress() {
    removeUserEmail();
    setThermostatSettings({
      unit: 'fahrenheit',
      temperature: 55,
      currentTemperature: 55,
      active: false,
    });
    router.replace('/onboarding');
  }

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={[styles.safeArea, { backgroundColor: colorTheme.fills.main.background }]}
    >
      <Animated.ScrollView
        entering={FadeInDown.delay(200).duration(300).easing(Easing.out(Easing.quad))}
        style={[styles.container]}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <ProfileCard />
        <View style={styles.settingContainer}>
          <ThemedText
            variant="paragraph.small.regular"
            style={[styles.settingTitle, { color: colorTheme.fills.main.description }]}
          >
            Quick Settings
          </ThemedText>

          <View style={[styles.settingItem, { backgroundColor: colorTheme.settings.settingItem.background }]}>
            <View style={[styles.settingItemRow, { justifyContent: 'space-between' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View
                  style={[styles.settingItemIcon, { backgroundColor: colorTheme.settings.settingItem.iconContainer }]}
                >
                  <TicketsPlane size={24} color={colorTheme.fills.main.foreground} />
                </View>
                <ThemedText variant="paragraph.medium.regular">Vacation Mode</ThemedText>
              </View>
              <Switch
                value={vacationMode}
                trackColor={{ true: colorTheme.primary.foreground }}
                thumbColor={ vacationMode ? colorTheme.primary.foreground : colorTheme.fills.main.foreground }
                onValueChange={setVacationMode}
              />
            </View>
          </View>
          <ThemedText
            style={{ color: colorTheme.fills.main.description, marginTop: -4 }}
            variant="paragraph.small.regular"
          >
            Vacation Mode optimises home safety and efficiency while you’re away
          </ThemedText>

          <View style={[styles.settingItem, { backgroundColor: colorTheme.settings.settingItem.background }]}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <View style={[styles.settingItemRow, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View
                    style={[styles.settingItemIcon, { backgroundColor: colorTheme.settings.settingItem.iconContainer }]}
                  >
                    <Sun size={24} color={colorTheme.fills.main.foreground} />
                  </View>
                  <ThemedText variant="paragraph.medium.regular">ThermoStat Brightness</ThemedText>
                </View>
              </View>
              <ThemedText variant="paragraph.medium.regular">{Math.round(brightness * 100)}%</ThemedText>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: colorTheme.settings.settingItem.divider }} />
            <Slider
              style={{width: '100%', height: 56}}
              minimumValue={0}
              value={brightness}
              maximumValue={1}
              thumbTintColor={colorTheme.primary.foreground}
              minimumTrackTintColor={colorTheme.primary.foreground}
              maximumTrackTintColor={colorTheme.primary.foreground}  
              onValueChange={setBrightness}
            />
          </View>
        </View>
        {settings.map(setting => (
          <View key={setting.title} style={styles.settingContainer}>
            <ThemedText
              variant="paragraph.small.regular"
              style={[styles.settingTitle, { color: colorTheme.fills.main.description }]}
            >
              {setting.title}
            </ThemedText>
            <View style={[styles.settingItem, { backgroundColor: colorTheme.settings.settingItem.background }]}>
              {setting.children.map((child, index, array) => (
                <View key={child.title} style={styles.settingItemRow}>
                  <View
                    style={[styles.settingItemIcon, { backgroundColor: colorTheme.settings.settingItem.iconContainer }]}
                  >
                    {child.icon}
                  </View>
                  <ThemedText variant="paragraph.medium.regular">{child.title}</ThemedText>
                  {array.length > 1 && index !== array.length - 1 && (
                    <View
                      style={[
                        styles.settingItemRowSeparator,
                        { backgroundColor: colorTheme.settings.settingItem.divider },
                      ]}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
        <OnboardingButton
          title="Sign Out"
          icon={<LogOut size={20} color={colorTheme.fills.main.foreground} />}
          onPress={onPress}
        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingTop: 4,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    gap: 36,
  },
  contentContainer: {
    gap: 24,
  },
  settingContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  settingTitle: {
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  settingItem: {
    padding: 12,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 16,
  },
  settingItemIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  settingItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 58,
  },
  settingItemRowSeparator: {
    height: 1,
    width: '87%',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
