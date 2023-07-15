import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Card } from "react-native-elements"
import { Audio } from 'expo-av'
import { Icon } from "react-native-elements"
import palette from "../palette"
import shortenType from "../utils/shortenType"
import ProgressMeter from "./ProgressMeter"

const WordCard = ({ userWord }) => {
  const { progress, word } = userWord
  const { audioUrl, word: wordText, examples, definition, phonetic, wordType } = word
  const [sound, setSound] = useState(null)

  async function preloadSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUrl }
    )
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
            <Icon name='volume-up' type='font-awesome' color={palette.secondary} />
          </TouchableOpacity>
        )}
      </View>
      {progress > 1 && <View style={styles.row}>
        <ProgressMeter value={progress} />
      </View>}
      {phonetic && <Text style={styles.phonetic}>{phonetic}</Text>}
      <Text style={styles.type}>{shortenType[wordType]}</Text>
      <Text style={styles.meaning}>{definition}</Text>
      <Text style={styles.example}>{examples[0]}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8
  },
  type: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
  },
  meaning: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  example: {
    fontSize: 14,
    marginTop: 5,
    color: "gray",
    textAlign: "center",
  },
  phonetic: {
    fontSize: 12,
    marginTop: 0,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center"
  }
})

export default WordCard
