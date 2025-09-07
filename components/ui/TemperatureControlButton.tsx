import React from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'

interface TemperatureControlButtonProps extends PressableProps {
  icon: React.ReactNode | React.ReactElement,
  themeOverride?: 'dark' | 'light',
}

const TemperatureControlButton = ({ icon, themeOverride, ...props }: TemperatureControlButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container,  pressed && styles.containerHover, props.disabled ? { opacity: 0.5 } : null]}
      {...props}
    >
      {icon}
    </Pressable>
  )
}

export default TemperatureControlButton

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  containerHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
})