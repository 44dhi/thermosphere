import { colours } from '@/constants/colours'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import ThemedText from '../ui/ThemedText'

const ProfileCard = () => {
  const colorScheme = useColorScheme();
  const {settings, fills} = colorScheme === 'dark' ? colours.dark : colours.light;
 
  return (
    <View style={[styles.mainCard, { backgroundColor: settings.settingItem.background }]}>
    <Image
      source={require('@/assets/images/default_profile_image.png')}
      style={{ width: 48, height: 48 }}
      contentFit="contain"
    />
    <View style={{ gap: 7 }}>
      <ThemedText variant="heading.small">Aadhit Shanmugam</ThemedText>
      <ThemedText style={{ color: fills.main.description }} variant="paragraph.small.regular">
        aadhit32973@gmail.com
      </ThemedText>
    </View>
  </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  mainCard: {
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
})