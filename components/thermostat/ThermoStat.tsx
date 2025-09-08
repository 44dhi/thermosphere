import { colours } from '@/constants/colours';
import {
  convertTemperature,
  formatTemperature,
  getMaxTemperature,
  getMinTemperature,
  getThermostatSettings,
  setThermostatSettings,
  startTemperatureAnimation,
  stopTemperatureAnimation,
  type TemperatureUnit,
} from '@/utils/storage';
import { Image } from 'expo-image';
import { Minus, Plus, Power } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import TemperatureSpokes from '../icons/TemperatureSpokes';
import ThermoStatControlBackground from '../icons/ThermoStatControlBackground';
import TemperatureControlButton from '../ui/TemperatureControlButton';
import TemperatureToggle from '../ui/TemperatureToggle';
import ThemedText from '../ui/ThemedText';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const ThermoStat = () => {
  const colorScheme = useColorScheme();
  const foregroundColor =
    colorScheme === 'dark' ? colours.dark.fills.main.foreground : colours.light.fills.main.foreground;
  const descriptionColor =
    colorScheme === 'dark' ? colours.dark.fills.main.description : colours.light.fills.main.description;

  const [settings, setSettings] = useState(getThermostatSettings());
  const knobRotation = useSharedValue(0);
  const spokeRotation = useSharedValue(0);

  // Animated values for text transitions
  const temperatureTextOpacity = useSharedValue(1);
  const currentTempTextOpacity = useSharedValue(1);
  const temperatureTextScale = useSharedValue(1);
  const currentTempTextScale = useSharedValue(1);

  useEffect(() => {
    setSettings(getThermostatSettings());
    startTemperatureAnimation();

    const updateInterval = setInterval(() => {
      setSettings(getThermostatSettings());
    }, 10000);

    return () => {
      stopTemperatureAnimation();
      clearInterval(updateInterval);
    };
  }, []);

  // Function to animate text changes
  const animateTextChange = useCallback(
    (isTemperatureChange: boolean) => {
      if (isTemperatureChange) {
        // Animate temperature text
        temperatureTextOpacity.value = withSequence(
          withTiming(0.7, { duration: 150 }),
          withTiming(1, { duration: 150 }),
        );
        temperatureTextScale.value = withSequence(
          withTiming(0.95, { duration: 150 }),
          withSpring(1, { damping: 15, stiffness: 150 }),
        );
      } else {
        // Animate current temperature text
        currentTempTextOpacity.value = withSequence(
          withTiming(0.7, { duration: 150 }),
          withTiming(1, { duration: 150 }),
        );
        currentTempTextScale.value = withSequence(
          withTiming(0.95, { duration: 150 }),
          withSpring(1, { damping: 15, stiffness: 150 }),
        );
      }
    },
    [temperatureTextOpacity, temperatureTextScale, currentTempTextOpacity, currentTempTextScale],
  );

  useEffect(() => {
    const newKnobRotation = getKnobRotation(settings.temperature, settings.unit);
    const newSpokeRotation = getKnobRotation(settings.currentTemperature, settings.unit);

    knobRotation.value = withTiming(newKnobRotation, { duration: 300 });
    spokeRotation.value = withTiming(newSpokeRotation, { duration: 300 });
  }, [settings.temperature, settings.currentTemperature, settings.unit, knobRotation, spokeRotation]);

  // Separate useEffect to track temperature changes for text animation
  useEffect(() => {
    animateTextChange(true);
  }, [settings.temperature, settings.unit, animateTextChange]);

  // Separate useEffect to track current temperature changes for text animation
  useEffect(() => {
    animateTextChange(false);
  }, [settings.currentTemperature, animateTextChange]);

  const handleTemperatureChange = (delta: number) => {
    const newTemp = settings.temperature + delta;
    const updatedSettings = { ...settings, temperature: newTemp };
    setThermostatSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  const handleToggleActive = () => {
    const updatedSettings = { ...settings, active: !settings.active };
    setThermostatSettings(updatedSettings);
    setSettings(updatedSettings);
    Toast.hide();
    Toast.show({
      type: 'default',
      text1: updatedSettings.active ? 'HVAC System ON' : 'HVAC System OFF',
      position: 'top',
      topOffset: 130,
      props: {
        type: 'info',
      },
    });
  };

  const handleUnitToggle = () => {
    const newUnit: TemperatureUnit = settings.unit === 'fahrenheit' ? 'cel' : 'fahrenheit';
    const convertedTemp = convertTemperature(settings.temperature, settings.unit, newUnit);
    const convertedCurrentTemp = convertTemperature(settings.currentTemperature, settings.unit, newUnit);
    const updatedSettings = {
      ...settings,
      unit: newUnit,
      temperature: Math.round(convertedTemp),
      currentTemperature: Math.round(convertedCurrentTemp),
    };
    setThermostatSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  // Function to map temperature to rotation angle (-120 to 120 degrees)
  const getKnobRotation = (temperature: number, unit: TemperatureUnit): number => {
    const minTemp = getMinTemperature(unit);
    const maxTemp = getMaxTemperature(unit);

    const normalizedTemp = (temperature - minTemp) / (maxTemp - minTemp);
    const rotation = -120 + normalizedTemp * 240;

    return rotation;
  };

  // Animated styles for smooth rotation
  const knobAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: '-50%' }, { translateY: '-50%' }, { rotate: `${knobRotation.value}deg` }],
    };
  });

  const spokeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${spokeRotation.value}deg` }],
    };
  });

  // Animated styles for text transitions
  const temperatureTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: temperatureTextOpacity.value,
      transform: [{ scale: temperatureTextScale.value }],
    };
  });

  const currentTempTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: currentTempTextOpacity.value,
      transform: [{ scale: currentTempTextScale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.temperatureContainer}>
        <View style={[styles.thermoStatBackground, { opacity: settings.active ? 1 : 0.5 }]}>
          <ThermoStatControlBackground color={colorScheme === 'dark' ? 'white' : 'black'} />
          <View style={styles.temperatureSpokesContainer}>
            <TemperatureSpokes />
          </View>
          <View style={styles.temperatureSpokesContainer}>
            <AnimatedImage
              source={require('@/assets/images/active_spoke.png')}
              style={[
                { width: 312, height: 312 },
                colorScheme === 'light' && {
                  tintColor: '#6d45fc',
                },
                spokeAnimatedStyle,
              ]}
              contentFit="cover"
            />
          </View>
          {settings.active && (
            <AnimatedImage
              entering={FadeIn.duration(300).easing(Easing.out(Easing.quad))}
              exiting={FadeOut.duration(300).easing(Easing.out(Easing.quad))}
              source={require('@/assets/images/thermo_knob.png')}
              style={[
                styles.temperatureKnobContainer,
                colorScheme === 'light' && {
                  tintColor: '#666666',
                },
                knobAnimatedStyle,
              ]}
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <ThemedText style={{ color: descriptionColor }} variant="paragraph.large.bold">
            {settings.active ? 'SET TEMP' : ''}
          </ThemedText>
          {settings.active ? (
            <Pressable onPress={handleUnitToggle}>
              <Animated.View style={temperatureTextAnimatedStyle}>
                <ThemedText variant="heading.xxx-large" style={{ color: foregroundColor }}>
                  {formatTemperature(settings.temperature, settings.unit)}
                </ThemedText>
              </Animated.View>
            </Pressable>
          ) : (
            <Animated.View style={temperatureTextAnimatedStyle}>
              <ThemedText variant="heading.xxx-large" style={{ color: foregroundColor }}>
                OFF
              </ThemedText>
            </Animated.View>
          )}
          <Animated.View style={currentTempTextAnimatedStyle}>
            <ThemedText style={{ color: descriptionColor }} variant="paragraph.large.bold">
              CURRENTLY {formatTemperature(settings.currentTemperature, settings.unit)}
            </ThemedText>
          </Animated.View>
        </View>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.temperatureControlContainer}>
          <TemperatureControlButton
            icon={<Minus size={36} color={foregroundColor} />}
            onPress={() => handleTemperatureChange(-1)}
            disabled={settings.temperature <= getMinTemperature(settings.unit) || !settings.active}
          />
          <TemperatureControlButton
            icon={<Plus size={36} color={foregroundColor} />}
            onPress={() => handleTemperatureChange(1)}
            disabled={settings.temperature >= getMaxTemperature(settings.unit) || !settings.active}
          />
        </View>
        <TemperatureToggle
          icon={<Power size={24} color={settings.active ? 'white' : foregroundColor} />}
          title={settings.active ? 'HVAC ON' : 'HVAC OFF'}
          active={settings.active}
          onPress={handleToggleActive}
        />
      </View>
    </View>
  );
};

export default ThermoStat;

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    alignItems: 'center',
    textAlign: 'center',
  },
  temperatureControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 48,
    zIndex: 30,
  },
  controlsContainer: {
    flexDirection: 'column',
    gap: 28,
    alignItems: 'center',
    marginTop: -40,
    zIndex: 30,
  },
  temperatureContainer: {
    width: '90%',
    aspectRatio: 1,
    position: 'relative',
  },
  textContainer: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    gap: 8,
    zIndex: 24,
    paddingTop: 50,
  },
  thermoStatBackground: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    width: '100%',
    height: '100%',
    zIndex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperatureSpokesContainer: {
    position: 'absolute',
    top: '50%',
    marginTop: 36,
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    width: '100%',
    height: '100%',
    zIndex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperatureKnobContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '98%',
    marginTop: 36,
    aspectRatio: 1,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});
