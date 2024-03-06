import { View, Text, StyleSheet, Pressable } from "react-native"
import { Card } from "react-native-elements"

import capitalizeFirstLetter from "../utils/capitalizeFirstLetter"

import ExampleText from "./ExampleText"
import ProgressMeter from "./ProgressMeter"
import palette from "../palette"

const LearnWordCard = ({ userWord, onTick, onCross }) => {
  const { progress, word } = userWord
  const { word: wordText, examples, definition, wordType } = word

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.infoContainer}>
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
        {examples.length > 0 && <ExampleText text={examples[0]} />}
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[styles.button, styles.crossButton]}
          onPress={onCross}
        >
          <Text style={styles.buttonText}>✗</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.tickButton]} onPress={onTick}>
          <Text style={styles.buttonText}>✓</Text>
        </Pressable>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "left",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: palette.lightGrey,
    borderTopStyle: "solid",
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
    color: palette.lightGrey,
  },
  meaning: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginVertical: 16,
    justifyContent: "left",
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    paddingHorizontal: 28,
  },
  crossButton: { borderRight: "1px solid grey" },
  tickButton: {},
  buttonText: {
    fontSize: 36,
    color: palette.lightGrey,
    width: "100%",
    textAlign: "center",
  },
})

export default LearnWordCard
