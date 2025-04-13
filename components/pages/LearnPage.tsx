import { useState, useEffect, useRef } from 'react'

import { useIsFocused } from '@react-navigation/native'
import { View, Text, StyleSheet, Alert, ActivityIndicator, Button, Animated } from 'react-native'

import useSetSkillLevel from '../../hooks/useSetSkillLevel'
import useUser from '../../hooks/useUser'
import palette from '../../palette'
import { apiCache } from '../../services/apiCache'
import { getLearningWords, updateWordProgress } from '../../services/firebase'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import TransleucentButton from '../buttons/TranslucentButton'
import LearnWordCard from '../LearnWordCard'
import ProgressBar from '../ProgressBar'

import LoadingPage from './LoadingPage'

import type { UserWord } from '../../types/words'

const LearnPage: React.FC = () => {
  const [wordState, setWordState] = useState({
    words: [] as (UserWord & { id: string })[],
    currentIndex: 0,
    loading: true,
    updating: false,
    error: null as string | null,
  })

  // Animation value for the updating state
  const [pulseAnim] = useState(new Animated.Value(0))

  // Track whether initial data has been loaded
  const initialLoadComplete = useRef(false)

  // Check if the screen is focused
  const isFocused = useIsFocused()

  const user = useUser()
  const setSkillLevel = useSetSkillLevel()

  useEffect(() => {
    // Only fetch words if we haven't loaded them already or if the words array is empty
    if (isFocused && (!initialLoadComplete.current || wordState.words.length === 0)) {
      void fetchUserWords()
    }
  }, [isFocused, wordState.words.length])

  // Pulse animation when updating
  useEffect(() => {
    if (wordState.updating) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start()
    } else {
      pulseAnim.setValue(0)
    }
  }, [wordState.updating, pulseAnim])

  const nextWord = (): void => {
    if (wordState.currentIndex < wordState.words.length - 1) {
      setWordState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }))
    } else {
      void fetchUserWords()
      setWordState(prev => ({
        ...prev,
        currentIndex: 0,
      }))
    }
  }

  const fetchUserWords = async (): Promise<void> => {
    try {
      setWordState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }))

      // Check cache first
      const cacheKey = 'learning_words'
      let userWords = apiCache.get<(UserWord & { id: string })[]>(cacheKey) ?? []

      if (userWords) {
        // Not in cache, fetch from API
        userWords = await getLearningWords()

        // Cache the result for 5 minutes
        if (userWords.length > 0) {
          apiCache.set(cacheKey, userWords, 5 * 60 * 1000)
        }
      }
      if (userWords.length === 0) {
        setWordState(prev => ({
          ...prev,
          loading: false,
          error: 'No words available to learn right now. Please check back later.',
        }))
        return
      }

      setWordState(prev => ({
        ...prev,
        words: userWords,
        loading: false,
        // Keep the current index if we're just returning to the page (and it's a valid index)
        currentIndex:
          initialLoadComplete.current && prev.currentIndex < userWords.length
            ? prev.currentIndex
            : 0,
      }))

      // Mark that we've completed the initial load
      initialLoadComplete.current = true
    } catch (error) {
      console.error(
        'Error fetching user words:',
        error instanceof Error ? error.message : String(error)
      )

      setWordState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load words. Please try again.',
      }))
    }
  }

  const handleWordProgress = async (increment: number): Promise<void> => {
    if (wordState.updating) return

    try {
      setWordState(prev => ({
        ...prev,
        updating: true,
      }))

      const userWordId = wordState.words[wordState.currentIndex].id
      await updateWordProgress(userWordId, increment)

      // Clear the cache since word progress has changed
      apiCache.delete('learning_words')

      // Process the update then move to next word
      setWordState(prev => ({
        ...prev,
        updating: false,
      }))
      nextWord()
    } catch (error) {
      console.error(
        'Error updating word progress:',
        error instanceof Error ? error.message : String(error)
      )

      setWordState(prev => ({
        ...prev,
        updating: false,
      }))

      Alert.alert('Error', 'Failed to update progress. Please try again.', [{ text: 'OK' }])
    }
  }

  const handleTick = (): void => {
    void handleWordProgress(1)
  }

  const handleCross = (): void => {
    void handleWordProgress(-1)
  }

  const handleSkillLevelReset = (): void => {
    void setSkillLevel('')
  }

  if (user?.skillLevel === undefined) {
    return <LoadingPage />
  }

  if (wordState.error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{wordState.error}</Text>
          <Button title='Try Again' onPress={() => void fetchUserWords()} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TransleucentButton
          text={capitalizeFirstLetter(user?.skillLevel || '')}
          onPress={handleSkillLevelReset}
        />
      </View>
      {wordState.loading || wordState.words.length === 0 ? (
        <LoadingPage />
      ) : (
        <View style={styles.cardContainer}>
          <ProgressBar currentIndex={wordState.currentIndex} totalCount={wordState.words.length} />
          <Animated.View
            style={[
              styles.cardWrapper,
              wordState.updating && {
                transform: [
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.02],
                    }),
                  },
                ],
              },
            ]}
          >
            <LearnWordCard
              userWord={wordState.words[wordState.currentIndex]}
              onTick={handleTick}
              onCross={handleCross}
              disabled={wordState.updating}
            />
            {wordState.updating ? (
              <View style={styles.loadingIndicatorContainer}>
                <View style={styles.loadingPill}>
                  <ActivityIndicator size='small' color={palette.darkBlue} />
                  <Text style={styles.loadingText}>Updating...</Text>
                </View>
              </View>
            ) : null}
          </Animated.View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: 28,
    right: 24,
  },
  cardContainer: {
    width: '90%',
    alignItems: 'center',
    position: 'relative',
  },
  cardWrapper: {
    width: '100%',
    position: 'relative',
  },
  loadingIndicatorContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingPill: {
    flexDirection: 'row',
    backgroundColor: palette.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    marginLeft: 8,
    color: palette.darkBlue,
    fontWeight: '500',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: palette.error,
    marginBottom: 20,
    textAlign: 'center',
  },
})

export default LearnPage
