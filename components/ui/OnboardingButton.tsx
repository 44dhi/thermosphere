import React from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'
import ThemedText from './ThemedText'

interface OnboardingButtonProps extends PressableProps {
  title?: string,
  icon?: React.ReactNode | React.ReactElement,
  themeOverride?: 'dark' | 'light',
}

const OnboardingButton = ({ children, title, icon, themeOverride, ...props }: OnboardingButtonProps) => {
  return (
    <Pressable
      {...props}
      disabled={props.disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        props.disabled ? { opacity: 0.5 } : null
      ]}
    >
      {icon}
      {title && <ThemedText themeOverride={themeOverride} variant='paragraph.large.bold'>{title}</ThemedText>}
  </Pressable>
  )
}

export default OnboardingButton

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 32,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 244, 245, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244, 244, 245, 0.24)',
    boxShadow: '0 4px 12px 0 rgba(23, 23, 23, 0.09)',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  }
})
