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

const SynonymChip = ({ word }) => (
  <View style={styles.synonymChip}>
    <Text style={styles.synonymText}>{word}</Text>
  </View>
);

const LearnWordCard = ({ userWord, onTick, onCross }) => {
  const { progress, word } = userWord
  const { word: wordText, examples, definition, wordType, synonyms, antonyms } = word
  const [isPlaying, setIsPlaying] = useState(false)

  const pronounceWord = async () => {
    // ... (pronounceWord function remains unchanged)
  };

  const renderSynonyms = (synonyms) => {
    if (!synonyms || synonyms.length === 0) return null;
    return (
      <View style={styles.synonymsContainer}>
        <Text style={styles.synonymsTitle}>SYNONYMS</Text>
        <View style={styles.synonymsWrapper}>
          {synonyms.map((synonym, index) => (
            <SynonymChip key={index} word={synonym} />
          ))}
        </View>
      </View>
    );
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
        {renderSynonyms(synonyms)}
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
  wordListContainer: {
    marginTop: 10,
  },
  wordListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "grey"
  },
  wordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordListItem: {
    fontSize: 14,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    border: "1px solid grey",
    borderRadius: 28
  },
  synonymsContainer: {
    marginTop: 16,
  },
  synonymsTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#474847',
    marginBottom: 8,
  },
  synonymsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  synonymChip: {
    backgroundColor: 'white',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  synonymText: {
    fontSize: 13,
    color: '#474847',
    fontWeight: '400',
  },
})

export default LearnWordCard