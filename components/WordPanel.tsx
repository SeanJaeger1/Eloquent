import React, { useState } from 'react'

import { View, Text, StyleSheet, Pressable, Platform } from 'react-native'

import { UserWord } from '../types/words'
import shortenType from '../utils/shortenType'

import ProgressMeter from './ProgressMeter'

interface WordPanelProps {
  userWord: UserWord
}

const WordPanel: React.FC<WordPanelProps> = ({ userWord }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const {
    word: { definition, meaning, word, wordType },
    progress,
  } = userWord

  const handlePress = (): void => {
    setIsExpanded(!isExpanded)
  }

  const getShortType = (type: string): string => {
    return shortenType[type] || type
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.boldText}>
            {word}, {getShortType(wordType)}
          </Text>
        </View>
        <View style={styles.row}>
          <ProgressMeter value={progress} />
        </View>
        <View style={styles.row}>
          <Text style={styles.meaningText}>{meaning}</Text>
        </View>
        {isExpanded && (
          <View style={styles.row}>
            <Text style={styles.definitionText}>{definition}</Text>
          </View>
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '1px 1px 2px 1px rgba(0, 0, 0, 0.25)',
      },
    }),
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 8,
    textAlign: 'center',
  },
  meaningText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  definitionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default WordPanel
