import { colours } from '@/constants/colours'
import { Ellipsis, MapPin } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationIconButton from '../ui/NavigationIconButton'
import ThemedText from '../ui/ThemedText'
import ThemedView from '../ui/ThemedView'

const Header = () => {
  const colorScheme = useColorScheme()
  const headerBackground = colorScheme ? colours[colorScheme] : colours.light
  const foregroundColor = colorScheme ? colours[colorScheme]?.fills?.main?.foreground : colours.light?.fills?.main?.foreground

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, {backgroundColor:  headerBackground?.fills?.main?.background }]}>
      <ThemedView style={styles.container}>
        <View style={styles.locationContainer}>
          <MapPin size={32} color={colours.dark.fills.main.foreground} />
          <View>
            <ThemedText variant='paragraph.small.regular' style={{color: colours.dark.fills.main.description}}>San Ramon, CA</ThemedText>
            <ThemedText variant='heading.small'>My Bedroom</ThemedText>
          </View>
        </View>
        <NavigationIconButton icon={<Ellipsis size={24} color={foregroundColor} />} />
      </ThemedView>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'red',
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