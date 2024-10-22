import { useState } from 'react'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { collection, doc, setDoc, serverTimestamp } from '@firebase/firestore'
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native'

import { auth, db } from '../../firebaseConfig'
import palette from '../../palette'
import PrimaryButton from '../buttons/PrimaryButton'

const AuthFormPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        // Create a Firestore document for the new user
        await setDoc(doc(collection(db, 'users'), userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: email,
          dateJoined: serverTimestamp(),
          skillLevel: '',
          nextWords: [0, 0, 0, 0],
        })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      <Text style={styles.subtitle}>Welcome! 👋</Text>
      <TextInput
        style={styles.input}
        placeholder='Email address'
        onChangeText={text => setEmail(text)}
        value={email}
        placeholderTextColor='black'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
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
              Don't have an account?
              <Text style={styles.highlighted}> Sign Up</Text>
            </>
          )}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  signUpButton: {
    color: 'white',
    fontWeight: 600,
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
  },
  toggleText: { textAlign: 'center', marginTop: 16, fontSize: 16 },
  highlighted: {
    color: palette.secondary,
    fontWeight: 'bold',
  },
})

export default AuthFormPage
