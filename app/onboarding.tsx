import EnterEmail from '@/components/onboarding/EnterEmail';
import Welcome from '@/components/onboarding/Welcome';
import { colours } from '@/constants/colours';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: screenHeight } = Dimensions.get('window');
const animationDuration = 300;

const NewOnboarding = () => {
  const darkColours = colours.dark;
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  function renderStep() {
    switch (activeStep) {
      case 0:
        return (
          <Animated.View
            key="welcome"
            entering={FadeIn.delay(animationDuration).duration(animationDuration).easing(Easing.out(Easing.quad))}
            exiting={FadeOut.duration(animationDuration).easing(Easing.in(Easing.quad))}
            style={styles.stepContainer}
          >
            <Welcome setActiveStep={setActiveStep} setDirection={setDirection} />
          </Animated.View>
        );
      case 1:
        return (
          <Animated.View
            key="enterEmail"
            entering={
              direction === 'right'
                ? FadeInRight.delay(animationDuration).duration(animationDuration).easing(Easing.out(Easing.quad))
                : FadeInLeft.duration(animationDuration).easing(Easing.out(Easing.quad))
            }
            exiting={
              direction === 'right'
                ? FadeOutRight.duration(animationDuration).easing(Easing.in(Easing.quad))
                : FadeOutLeft.duration(animationDuration).easing(Easing.in(Easing.quad))
            }
            style={styles.stepContainer}
          >
            <EnterEmail setActiveStep={setActiveStep} setDirection={setDirection} />
          </Animated.View>
        );
    }
  }

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      style={[styles.imageContainer, { backgroundColor: darkColours.fills.main.background }]}
    >
      <Animated.View entering={FadeIn.duration(800).easing(Easing.out(Easing.quad))} style={styles.backgroundImage}>
        <Image
          source={require('@/assets/images/onboarding_background.png')}
          style={styles.backgroundImage}
          contentFit="cover"
        />
      </Animated.View>
      {activeStep === 1 && (
        <Animated.View
          entering={FadeIn.duration(animationDuration).easing(Easing.out(Easing.quad))}
          exiting={FadeOut.duration(animationDuration).easing(Easing.in(Easing.quad))}
          style={styles.overlay}
        />
      )}
      {renderStep()}
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default NewOnboarding;

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: screenHeight,
    zIndex: 0,
  },
  imageContainer: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(21, 21, 22, 0.60)',
    height: screenHeight,
  },
  stepContainer: {
    flex: 1,
    zIndex: 1,
  },
});
