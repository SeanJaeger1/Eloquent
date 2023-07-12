import React from "react"
import { Text, StyleSheet } from "react-native"
import { Card } from "react-native-elements"

const WordCard = ({ word }) => {
  return (
    <Card containerStyle={styles.card}>
      <Text style={styles.word}>{word.word}</Text>
      <Text style={styles.type}>{word.wordType}</Text>
      <Text style={styles.meaning}>{word.definition}</Text>
      <Text style={styles.example}>{word.examples[0]}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
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
  }
})

export default WordCard
