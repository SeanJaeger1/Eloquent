import { useState } from 'react'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { collection, doc, setDoc, serverTimestamp } from '@firebase/firestore'
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native'

import { auth, db } from '../../firebaseConfig'
import palette from '../../palette'
import PrimaryButton from '../buttons/PrimaryButton'

import type { UserCredential } from '@firebase/auth'
import type { CollectionReference, Timestamp } from '@firebase/firestore'
import type { TextStyle, ViewStyle } from 'react-native'

interface UserData {
  uid: string
  email: string
  dateJoined: Timestamp
  skillLevel: string
  nextWords: number[]
}

const AuthFormPage: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isSignUp, setIsSignUp] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleAuth = async (): Promise<void> => {
    try {
      setIsLoading(true)
      if (isSignUp) {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        // Create a Firestore document for the new user
        const userCollection = collection(db, 'users') as CollectionReference<UserData>
        await setDoc(doc(userCollection, userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: email,
          dateJoined: serverTimestamp() as Timestamp,
          skillLevel: '',
          nextWords: [0, 0, 0, 0],
        })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('An unknown error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Create a non-async wrapper function for the onPress handler
  const handlePress = (): void => {
    void handleAuth()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      <Text style={styles.subtitle}>Welcome! 👋</Text>
      <TextInput
        style={styles.input}
        placeholder='Email address'
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        placeholderTextColor='black'
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        placeholderTextColor='black'
        autoCapitalize='none'
      />
      <PrimaryButton
        text={isSignUp ? 'Sign Up' : 'Sign In'}
        onPress={handlePress}
        disabled={isLoading}
      />
      <Pressable onPress={() => setIsSignUp(!isSignUp)} disabled={isLoading}>
        <Text style={[styles.toggleText, isLoading && styles.disabledText]}>
          {isSignUp ? (
            <>
              Already joined?
              <Text style={styles.highlighted}> Sign In</Text>
            </>
          ) : (
            <>
              Don&apos;t have an account?
              <Text style={styles.highlighted}> Sign Up</Text>
            </>
          )}
        </Text>
      </Pressable>
    </View>
  )
}

interface Styles {
  container: ViewStyle
  title: TextStyle
  subtitle: TextStyle
  input: ViewStyle
  toggleText: TextStyle
  highlighted: TextStyle
  disabledText: TextStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'left',
  },
  input: {
    borderRadius: 24,
    padding: 12,
    marginTop: 5,
    height: 64,
    marginBottom: 20,
    color: palette.black,
    backgroundColor: palette.white,
    paddingLeft: 24,
  } as TextStyle,
  toggleText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
  highlighted: {
    color: palette.secondary,
    fontWeight: 'bold',
  },
  disabledText: {
    opacity: 0.5,
  },
})

export default AuthFormPage
