import { useState, useEffect } from 'react'

import { httpsCallable } from 'firebase/functions'
import { View, StyleSheet } from 'react-native'

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
  const [words, setWords] = useState<(UserWord & { id: string })[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [updating, setUpdating] = useState<boolean>(false)
  const user = useUser() as User | null
  const setSkillLevel = useSetSkillLevel()

  useEffect(() => {
    void fetchUserWords()
  }, [])

  const nextWord = (): void => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      void fetchUserWords()
      setCurrentWordIndex(0)
    }
  }

  const fetchUserWords = async (): Promise<void> => {
    try {
      setLoading(true)
      const getUserWords = httpsCallable<void, (UserWord & { id: string })[]>(
        functions,
        'getLearningWords'
      )
      const result = await getUserWords()
      const userWords = result.data
      setWords(userWords)
    } catch (error) {
      console.error(
        'Error fetching user words:',
        error instanceof Error ? error.message : String(error)
      )
    } finally {
      setLoading(false)
    }
  }

  const updateWordProgress = async (increment: number): Promise<void> => {
    if (updating) return
    try {
      setUpdating(true)
      const updateWordProgressFn = httpsCallable(functions, 'updateWordProgress')
      await updateWordProgressFn({
        userWordId: words[currentWordIndex].id,
        increment,
      })
      setTimeout(() => {
        nextWord()
      }, 500)
    } catch (error) {
      console.error(
        'Error updating/creating user word:',
        error instanceof Error ? error.message : String(error)
      )
    } finally {
      setUpdating(false)
    }
  }

  // Create wrapper functions for the onTick and onCross handlers
  const handleTick = (): void => {
    void updateWordProgress(1)
  }

  const handleCross = (): void => {
    void updateWordProgress(-1)
  }

  // Create a wrapper function for setSkillLevel
  const handleSkillLevelReset = (): void => {
    void setSkillLevel('')
  }

  if (user?.skillLevel === undefined) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TransleucentButton
          text={capitalizeFirstLetter(user?.skillLevel || '')}
          onPress={handleSkillLevelReset}
        />
      </View>
      {loading || words.length === 0 ? (
        <LoadingPage />
      ) : (
        <View style={styles.cardContainer}>
          <ProgressBar currentIndex={currentWordIndex} totalCount={words.length} />
          <LearnWordCard
            userWord={words[currentWordIndex]}
            onTick={handleTick}
            onCross={handleCross}
            disabled={updating}
          />
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
  },
})

export default LearnPage
