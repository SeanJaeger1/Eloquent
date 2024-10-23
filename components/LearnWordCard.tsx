import React, { useState } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { Audio, AVPlaybackStatus } from 'expo-av'
import Constants from 'expo-constants'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'

import palette from '../palette'
import { UserWord } from '../types/words'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

import ExampleText from './ExampleText'
import ProgressMeter from './ProgressMeter'

// Access manifest extra values correctly in newer Expo versions
const manifestExtra = Constants.manifest?.extra || Constants.manifest2?.extra || {}
const GOOGLE_TTS_API_KEY = manifestExtra.GOOGLE_TEXT_SPEECH_API_KEY || ''

interface WordChipProps {
  word: string
}

interface LearnWordCardProps {
  userWord: UserWord
  onTick: () => void
  onCross: () => void
}

const WordChip: React.FC<WordChipProps> = ({ word }) => (
  <View style={styles.wordChip}>
    <Text style={styles.wordChipText}>{word}</Text>
  </View>
)

const LearnWordCard: React.FC<LearnWordCardProps> = ({ userWord, onTick, onCross }) => {
  const { progress, word } = userWord
  const { word: wordText, examples, definition, wordType, synonyms } = word
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const pronounceWord = async (): Promise<void> => {
    setIsPlaying(true)
    try {
      if (!GOOGLE_TTS_API_KEY) {
        throw new Error('Google TTS API key not found')
      }

      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: { text: wordText },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const audioContent = data.audioContent
      const audioUri = `data:audio/mp3;base64,${audioContent}`

      const { sound } = await Audio.Sound.createAsync({ uri: audioUri })
      await sound.playAsync()
      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false)
          sound.unloadAsync().catch(console.error)
        }
      })
    } catch (error) {
      console.error('Error pronouncing word:', error)
      setIsPlaying(false)
    }
  }

  const renderSynonyms = (synonyms: string[]): React.ReactNode => {
    if (!synonyms || synonyms.length === 0) return null
    return (
      <View style={styles.synonymsContainer}>
        <Text style={styles.synonymsTitle}>SYNONYMS</Text>
        <View style={styles.synonymsWrapper}>
          {synonyms.map((synonym, index) => (
            <WordChip key={index} word={synonym} />
          ))}
        </View>
      </View>
    )
  }

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.word}>{wordText}</Text>
          <TouchableOpacity onPress={pronounceWord} disabled={isPlaying}>
            <Ionicons
              name={isPlaying ? 'volume-high' : 'volume-high-outline'}
              size={24}
              color={isPlaying ? palette.lightGrey : '#4AC3BE'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.type}>({capitalizeFirstLetter(wordType)})</Text>
        <View style={styles.progressContainer}>
          <ProgressMeter value={progress} />
        </View>
        <Text style={styles.meaning}>{definition}</Text>
        {examples.length > 0 && <ExampleText text={examples[0]} />}
        {renderSynonyms(synonyms)}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.crossButton]} onPress={onCross}>
          <Ionicons name='close' size={24} color='#8F8F8F' />
        </TouchableOpacity>
        <View style={styles.buttonSeparator} />
        <TouchableOpacity style={[styles.button, styles.tickButton]} onPress={onTick}>
          <Ionicons name='checkmark' size={24} color='#4AC3BE' />
        </TouchableOpacity>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 0,
    margin: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 16,
  },
  infoContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  word: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  type: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#8F8F8F',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 16,
  },
  meaning: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
    lineHeight: 24,
  },
  synonymsContainer: {
    marginTop: 16,
  },
  synonymsTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8F8F8F',
    marginBottom: 8,
  },
  synonymsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordChip: {
    backgroundColor: 'white',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  wordChipText: {
    fontSize: 13,
    color: '#474847',
    fontWeight: '400',
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSeparator: {
    width: 1,
    backgroundColor: '#E5E5E5',
  },
  crossButton: {},
  tickButton: {},
})

export default LearnWordCard
