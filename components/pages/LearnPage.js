import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { httpsCallable } from "firebase/functions"
import { functions } from "../../firebaseConfig"
import LoadingPage from "./LoadingPage"
import WordCard from "../WordCard"
import Background from "../Background"

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
      fetchUserWords()
      setCurrentWordIndex(0)
    }
  }

  async function fetchUserWords() {
    try {
      setLoading(true)
      const getUserWords = httpsCallable(functions, "getLearningWords")
      const result = await getUserWords()
      const userWords = result.data
      setWords(userWords)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user words:", error)
      setLoading(false)
    }
  }

  async function updateWordProgress(increment) {
    try {
      setTimeout(() => {
        nextWord()
      }, 500)
      const updateWordProgress = httpsCallable(functions, "updateWordProgress")

      await updateWordProgress({
        userWordId: words[currentWordIndex].id,
        increment,
      })
    } catch (error) {
      console.error("Error updating/creating user word:", error)
    }
  }

  if (loading) {
    return (
      <Background>
        <LoadingPage />
      </Background>
    )
  }

  return (
    <Background>
      <View style={styles.container}>
        <WordCard userWord={words[currentWordIndex]}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.crossButton]}
              onPress={() => updateWordProgress(-1)}
            >
              <Text style={styles.buttonText}>✗</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.tickButton]}
              onPress={() => updateWordProgress(1)}
            >
              <Text style={styles.buttonText}>✓</Text>
            </TouchableOpacity>
          </View>
        </WordCard>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
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
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderTop: "1px solid grey",
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  crossButton: {},
  tickButton: {},
  buttonText: {
    fontSize: 36,
    color: "#A3A3A3",
  },
})

export default LearnPage
