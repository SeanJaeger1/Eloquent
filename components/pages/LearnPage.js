import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Card } from "react-native-elements"
import { httpsCallable } from "firebase/functions"
import { functions } from "../../firebaseConfig"

const LearnPage = () => {
  const [words, setWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserWords()
  }, [])

  function nextWord() {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      setCurrentWordIndex(0)
    }
  }

  async function fetchUserWords() {
    try {
      setLoading(true)
      const getUserWords = httpsCallable(functions, "getLearningWords")
      const result = await getUserWords()
      const userWords = result.data
      console.log(userWords)
      setWords(userWords)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user words:", error)
      setLoading(false)
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

      nextWord()
    } catch (error) {
      console.error("Error updating/creating user word:", error)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  const currentWord =
    typeof words[currentWordIndex].word === "object"
      ? words[currentWordIndex].word
      : words[currentWordIndex]

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.word}>{currentWord.word}</Text>
        <Text style={styles.type}>{currentWord.type}</Text>
        <Text style={styles.meaning}>{currentWord.meaning}</Text>
        <Text style={styles.example}>{currentWord.example}</Text>
      </Card>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.crossButton]}
          onPress={() => updateOrCreateUserWord(-1)}
        >
          <Text style={styles.buttonText}>✗</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.tickButton]}
          onPress={() => updateOrCreateUserWord(1)}
        >
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

export default LearnPage
