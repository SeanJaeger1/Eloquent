import React, { useState } from "react"
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import "firebase/compat/auth"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth"
import { auth } from "../firebaseConfig"

export default function AuthForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(true)

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        await updateProfile(userCredential.user, { displayName: name })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</Text>
      <Text style={styles.subtitle}>Welcome! 👋</Text>
      {isSignUp && (
        <View style={styles.inputContainer}>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            onChangeText={(text) => setName(text)}
            value={name}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <Button title={isSignUp ? "Sign Up" : "Sign In"} onPress={handleAuth} />
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.toggleText}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    marginTop: 5,
    height: 40,
  },
  toggleText: {},
})
