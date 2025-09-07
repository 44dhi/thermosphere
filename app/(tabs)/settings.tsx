import OnboardingButton from '@/components/ui/OnboardingButton';
import ThemedText from '@/components/ui/ThemedText';
import { colours } from '@/constants/colours';
import { settings } from '@/constants/settings';
import { removeUserEmail, setThermostatSettings } from '@/utils/storage';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Switch, useColorScheme, View } from 'react-native';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === 'dark' ? colours.dark : colours.light;
  const [vacationMode, setVacationMode] = useState(false);

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
        entering={FadeIn.duration(300).easing(Easing.out(Easing.quad))}
        style={[styles.container]}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={[styles.mainCard, { backgroundColor: colorTheme.settings.settingItem.background }]}>
          <Image
            source={require('@/assets/images/default_profile_image.png')}
            style={{ width: 48, height: 48 }}
            contentFit="contain"
          />
          <View style={{ gap: 7 }}>
            <ThemedText variant="heading.small">Aadhit Shanmugam</ThemedText>
            <ThemedText style={{ color: colorTheme.fills.main.description }} variant="paragraph.small.regular">
              aadhit32973@gmail.com
            </ThemedText>
          </View>
        </View>
        <View style={styles.settingContainer}>
          <ThemedText
            variant="paragraph.medium.regular"
            style={[styles.settingTitle, { color: colorTheme.fills.main.description }]}
          >
            Quick Settings
          </ThemedText>
          <View style={[styles.settingItem, { backgroundColor: colorTheme.settings.settingItem.background }]}>
            <View style={[styles.settingItemRow, { justifyContent: 'space-between' }]}>
              <ThemedText variant="paragraph.medium.regular">Vacation Mode</ThemedText>
              <Switch
                value={vacationMode}
                trackColor={{ true: colorTheme.primary.foreground }}
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
        </View>
        {settings.map(setting => (
          <View key={setting.title} style={styles.settingContainer}>
            <ThemedText
              variant="paragraph.medium.regular"
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
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    gap: 36,
  },
  contentContainer: {
    gap: 24,
  },
  mainCard: {
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
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
