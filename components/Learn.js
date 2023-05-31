import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Card } from "react-native-elements"
import { httpsCallable } from "firebase/functions"
import { functions } from "../firebaseConfig"

const Learn = () => {
  const [word, setWord] = useState(null) // Set initial state to null
  const [progress, setProgress] = useState(1)
  const [words, setWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    fetchUserWords()
  }, [])

  function nextWord() {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // Show a message indicating no more words or loop back to the first word
      setCurrentWordIndex(0)
    }
  }

  async function fetchUserWords() {
    try {
      setLoading(true) // Start loading before fetch
      const getUserWords = httpsCallable(functions, "getLearningWords")
      const result = await getUserWords()
      const userWords = result.data
      console.log(userWords)
      setWords(userWords)
      setWord(wordsData[0]) // Set the initial word
      setLoading(false) // Finish loading after fetch
    } catch (error) {
      console.error("Error fetching user words:", error)
      setLoading(false) // Finish loading even in case of an error
    }
  }

  async function updateOrCreateUserWord(increment) {
    try {
      const updateOrCreateUserWord = httpsCallable(
        functions,
        "updateWordProgress"
      )

      const result = await updateOrCreateUserWord({
        userWordId: words[currentWordIndex].id,
        increment,
      })

      console.log(result.data)

      // Update the progress state with the returned progress value
      setProgress(result.data.progress)

      // Go to the next word
      nextWord()
    } catch (error) {
      console.error("Error updating/creating user word:", error)
    }
  }

  // Other functions remain the same...

  if (loading) {
    // Render loading state
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  console.log("words", words)

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.word}>{words[currentWordIndex].word}</Text>
        <Text style={styles.type}>{words[currentWordIndex].type}</Text>
        <Text style={styles.meaning}>{words[currentWordIndex].meaning}</Text>
        <Text style={styles.example}>{words[currentWordIndex].example}</Text>
      </Card>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.crossButton]}
          onPress={() => updateOrCreateUserWord(-1)} // Decrement progress
        >
          <Text style={styles.buttonText}>✗</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.tickButton]}
          onPress={() => updateOrCreateUserWord(1)} // Increment progress
        >
          <Text style={styles.buttonText}>✓</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.progressText}>Progress: {progress}</Text>
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
  progressText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default Learn
