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
      const getUserWords = httpsCallable(functions, "getUserWords")
      const result = await getUserWords()
      const userWords = result.data
      console.log(userWords)
      const wordsData = userWords.map(({ word }) => word)
      setWords(wordsData)
    } catch (error) {
      console.error("Error fetching user words:", error)
    }
  }

  const filteredWords = words.filter(({ word }) =>
    word.toLowerCase().includes(searchText.toLowerCase())
  )

  return words.length === 0 ? null : (
    <View style={styles.container}>
      <SearchBox
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        placeholder="Search my words..."
      />
      <ScrollView>
        {filteredWords.map((word, index) => (
          <WordPanel key={index} word={word} />
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
