import React, { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import SearchBox from "./SearchBox"
import WordPanel from "./WordPanel"

const MyWordsPage = () => {
  const [searchText, setSearchText] = useState("")
  const [words] = useState([
    {
      word: "Ambiguous",
      type: "adjective",
      meaning: "Open to more than one interpretation; having a double meaning",
      example:
        "The ambiguous wording of the contract led to a dispute between the parties.",
    },
    {
      word: "Disseminate",
      type: "verb",
      meaning: "To spread or disperse information, knowledge, etc., widely",
      example:
        "The internet has made it easy to disseminate information quickly.",
    },
    {
      word: "Ephemeral",
      type: "adjective",
      meaning: "Lasting for a very short time",
      example: "The beauty of a sunset is ephemeral, as it fades quickly.",
    },
    {
      word: "Ineffable",
      type: "adjective",
      meaning: "Too great or extreme to be expressed or described in words",
      example: "The view of the mountain was so beautiful, it was ineffable.",
    },
    {
      word: "Meticulous",
      type: "adjective",
      meaning: "Showing great attention to detail; very careful and precise",
      example:
        "She was meticulous in her research, ensuring every fact was accurate.",
    },
    {
      word: "Quintessential",
      type: "adjective",
      meaning:
        "Representing the most perfect or typical example of a quality or class",
      example:
        "The movie was the quintessential romantic comedy, filled with laughter and tears.",
    },
  ])

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
