import React, { useState } from "react"
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { collection, doc, setDoc, serverTimestamp } from "@firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth"
import { auth, db } from "../../firebaseConfig"
import palette from "../../palette"

const AuthFormPage = () => {
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

        // Create a Firestore document for the new user
        await setDoc(doc(collection(db, "users"), userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: email,
          dateJoined: serverTimestamp(),
          skillLevel: "",
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
      <Text style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</Text>
      <Text style={styles.subtitle}>Welcome! 👋</Text>
      <TextInput
        style={styles.input}
        placeholder="Email address"
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholderTextColor="black"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholderTextColor="black"
      />
      <TouchableOpacity style={styles.newClass} onPress={handleAuth}>
        <Text style={{ color: "white", fontWeight: 600 }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
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
  newClass: {
    backgroundColor: palette.secondary,
    color: "white",
    borderRadius: 16,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: 24,
    padding: 12,
    marginTop: 5,
    height: 64,
    marginBottom: 20,
    color: "black",
    color: "#000",
    backgroundColor: "white",
  },
  toggleText: { textAlign: "center", marginTop: 32, fontSize: 14 },
  highlighted: {
    color: palette.secondary,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default AuthFormPage
