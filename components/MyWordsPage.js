import React, { useState, useEffect } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import SearchBox from "./SearchBox"
import WordPanel from "./WordPanel"
import { httpsCallable } from "firebase/functions"
import { functions } from "../firebaseConfig"

const MyWordsPage = () => {
  const [searchText, setSearchText] = useState("")
  const [words, setWords] = useState([])

  useEffect(() => {
    fetchUserWords()
  }, [])

  async function fetchUserWords() {
    try {
      const getUserWords = httpsCallable(
        functions,
        "getUserWordsWithOriginalWords"
      )
      const result = await getUserWords()
      const userWords = result.data
      const wordsData = userWords.map(({ word }) => word)
      setWords(wordsData)
    } catch (error) {
      console.error("Error fetching user words:", error)
    }
  }

  const filteredWords = words.filter(({ word }) =>
    word.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <SearchBox
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        placeholder="Search my words..."
      />
      <ScrollView>
        {filteredWords.map(({ word, type, meaning, example }, index) => (
          <WordPanel
            key={index}
            word={word}
            type={type}
            meaning={meaning}
            example={example}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
})

export default MyWordsPage
