import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Card } from "react-native-elements"
import { Audio } from 'expo-av'
import { Icon } from "react-native-elements"
import palette from "../palette"
import shortenType from "../utils/shortenType"

const WordCard = ({word}) => {
  const {audioUrl} = word
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
    preloadSound()
    return sound
      ? () => {
        sound.unloadAsync()
      }
      : undefined
  }, [audioUrl])

  console.log(word.phonetic)

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        <Text style={styles.word}>{word.word}</Text>
        {audioUrl && (
          <TouchableOpacity onPress={playSound}>
            <Icon name='volume-up' type='font-awesome' color={palette.secondary} />
          </TouchableOpacity>
        )}
      </View>
      {word.phonetic && <Text style={styles.phonetic}>{word.phonetic}</Text>}
      <Text style={styles.type}>{shortenType[word.wordType]}</Text>
      <Text style={styles.meaning}>{word.definition}</Text>
      <Text style={styles.example}>{word.examples[0]}</Text>
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
  }
})

export default WordCard
