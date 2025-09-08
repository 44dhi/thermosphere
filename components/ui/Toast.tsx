import { colours } from '@/constants/colours';
import { CheckIcon, InfoIcon, XIcon } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';
import ThemedText from './ThemedText';

interface ToastProps {
  text1: string;
  props: any;
}

const Toast = ({ text1, props }: ToastProps) => {
  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === 'dark' ? colours.dark : colours.light;

  function renderIcon() {
    switch (props.type) {
      case 'success':
        return <CheckIcon size={24} color={'lightgreen'} strokeWidth={3} />;
      case 'error':
        return <XIcon size={24} color={'red'} strokeWidth={3} />;
      case 'info':
        return <InfoIcon size={24} color={colorTheme.primary.foreground} strokeWidth={2} />;
      default:
        return null;
    }
  }

  return (
    <View
      style={[
        styles.container,
        props.position === 'bottom' && { bottom: 0 },
        { backgroundColor: colorTheme.toast.background },
        { borderColor: colorTheme.toast.border },
      ]}
    >
      {renderIcon()}
      <ThemedText style={{ color: colorTheme.fills.main.foreground }} variant="paragraph.large.regular">
        {text1}
      </ThemedText>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    maxWidth: 300,
    borderRadius: 32,
    padding: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    ...(Platform.OS === 'ios'
      ? {
          backdropFilter: 'blur(16px)',
        }
      : {
          backdropFilter: 'blur(16px)',
        }),
  },
});
