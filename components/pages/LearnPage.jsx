import { useState, useEffect } from "react"

import { httpsCallable } from "firebase/functions"
import { View, StyleSheet } from "react-native"

import { functions } from "../../firebaseConfig"
import LearnWordCard from "../LearnWordCard"
import ProgressBar from "../ProgressBar"

import LoadingPage from "./LoadingPage"
import TransleucentButton from "../buttons/TranslucentButton"
import useSetSkillLevel from "../../hooks/useSetSkillLevel"
import useUser from "../../hooks/useUser"
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter"

const LearnPage = () => {
  const [words, setWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const user = useUser()

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

  if (user?.skillLevel === undefined) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TransleucentButton
          text={capitalizeFirstLetter(user?.skillLevel)}
          onPress={() => {
            useSetSkillLevel("")
          }}
        />
      </View>
      {loading ? (
        <LoadingPage />
      ) : (
        <View style={styles.cardContainer}>
          <ProgressBar currentIndex={currentWordIndex} totalCount={5} />
          <LearnWordCard
            userWord={words[currentWordIndex]}
            onTick={() => updateWordProgress(1)}
            onCross={() => updateWordProgress(-1)}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: 28,
    right: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: 28,
    right: 24,
  },
  cardContainer: {
    width: "90%", // Or set to the exact width of LearnWordCard if it's defined
    alignItems: "center", // Ensure the ProgressBar and LearnWordCard are aligned
  },
})

export default LearnPage
