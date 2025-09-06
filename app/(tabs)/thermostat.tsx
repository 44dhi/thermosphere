import OnboardingButton from '@/components/ui/OnboardingButton'
import ThemedText from '@/components/ui/ThemedText'
import { colours } from '@/constants/colours'
import { removeUserEmail } from '@/utils/storage'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import Animated, { Easing, FadeIn } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const ThermoStat = () => {
  const colorScheme = useColorScheme()
  const backgroundColor = colorScheme === 'dark' ? colours.dark.fills.main.background : colours.light.fills.main.background

  function onPress() {
    removeUserEmail()
    router.replace('/onboarding')
  }
  return (
    <SafeAreaView edges={[ 'left', 'right']} style={[styles.safeArea, { backgroundColor: backgroundColor }]}>
      <Animated.View entering={FadeIn.duration(300).easing(Easing.out(Easing.quad))} style={[styles.container]}>
        <ThemedText themeOverride='dark'>thermostat</ThemedText>
        <OnboardingButton themeOverride='dark' title='Logout' onPress={() => {
          onPress()
        }}>
          Logout
        </OnboardingButton>
      </Animated.View>
    </SafeAreaView>
  )
}

export default ThermoStat

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
})