import { colours } from '@/constants/colours'
import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

interface OnboardingTextInputProps extends TextInputProps {
  themeOverride?: 'dark' | 'light'
}

const OnboardingTextInput = ({ themeOverride, ...props }: OnboardingTextInputProps) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      focusable={true}
      placeholderTextColor={'rgba(244, 244, 245, 0.48)'}
    />
  )
}

export default OnboardingTextInput

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(244, 244, 245, 0.24)',
    borderRadius: 12,
    textAlign: 'left',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(244, 244, 245, 0.06)',
    color: colours.dark.fills.main.foreground,
    fontSize: 16,
    fontFamily: 'Geist',
  },
})
