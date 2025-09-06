import { colours } from '@/constants/colours'
import React from 'react'
import { StyleProp, useColorScheme, View, ViewProps, ViewStyle } from 'react-native'

interface ThemedViewProps extends ViewProps {
  themeOverride?: 'light' | 'dark'
  style?: StyleProp<ViewStyle>,
}

const ThemedView = ({themeOverride, style, ...props}: ThemedViewProps) => {
  const theme = useColorScheme()
  const override = themeOverride || theme
  const colorTheme = override === 'light' ? colours.light : colours.dark

  return (
    <View
      {...props}
      style={[{ backgroundColor: colorTheme.fills.main.background }, style]}
    />
  )
}

export default ThemedView

