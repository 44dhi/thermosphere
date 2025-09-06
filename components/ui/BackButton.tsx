import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import ThemedText from './ThemedText';

interface BackButtonProps extends PressableProps {
  onPress: () => void,
  themeOverride?: 'dark' | 'light',
}

const BackButton = ({ onPress, themeOverride, ...props }: BackButtonProps) => {
  const navigate = useNavigation()

  const handlePress = () => {
    if (onPress) {
      onPress()
    } else {
      navigate.goBack()
    }
  }
  
  return (
    <Pressable
      onPress={handlePress || undefined}
      style={({ pressed }) => [styles.container,  pressed && styles.containerHover]}
      {...props}
    >
      <View style={styles.content}>
      <Entypo name="chevron-left" style={{marginTop: 3}} size={24} color="white" />
        <ThemedText themeOverride={themeOverride} variant='paragraph.large.bold'>Back</ThemedText>
      </View>
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 32,

  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  containerHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
})
