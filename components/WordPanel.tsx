import type React from 'react'
import { useState, useRef, useEffect } from 'react'

import { View, Text, StyleSheet, Pressable, Platform, Animated } from 'react-native'

import palette from '../palette'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

import type { UserWord } from '../types/words'

interface WordPanelProps {
  userWord: UserWord
}

const WordPanel: React.FC<WordPanelProps> = ({ userWord }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const animatedHeight = useRef(new Animated.Value(0)).current

  const {
    word: { definition, word, wordType, synonyms, antonyms },
    progress,
  } = userWord

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [isExpanded, animatedHeight])

  const handlePress = (): void => {
    setIsExpanded(!isExpanded)
  }

  const getShortType = (type: string): string => {
    // Split the word types and get only the first one or two for display
    const types = type.split(',').map(t => {
      const trimmed = t.trim()
      return capitalizeFirstLetter(trimmed)
    })

    return types.length > 1 ? `${types[0]}, ${types[1]}` : types[0]
  }

  // Calculate progress on a scale of 1-5, converted to percentage
  const progressPercentage = (progress / 5) * 100
  // Use a numeric value between 0-1 for flex-based width instead of percentage string
  const progressScale = Math.min(progressPercentage, 100) / 100

  // Format synonyms and antonyms for display
  const formattedSynonyms = synonyms?.length > 0 ? synonyms.join(', ') : 'None'
  const formattedAntonyms = antonyms?.length > 0 ? antonyms.join(', ') : 'None'

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.wordContainer}>
            <Text style={styles.wordText}>{word}</Text>
            <Text style={styles.typeText}>{getShortType(wordType)}</Text>
          </View>
        </View>

        <View style={styles.progressRow}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { flex: progressScale }]} />
            <View style={{ flex: 1 - progressScale }} />
          </View>
        </View>

        <Animated.View
          style={[
            styles.definitionContainer,
            {
              maxHeight: animatedHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 500], // Increased max height for additional content
              }),
              opacity: animatedHeight,
            },
          ]}
        >
          <Text style={styles.definitionText}>{definition}</Text>

          {/* Synonyms and Antonyms */}
          <View style={styles.wordRelationsContainer}>
            <View style={styles.relationSection}>
              <Text style={styles.relationTitle}>Synonyms</Text>
              <Text style={styles.relationText}>{formattedSynonyms}</Text>
            </View>

            <View style={styles.relationSection}>
              <Text style={styles.relationTitle}>Antonyms</Text>
              <Text style={styles.relationText}>{formattedAntonyms}</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.indicatorRow}>
          <View style={[styles.expandIndicator, isExpanded && styles.expandIndicatorActive]} />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 16,
  },
  container: {
    backgroundColor: palette.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  wordContainer: {
    flex: 1,
  },
  wordText: {
    fontSize: 20,
    fontWeight: '600',
    color: palette.secondary,
    marginBottom: 4,
  },
  typeText: {
    fontSize: 14,
    color: palette.lightGrey,
  },
  progressRow: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressContainer: {
    height: 6,
    backgroundColor: palette.lightBlue,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressBar: {
    height: 6,
    backgroundColor: palette.darkBlue,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  definitionContainer: {
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  definitionText: {
    fontSize: 16,
    lineHeight: 22,
    color: palette.secondary,
    marginBottom: 12,
  },
  wordRelationsContainer: {
    marginBottom: 16,
  },
  relationSection: {
    marginBottom: 8,
  },
  relationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.darkBlue,
    marginBottom: 2,
  },
  relationText: {
    fontSize: 14,
    color: palette.secondary,
    lineHeight: 20,
  },
  indicatorRow: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  expandIndicator: {
    width: 40,
    height: 4,
    backgroundColor: palette.lightBlue,
    borderRadius: 2,
    marginTop: 4,
  },
  expandIndicatorActive: {
    backgroundColor: palette.darkBlue,
  },
})

export default WordPanel
