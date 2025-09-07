import React from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'

interface NavigationIconButtonProps extends PressableProps {
  icon: React.ReactNode | React.ReactElement,
  themeOverride?: 'dark' | 'light',
}

const NavigationIconButton = ({ icon, themeOverride, ...props }: NavigationIconButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container,  pressed && styles.containerHover]}
      {...props}
    >
      {icon}
    </Pressable>
  )
}

export default NavigationIconButton

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
  containerHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
})