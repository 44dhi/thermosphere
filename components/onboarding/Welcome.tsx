import OnboardingButton from '@/components/ui/OnboardingButton'
import ThemedText from '@/components/ui/ThemedText'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface WelcomeProps {
  setDirection: (direction: 'left' | 'right') => void
  setActiveStep: (step: number) => void
}

const Welcome = ({ setActiveStep, setDirection }: WelcomeProps) => {

  const onPress = () => {
    setDirection('right')
    setActiveStep(1)
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <ThemedText themeOverride='dark' variant='heading.xxx-large'>ThermoSphere</ThemedText>
          <ThemedText themeOverride='dark' variant='paragraph.large.regular'>Stay Warm. Stay Native.</ThemedText>
        </View>
        <OnboardingButton title='Continue With Email' themeOverride='dark' onPress={onPress} />
      </View>
      <Image
        source={require('@/assets/images/spark_logo.png')}
        style={[styles.image]}
        contentFit='cover'
      />
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 32,
    gap: 48,
    zIndex: 3,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 16,
    textAlign: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 550,
    position: 'absolute',
    left: '50%',
    top: 0,
    zIndex: 2,
    transform: [{ translateX: '-50%' }]
  }
})