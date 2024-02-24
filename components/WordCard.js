import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Card } from "react-native-elements"
import { Audio } from "expo-av"
import { Icon } from "react-native-elements"
import palette from "../palette"
import shortenType from "../utils/shortenType"
import ProgressMeter from "./ProgressMeter"
import ExampleText from "./ExampleText"

const WordCard = ({ userWord, children }) => {
  const { progress, word } = userWord
  const {
    audioUrl,
    word: wordText,
    examples,
    definition,
    phonetic,
    wordType,
  } = word
  const [sound, setSound] = useState(null)

  async function preloadSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUrl })
    setSound(sound)
  }

  async function playSound() {
    await sound.playAsync()
  }

  useEffect(() => {
    audioUrl && preloadSound()
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [audioUrl])

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        <Text style={styles.word}>{wordText}</Text>
        {audioUrl && (
          <TouchableOpacity onPress={playSound}>
            <Icon name="volume-up" type="font-awesome" color={palette.sound} />
          </TouchableOpacity>
        )}
      </View>
      {progress > 1 && (
        <View style={styles.row}>
          <ProgressMeter value={progress} />
        </View>
      )}
      {phonetic && <Text style={styles.phonetic}>{phonetic}</Text>}
      <Text style={styles.type}>({shortenType[wordType]})</Text>
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
