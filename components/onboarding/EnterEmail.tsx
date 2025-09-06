import OnboardingButton from '@/components/ui/OnboardingButton'
import OnboardingTextInput from '@/components/ui/OnboardingTextInput'
import ThemedText from '@/components/ui/ThemedText'
import { colours } from '@/constants/colours'
import { emailRegex } from '@/constants/regex'
import { setUserEmail } from '@/utils/storage'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import BackButton from '../ui/BackButton'

interface EnterEmailProps {
  setActiveStep: (step: number) => void
  setDirection: (direction: 'left' | 'right') => void
}

const EnterEmail = ({ setActiveStep, setDirection }: EnterEmailProps) => {
  const [email, setEmail] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  function handleChangeEmail(text: string) {
    setEmail(text.trim().toLowerCase())
    setDisabled(!emailRegex.test(text))
  }

  async function onPress() {
    try {
      setLoading(true)
      setUserEmail(email)
      setTimeout(() => {
        setLoading(false)
        router.push('/(tabs)/thermostat')
      }, 3000)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 32}
    >
      <View style={styles.navigation}>
        <BackButton onPress={() => {
          setDirection('left')
          setActiveStep(0)
        }} themeOverride='dark' />
      </View>
      <View style={styles.contentContainer}>
       <View style={styles.textContainer}>
          <ThemedText themeOverride='dark' variant='heading.x-large'>Enter Your Email</ThemedText>
          <ThemedText themeOverride='dark' style={{ color: colours.dark.fills.main.description }} variant='paragraph.large.regular'>
            Get Started With ThermoSphere
          </ThemedText>
          <View style={styles.textInputContainer}>
            <OnboardingTextInput 
              autoFocus
              keyboardType='email-address'
              autoCapitalize='none'
              autoComplete='email'
              value={email}
              onChangeText={handleChangeEmail}
              placeholder='Enter your email' 
              style={styles.textInput}
              placeholderTextColor={colours.dark.fills.main.description}
            />
          </View>
        </View>
        <OnboardingButton disabled={disabled || loading} title={loading ? 'Signing In...' : 'Continue'} themeOverride='dark' onPress={onPress} />
      </View>
    </KeyboardAvoidingView>
  )
}

export default EnterEmail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 3,
    paddingBottom: 32,
  },
  navigation: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 120,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    gap: 48,
    zIndex: 3,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 12,
    textAlign: 'center',
    alignItems: 'center'
  },
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    maxHeight: 44,
    marginTop: 16,
  },
  textInput: {
    width: '100%',
    flex: 1,
  },
})