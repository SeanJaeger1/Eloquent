import React, { useState } from "react"
import { View, ScrollView, StyleSheet, Text } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import SearchBox from "../SearchBox"
import WordPanel from "../WordPanel"
import { httpsCallable } from "firebase/functions"
import { functions } from "../../firebaseConfig"
import LoadingPage from "./LoadingPage"

const MyWordsPage = () => {
  const [searchText, setSearchText] = useState("")
  const [words, setWords] = useState(null)

  useFocusEffect(
    React.useCallback(() => {
      fetchUserWords()
    }, [])
  )

  async function fetchUserWords() {
    try {
      const getUserWords = httpsCallable(functions, "getUserWords")
      const result = await getUserWords()
      const userWords = result.data
      const sortingAlgo = (a, b) => a.word.word.localeCompare(b.word.word)
      userWords.sort(sortingAlgo)
      setWords(userWords)
    } catch (error) {
      console.error("Error fetching user words:", error)
    }
  }

  if (words === null) {
    return <LoadingPage />
  }

  const filteredWords = words.filter(
    ({ word: { word } }) => word.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <SearchBox
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        placeholder="Search my words..."
      />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {filteredWords.length > 0 ? (
          filteredWords.map((word, index) => (
            <WordPanel key={index} userWord={word} />
          ))
        ) : (
          <Text style={styles.noWordsText}>
            You don't have any words yet! Start learning new words.
          </Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  noWordsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  }
})

export default MyWordsPage
