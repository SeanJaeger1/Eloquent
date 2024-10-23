import { useState } from 'react'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@firebase/auth'
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  CollectionReference,
  Timestamp,
} from '@firebase/firestore'
import { View, TextInput, Text, StyleSheet, Pressable, TextStyle, ViewStyle } from 'react-native'

import { auth, db } from '../../firebaseConfig'
import palette from '../../palette'
import PrimaryButton from '../buttons/PrimaryButton'

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

  const handleAuth = async (): Promise<void> => {
    try {
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
    }
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
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        placeholderTextColor='black'
      />
      <PrimaryButton text={isSignUp ? 'Sign Up' : 'Sign In'} onPress={handleAuth} />
      <Pressable onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.toggleText}>
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
  pressable: ViewStyle
  signUpButton: TextStyle
  input: ViewStyle
  toggleText: TextStyle
  highlighted: TextStyle
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
  pressable: {
    backgroundColor: palette.secondary,
    color: 'white',
    borderRadius: 16,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  } as TextStyle,
  signUpButton: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  input: {
    borderRadius: 24,
    padding: 12,
    marginTop: 5,
    height: 64,
    marginBottom: 20,
    color: 'black',
    backgroundColor: 'white',
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
})

export default AuthFormPage