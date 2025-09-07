import { colours } from '@/constants/colours';
import { textStyles, TextVariants } from '@/constants/textStyles';
import React from 'react';
import { StyleProp, Text, TextProps, TextStyle, useColorScheme } from 'react-native';

interface ThemedTextProps extends TextProps {
  themeOverride?: 'light' | 'dark';
  variant?: TextVariants;
  style?: StyleProp<TextStyle>;
}

const ThemedText = ({ themeOverride, variant = 'paragraph.large.regular', style, ...props }: ThemedTextProps) => {
  const theme = useColorScheme();
  const override = themeOverride || theme;
  const colorTheme = override === 'light' ? colours.light : colours.dark;

  return <Text {...props} style={[{ ...textStyles[variant], color: colorTheme.fills.main.foreground }, style]} />;
};

export default ThemedText;
