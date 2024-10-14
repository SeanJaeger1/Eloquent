import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native"
import { Card } from "react-native-elements"
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import Constants from 'expo-constants'

import capitalizeFirstLetter from "../utils/capitalizeFirstLetter"
import ExampleText from "./ExampleText"
import ProgressMeter from "./ProgressMeter"
import palette from "../palette"

const GOOGLE_TTS_API_KEY = Constants.expoConfig.extra.GOOGLE_TEXT_SPEECH_API_KEY;

const LearnWordCard = ({ userWord, onTick, onCross }) => {
  const { progress, word } = userWord
  const { word: wordText, examples, definition, wordType } = word
  const [isPlaying, setIsPlaying] = useState(false)

  const pronounceWord = async () => {
    setIsPlaying(true)
    try {
      const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text: wordText },
          voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
          audioConfig: { audioEncoding: 'MP3' },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const audioContent = data.audioContent;
      const audioUri = `data:audio/mp3;base64,${audioContent}`;
      
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Error pronouncing word:', error);
      setIsPlaying(false);
    }
  };

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.word}>{wordText}</Text>
          <TouchableOpacity onPress={pronounceWord} disabled={isPlaying}>
            <Ionicons 
              name={isPlaying ? "volume-high" : "volume-high-outline"} 
              size={24} 
              color={isPlaying ? palette.lightGrey : "black"} 
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.type}>({capitalizeFirstLetter(wordType)})</Text>
        <View style={styles.row}>
          <ProgressMeter value={progress} />
        </View>
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
