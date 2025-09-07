import ThermoStatController from '@/components/thermostat/ThermoStat';
import ThemedText from '@/components/ui/ThemedText';
import { colours } from '@/constants/colours';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ThermoStat = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark' ? colours.dark.fills.main.background : colours.light.fills.main.background;
  const colorTheme = colorScheme === 'dark' ? colours.dark : colours.light;

  return (
    <SafeAreaView edges={['left', 'right']} style={[styles.safeArea, { backgroundColor: backgroundColor }]}>
      <Animated.ScrollView
        entering={FadeIn.duration(300).easing(Easing.out(Easing.quad))}
        style={[styles.container]}
        contentContainerStyle={styles.contentContainer}
      >
        <ThermoStatController />
        <View
          style={[styles.card, { backgroundColor: colorTheme.card.background, borderColor: colorTheme.card.border }]}
        >
          <Image source={require('@/assets/images/cloud_asset.png')} style={styles.image} contentFit="cover" />
          <View style={{ gap: 4 }}>
            <ThemedText style={{ color: colours.dark.fills.main.description }} variant="paragraph.medium.regular">
              Sunday, September 6
            </ThemedText>
            <ThemedText variant="heading.small">53ºF, Partly Cloudy</ThemedText>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ThermoStat;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingTop: 100,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    gap: 36,
  },
  contentContainer: {
    gap: 40,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
});
