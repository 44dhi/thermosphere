import { colours } from '@/constants/colours'
import {
  convertTemperature,
  formatTemperature,
  getMaxTemperature,
  getMinTemperature,
  getThermostatSettings,
  setThermostatSettings,
  startTemperatureAnimation,
  stopTemperatureAnimation,
  type TemperatureUnit
} from '@/utils/storage'
import { Image } from 'expo-image'
import { Minus, Plus, Power } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native'
import TemperatureSpokes from '../icons/TemperatureSpokes'
import ThermoStatControlBackground from '../icons/ThermoStatControlBackground'
import TemperatureControlButton from '../ui/TemperatureControlButton'
import TemperatureToggle from '../ui/TemperatureToggle'
import ThemedText from '../ui/ThemedText'

const ThermoStat = () => {
  const colorScheme = useColorScheme()
  const foregroundColor = colorScheme === 'dark' ? colours.dark.fills.main.foreground : colours.light.fills.main.foreground
  const descriptionColor = colorScheme === 'dark' ? colours.dark.fills.main.description : colours.light.fills.main.description
  
  const [settings, setSettings] = useState(getThermostatSettings())
  
  useEffect(() => {
    setSettings(getThermostatSettings())
    startTemperatureAnimation()
    
    const updateInterval = setInterval(() => {
      setSettings(getThermostatSettings())
    }, 10000)
    
    return () => {
      stopTemperatureAnimation()
      clearInterval(updateInterval)
    }
  }, [])
  
  const handleTemperatureChange = (delta: number) => {
    const newTemp = settings.temperature + delta
    const updatedSettings = { ...settings, temperature: newTemp }
    setThermostatSettings(updatedSettings)
    setSettings(updatedSettings)
  }
  
  const handleToggleActive = () => {
    const updatedSettings = { ...settings, active: !settings.active }
    setThermostatSettings(updatedSettings)
    setSettings(updatedSettings)
  }
  
  const handleUnitToggle = () => {
    const newUnit: TemperatureUnit = settings.unit === 'fahrenheit' ? 'cel' : 'fahrenheit'
    const convertedTemp = convertTemperature(settings.temperature, settings.unit, newUnit)
    const convertedCurrentTemp = convertTemperature(settings.currentTemperature, settings.unit, newUnit)
    const updatedSettings = { 
      ...settings, 
      unit: newUnit, 
      temperature: Math.round(convertedTemp),
      currentTemperature: Math.round(convertedCurrentTemp)
    }
    setThermostatSettings(updatedSettings)
    setSettings(updatedSettings)
  }

  // Function to map temperature to rotation angle (-120 to 120 degrees)
  const getKnobRotation = (temperature: number, unit: TemperatureUnit): string => {
    const minTemp = getMinTemperature(unit)
    const maxTemp = getMaxTemperature(unit)
    
    // Map temperature from [minTemp, maxTemp] to [-120, 120] degrees
    const normalizedTemp = (temperature - minTemp) / (maxTemp - minTemp)
    const rotation = -120 + (normalizedTemp * 240) // 240 is the total range (120 - (-120))
    
    return `${rotation}deg`
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.temperatureContainer}>
        <View style={[styles.thermoStatBackground, {opacity: settings.active ? 1 : 0.5}]}>
          <ThermoStatControlBackground />
          <View style={styles.temperatureSpokesContainer}>
            <TemperatureSpokes />
          </View>
          <Image
            source={require('@/assets/images/thermo_knob.png')}
            style={[
              styles.temperatureKnobContainer,
              {
                transform: [
                  { translateX: '-50%' }, 
                  { translateY: '-50%' }, 
                  { rotate: getKnobRotation(settings.temperature, settings.unit) }
                ]
              }
            ]}
          />
        </View>
        <View style={styles.textContainer}>
          <ThemedText style={{color: descriptionColor}} variant='paragraph.large.bold'>SET TO</ThemedText>
          {
            settings.active
            ? <Pressable onPress={handleUnitToggle}>
            <ThemedText variant='heading.xxx-large' style={{color: foregroundColor}}>
              {formatTemperature(settings.temperature, settings.unit)}
            </ThemedText>
          </Pressable>
            : <ThemedText variant='heading.xxx-large' style={{color: foregroundColor}}>
            OFF
          </ThemedText>
          }
          <ThemedText style={{color: descriptionColor}} variant='paragraph.large.bold'>
            CURRENTLY {formatTemperature(settings.currentTemperature, settings.unit)}
          </ThemedText>
        </View>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.temperatureControlContainer}>
          <TemperatureControlButton 
            icon={<Minus size={36} color="white" />} 
            onPress={() => handleTemperatureChange(-1)}
            disabled={settings.temperature <= getMinTemperature(settings.unit) || !settings.active}
          />
          <TemperatureControlButton 
            icon={<Plus size={36} color="white" />} 
            onPress={() => handleTemperatureChange(1)}
            disabled={settings.temperature >= getMaxTemperature(settings.unit) || !settings.active}
          />  
        </View>
        <TemperatureToggle
          icon={<Power 
          size={24}
          color={foregroundColor} />}
          title={settings.active ? "HVAC ON" : "HVAC OFF"}
          active={settings.active}
          onPress={handleToggleActive}
        />
      </View>
    </View>
  )
}

export default ThermoStat

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
    paddingTop: 50
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
  }
})
