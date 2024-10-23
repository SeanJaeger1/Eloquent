import { useEffect, useState } from 'react'

import { View, Text, StyleSheet, ViewStyle } from 'react-native'

import { auth } from '../../firebaseConfig'
import useSetSkillLevel from '../../hooks/useSetSkillLevel'
import PrimaryButton from '../buttons/PrimaryButton'

type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

const UpdateSkillLevelPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null)
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

  const handleSetSkillLevel = (level: SkillLevel): void => {
    setSkillLevel(level)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your English level</Text>
      <Text style={styles.subtitle}>Let&apos;s get started! 👋</Text>
      <PrimaryButton text='Beginner' onPress={() => handleSetSkillLevel('beginner')} />
      <PrimaryButton text='Intermediate' onPress={() => handleSetSkillLevel('intermediate')} />
      <PrimaryButton
        text='Advanced'
        onPress={() => handleSetSkillLevel('advanced')}
        style={styles.button}
      />
      <PrimaryButton text='Expert' onPress={() => handleSetSkillLevel('expert')} />
    </View>
  )
}

interface Styles {
  container: ViewStyle
  button: ViewStyle
  buttonText: ViewStyle
  title: ViewStyle
  subtitle: ViewStyle
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
  buttonText: {
    fontSize: 24,
    color: 'white',
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
