import { useEffect, useState } from 'react'

import { View, Text, StyleSheet, Alert } from 'react-native'

import { auth } from '../../firebaseConfig'
import useSetSkillLevel from '../../hooks/useSetSkillLevel'
import PrimaryButton from '../buttons/PrimaryButton'

import type { SkillLevel } from '../../types/user'
import type { ViewStyle, TextStyle } from 'react-native'

const UpdateSkillLevelPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const setSkillLevel = useSetSkillLevel()

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      setUserId(user.uid)
    }
  }, [])

  if (!userId) {
    return null
  }

  const handleSetSkillLevel = async (level: SkillLevel): Promise<void> => {
    try {
      setIsUpdating(true)
      await setSkillLevel(level)
      Alert.alert('Success', 'Your skill level has been updated!')
    } catch (error) {
      Alert.alert('Error', 'Failed to update skill level. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your English level</Text>
      <Text style={styles.subtitle}>Let&apos;s get started! 👋</Text>
      <PrimaryButton
        text='Beginner'
        onPress={() => void handleSetSkillLevel('beginner')}
        style={styles.button}
        disabled={isUpdating}
      />
      <PrimaryButton
        text='Intermediate'
        onPress={() => void handleSetSkillLevel('intermediate')}
        style={styles.button}
        disabled={isUpdating}
      />
      <PrimaryButton
        text='Advanced'
        onPress={() => void handleSetSkillLevel('advanced')}
        style={styles.button}
        disabled={isUpdating}
      />
      <PrimaryButton
        text='Expert'
        onPress={() => void handleSetSkillLevel('expert')}
        style={styles.button}
        disabled={isUpdating}
      />
    </View>
  )
}

interface Styles {
  container: ViewStyle
  button: ViewStyle
  title: TextStyle
  subtitle: TextStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  button: {
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 60,
    textAlign: 'left',
  },
})

export default UpdateSkillLevelPage
