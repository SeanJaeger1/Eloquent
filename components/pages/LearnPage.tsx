import { useState, useEffect } from 'react'

import { httpsCallable } from 'firebase/functions'
import { View, Text, StyleSheet, Alert, ActivityIndicator, Button } from 'react-native'

import { functions } from '../../firebaseConfig'
import useSetSkillLevel from '../../hooks/useSetSkillLevel'
import useUser from '../../hooks/useUser'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import TransleucentButton from '../buttons/TranslucentButton'
import LearnWordCard from '../LearnWordCard'
import ProgressBar from '../ProgressBar'

import LoadingPage from './LoadingPage'

import type { UserWord } from '../../types/words'
import type { User } from 'types/user'

const LearnPage: React.FC = () => {
  const [wordState, setWordState] = useState({
    words: [] as (UserWord & { id: string })[],
    currentIndex: 0,
    loading: true,
    updating: false,
    error: null as string | null,
  })

  const user = useUser() as User | null
  const setSkillLevel = useSetSkillLevel()

  useEffect(() => {
    void fetchUserWords()
  }, [])

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

      const getUserWords = httpsCallable<void, (UserWord & { id: string })[]>(
        functions,
        'getLearningWords'
      )
      const result = await getUserWords()
      const userWords = result.data

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
        currentIndex: 0,
      }))
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

  const updateWordProgress = async (increment: number): Promise<void> => {
    if (wordState.updating) return

    try {
      setWordState(prev => ({
        ...prev,
        updating: true,
      }))

      const updateWordProgressFn = httpsCallable(functions, 'updateWordProgress')
      await updateWordProgressFn({
        userWordId: wordState.words[wordState.currentIndex].id,
        increment,
      })

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
    void updateWordProgress(1)
  }

  const handleCross = (): void => {
    void updateWordProgress(-1)
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
          <LearnWordCard
            userWord={wordState.words[wordState.currentIndex]}
            onTick={handleTick}
            onCross={handleCross}
            disabled={wordState.updating}
          />
          {wordState.updating ? (
            <View style={styles.updatingOverlay}>
              <ActivityIndicator size='large' color='#ffffff' />
            </View>
          ) : null}
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
  updatingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
})

export default LearnPage
