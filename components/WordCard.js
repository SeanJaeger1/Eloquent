import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Card } from "react-native-elements"
import { Icon } from "react-native-elements"
import palette from "../palette"
import shortenType from "../utils/shortenType"
import ProgressMeter from "./ProgressMeter"
import ExampleText from "./ExampleText"
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter"

const WordCard = ({ userWord, children }) => {
  const { progress, word } = userWord
  const { word: wordText, examples, definition, wordType } = word

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        <Text style={styles.word}>{wordText}</Text>
      </View>
      <Text style={styles.type}>({capitalizeFirstLetter(wordType)})</Text>
      {progress > 1 && (
        <View style={styles.row}>
          <ProgressMeter value={progress} />
        </View>
      )}
      <Text style={styles.meaning}>{definition}</Text>
      <ExampleText text={examples[0]} />
      {children}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "calc(100% - 56px)",
    alignItems: "left",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 28,
    paddingTop: 28,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "left",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
    marginBottom: 8,
  },
  type: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "left",
    color: "grey",
  },
  meaning: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
    marginBottom: 24,
  },
  example: {
    fontSize: 14,
    marginTop: 24,
    color: "gray",
    textAlign: "left",
  },
  phonetic: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginVertical: 16,
    justifyContent: "left",
  },
})

export default WordCard
