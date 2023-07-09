import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import ProgressMeter from "./ProgressMeter"

const WordPanel = ({ userWord }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { word, progress } = userWord
  const { type, meaning } = word

  const handlePress = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.boldText}>{word.word}</Text>
        <View style={styles.row}>
          <ProgressMeter value={progress} />
        </View>
        <View style={styles.row}>
          <Text>{meaning}</Text>
        </View>
        {isExpanded && (
          <View style={styles.row}>
            <Text>{type}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
})

export default WordPanel
