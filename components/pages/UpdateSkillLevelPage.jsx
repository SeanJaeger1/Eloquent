import { useEffect, useState } from 'react'

import { View, Text, StyleSheet } from 'react-native'

import { auth } from '../../firebaseConfig'
import PrimaryButton from '../buttons/PrimaryButton'
import useSetSkillLevel from '../../hooks/useSetSkillLevel'

const UpdateSkillLevelPage = () => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      setUserId(user.uid)
    }
  }, [])

  if (!userId) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your English level</Text>
      <Text style={styles.subtitle}>Let&apos;s get started! 👋</Text>
      <PrimaryButton text={'Beginner'} onPress={() => useSetSkillLevel('beginner')} />
      <PrimaryButton text={'Intermediate'} onPress={() => useSetSkillLevel('intermediate')} />
      <PrimaryButton
        text={'Advanced'}
        onPress={() => useSetSkillLevel('advanced')}
        style={styles.button}
      />
      <PrimaryButton text={'Expert'} onPress={() => useSetSkillLevel('expert')} />
    </View>
  )
}

const styles = StyleSheet.create({
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
