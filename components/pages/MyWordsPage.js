import React, { useState } from "react"
import { View, ScrollView, StyleSheet, Text } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import SearchBox from "../SearchBox"
import WordPanel from "../WordPanel"
import { httpsCallable } from "firebase/functions"
import { functions } from "../../firebaseConfig"
import LoadingPage from "./LoadingPage"
import Background from "../Background"

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
    return (
      <Background>
        <LoadingPage />
      </Background>
    )
  }

  const filteredWords = words.filter(({ word: { word } }) =>
    word.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <Background>
      <View style={styles.container}>
        <SearchBox
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          placeholder="Search my words..."
          style={styles.searchBar}
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
    </Background>
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
    padding: 8,
    paddingBottom: 148,
  },
  searchBar: {
    backgroundColor: "white",
    padding: 8,
  },
})

export default MyWordsPage
