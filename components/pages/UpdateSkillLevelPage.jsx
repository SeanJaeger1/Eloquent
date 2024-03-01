import { useEffect, useState } from "react"

import { updateDoc, doc } from "firebase/firestore"
import { View, Text, StyleSheet } from "react-native"

import { auth, db } from "../../firebaseConfig"
import PrimaryButton from "../buttons/PrimaryButton"

const UpdateSkillLevelPage = () => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      setUserId(user.uid)
    }
  }, [])

  const setSkillLevel = async (skillLevel) => {
    try {
      if (!userId) {
        throw new Error("User is not authenticated.")
      }

      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        skillLevel,
      })

      console.log(`Updated skill level to ${skillLevel}`)
    } catch (error) {
      console.error("Error updating skill level: ", error)
    }
  }

  if (!userId) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your English level</Text>
      <Text style={styles.subtitle}>Let&apos;s get started! 👋</Text>
      <PrimaryButton
        text={"Beginner"}
        onPress={() => setSkillLevel("beginner")}
      />
      <PrimaryButton
        text={"Intermediate"}
        onPress={() => setSkillLevel("intermediate")}
      />
      <PrimaryButton
        text={"Advanced"}
        onPress={() => setSkillLevel("advanced")}
        style={styles.button}
      />
      <PrimaryButton text={"Expert"} onPress={() => setSkillLevel("expert")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
  },
  button: {
    marginBottom: 18,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 60,
    textAlign: "left",
  },
})

export default UpdateSkillLevelPage
