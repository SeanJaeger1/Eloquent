import React, { useState } from "react"

import { useFocusEffect } from "@react-navigation/native"
import { httpsCallable } from "firebase/functions"
import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native"

import { functions } from "../../firebaseConfig"
import WordPanel from "../WordPanel"

import LoadingPage from "./LoadingPage"

const MyWordsPage = () => {
  const [searchText, setSearchText] = useState("")
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [nextPageToken, setNextPageToken] = useState(null)

  useFocusEffect(
    React.useCallback(() => {
      fetchUserWords()
    }, [])
  )

  const handleScroll = (event) => {
    if (loading) {
      return
    }
    const offsetY = event.nativeEvent.contentOffset.y
    const contentHeight = event.nativeEvent.contentSize.height
    const height = event.nativeEvent.layoutMeasurement.height
    const bottom = offsetY + height
    const threshold = 20 // fetch more items when within 20px of the bottom

    if (bottom > contentHeight - threshold) {
      fetchUserWords()
    }
  }

  async function fetchUserWords() {
    if (!nextPageToken && words.length !== 0) {
      return // All pages have been loaded
    }
    try {
      setLoading(true)
      const getUserWords = httpsCallable(functions, "getUserWords")
      const result = await getUserWords({ lastSeenAt: nextPageToken })
      const { userWords, nextPageToken: newToken } = result.data
      // const sortingAlgo = (a, b) => a.word.word.localeCompare(b.word.word)
      // userWords.sort(sortingAlgo)
      setWords([...words, ...userWords])
      setNextPageToken(newToken)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user words:", error)
      setLoading(false)
    }
  }

  if (loading && words.length === 0) {
    return <LoadingPage />
  }

  const filteredWords = words.filter(({ word: { word } }) =>
    word.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search my words..."
        placeholderTextColor="#000"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />

      <ScrollView
        style={styles.scroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
      >
        {filteredWords.length > 0 ? (
          filteredWords.map((word, index) => (
            <WordPanel key={index} userWord={word} />
          ))
        ) : (
          <Text style={styles.noWordsText}>
            You don't have any words yet! Start learning new words.
          </Text>
        )}
        {loading && <LoadingPage />}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  noWordsText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  scroll: {
    paddingBottom: 148,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    paddingLeft: 24,
  },
})

export default MyWordsPage
