/* eslint-disable react-hooks/exhaustive-deps */
import OnboardingButton from '@/components/ui/OnboardingButton';
import ThemedText from '@/components/ui/ThemedText';
import { removeUserEmail } from '@/utils/storage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeInDown, FadeOut, FadeOutDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface WelcomeProps {
  setDirection: (direction: 'left' | 'right') => void;
  setActiveStep: (step: number) => void;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Welcome = ({ setActiveStep, setDirection }: WelcomeProps) => {
  const defaultAnim = useSharedValue<number>(40);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateY: defaultAnim.value }],
  }));

  React.useEffect(() => {
    defaultAnim.value = withRepeat(
      withTiming(-defaultAnim.value, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, []);

  const onPress = () => {
    console.log('onPress');
    removeUserEmail();
    setDirection('right');
    setActiveStep(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.View
        style={styles.textContainer}
        entering={FadeInDown.delay(400).duration(400).easing(Easing.out(Easing.quad))}
        exiting={FadeOutDown.delay(400).duration(400).easing(Easing.in(Easing.quad))}
      >
          <ThemedText themeOverride="dark" variant="heading.xxx-large">
            ThermoSphere
          </ThemedText>
          <ThemedText themeOverride="dark" variant="paragraph.large.regular">
            Stay Warm. Stay Native.
          </ThemedText>
        </Animated.View>
        <Animated.View
          style={{width: '100%'}}
          entering={FadeIn.delay(600).duration(400).easing(Easing.out(Easing.quad))}
          exiting={FadeOut.duration(600).easing(Easing.in(Easing.quad))}
        >
          <OnboardingButton
            title="Continue With Email"
            icon={<FontAwesome6 name="envelope" size={20} color="white" />}
            themeOverride="dark"
            onPress={onPress}
          />
        </Animated.View>
      </View>
      <AnimatedImage
        source={require('@/assets/images/spark_logo.png')}
        style={[styles.image, animatedDefault]}
        contentFit="cover"
      />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
    paddingBottom: 24,
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
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 550,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
});
