import type React from 'react'
import { useState } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { Card } from '@rneui/themed'
import { Audio } from 'expo-av'
import Constants from 'expo-constants'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import palette from '../palette'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

import ExampleText from './ExampleText'
import ProgressMeter from './ProgressMeter'

import type { UserWord } from '../types/words'
import type { AVPlaybackStatus } from 'expo-av'

interface Config {
  GOOGLE_TEXT_SPEECH_API_KEY: string
}

interface AppManifestExtra {
  extra?: Partial<Config>
}

// Properly type and access manifest data
const manifest = Constants.manifest as AppManifestExtra | null | undefined
const manifest2 = Constants.manifest2 as AppManifestExtra | null | undefined

const manifestExtra = manifest?.extra ?? manifest2?.extra ?? {}
const GOOGLE_TTS_API_KEY = manifestExtra.GOOGLE_TEXT_SPEECH_API_KEY ?? ''

interface WordChipProps {
  word: string
}

interface LearnWordCardProps {
  userWord: UserWord
  onTick: () => void
  onCross: () => void
  disabled?: boolean
}

interface GoogleTTSResponse {
  audioContent: string
}

const WordChip: React.FC<WordChipProps> = ({ word }) => (
  <View style={styles.wordChip}>
    <Text style={styles.wordChipText}>{word}</Text>
  </View>
)

const LearnWordCard: React.FC<LearnWordCardProps> = ({ userWord, onTick, onCross, disabled }) => {
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

      const data = (await response.json()) as GoogleTTSResponse
      const audioContent = data.audioContent
      const audioUri = `data:audio/mp3;base64,${audioContent}`

      const { sound } = await Audio.Sound.createAsync({ uri: audioUri })
      await sound.playAsync()
      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false)
          void sound.unloadAsync()
        }
      })
    } catch (error) {
      console.error('Error pronouncing word:', error)
      setIsPlaying(false)
    }
  }

  const renderSynonyms = (synonymList: string[]): React.ReactNode => {
    if (!synonymList || synonymList.length === 0) return null
    return (
      <View style={styles.synonymsContainer}>
        <Text style={styles.synonymsTitle}>SYNONYMS</Text>
        <View style={styles.synonymsWrapper}>
          {synonymList.map((synonym, index) => (
            <WordChip key={index} word={synonym} />
          ))}
        </View>
      </View>
    )
  }

  const handlePronounce = (): void => {
    void pronounceWord()
  }

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.word}>{wordText}</Text>
          <TouchableOpacity onPress={handlePronounce} disabled={isPlaying}>
            <Ionicons
              name={isPlaying ? 'volume-high' : 'volume-high-outline'}
              size={24}
              color={isPlaying ? palette.lightGrey : palette.darkBlue}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.type}>({capitalizeFirstLetter(wordType)})</Text>
        <View style={styles.progressContainer}>
          <ProgressMeter value={progress} />
        </View>
        <Text style={styles.meaning}>{definition}</Text>
        {examples.length > 0 ? <ExampleText text={examples[0]} /> : null}
        {renderSynonyms(synonyms)}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.crossButton]}
          onPress={onCross}
          disabled={disabled}
        >
          <Ionicons name='close' size={24} color={palette.lightGrey} />
        </TouchableOpacity>
        <View style={styles.buttonSeparator} />
        <TouchableOpacity
          style={[styles.button, styles.tickButton]}
          onPress={onTick}
          disabled={disabled}
        >
          <Ionicons name='checkmark' size={24} color={palette.darkBlue} />
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
    shadowColor: palette.black,
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
    color: palette.black,
  },
  type: {
    fontSize: 16,
    fontStyle: 'italic',
    color: palette.lightGrey,
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 16,
  },
  meaning: {
    fontSize: 16,
    color: palette.black,
    marginBottom: 16,
    lineHeight: 24,
  },
  synonymsContainer: {
    marginTop: 16,
  },
  synonymsTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: palette.lightGrey,
    marginBottom: 8,
  },
  synonymsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordChip: {
    backgroundColor: palette.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: palette.lightBlue,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  wordChipText: {
    fontSize: 13,
    color: palette.secondary,
    fontWeight: '400',
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: palette.lightBlue,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSeparator: {
    width: 1,
    backgroundColor: palette.lightBlue,
  },
  crossButton: {},
  tickButton: {},
})

export default LearnWordCard
