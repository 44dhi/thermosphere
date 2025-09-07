import { colours } from '@/constants/colours';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface OnboardingTextInputProps extends TextInputProps {
  themeOverride?: 'dark' | 'light';
}

const OnboardingTextInput = ({ themeOverride, ...props }: OnboardingTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        props.style,
        { borderColor: isFocused ? colours.dark.primary.foreground : 'rgba(244, 244, 245, 0.24)' },
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholderTextColor={'rgba(244, 244, 245, 0.48)'}
    />
  );
};

export default OnboardingTextInput;

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
});
