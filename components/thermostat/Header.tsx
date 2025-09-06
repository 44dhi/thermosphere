import { colours } from '@/constants/colours'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PinOutlined from '../icons/PinOutlined'
import ThemedText from '../ui/ThemedText'
import ThemedView from '../ui/ThemedView'

const Header = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.locationContainer}>
          <PinOutlined />
          <View>
            <ThemedText variant='paragraph.small.regular' style={{color: colours.dark.fills.main.description}}>San Ramon, CA</ThemedText>
            <ThemedText variant='heading.small'>My Bedroom</ThemedText>
          </View>
        </View>
        <View>
          <Text>asdl</Text>
        </View>
      </ThemedView>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationTextContainer: {
    flexDirection: 'column',
  },
})