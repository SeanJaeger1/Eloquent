import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Card } from "react-native-elements"
import { functions } from "../firebaseConfig"
import { httpsCallable } from "firebase/functions"

const Learn = () => {
  const word = {
    word: "Example",
    type: "noun",
    meaning: "A representative instance",
    example: "This is an example sentence.",
  }

  async function fetchWordDetails() {
    try {
      const getUserWords = httpsCallable(functions, "getLearningWords")
      const result = await getUserWords()
      console.log(result.data)
    } catch (error) {
      console.error("Error fetching word details:", error)
    }
  }

  // Replace with an actual word ID
  fetchWordDetails()

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.word}>{word.word}</Text>
        <Text style={styles.type}>{word.type}</Text>
        <Text style={styles.meaning}>{word.meaning}</Text>
        <Text style={styles.example}>{word.example}</Text>
      </Card>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.crossButton]}>
          <Text style={styles.buttonText}>✗</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.tickButton]}>
          <Text style={styles.buttonText}>✓</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
  },
  type: {
    fontSize: 18,
    fontStyle: "italic",
  },
  meaning: {
    fontSize: 16,
    marginTop: 10,
  },
  example: {
    fontSize: 14,
    marginTop: 5,
    color: "gray",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  crossButton: {
    backgroundColor: "red",
  },
  tickButton: {
    backgroundColor: "green",
  },
  buttonText: {
    fontSize: 36,
    color: "white",
  },
})

export default Learn
