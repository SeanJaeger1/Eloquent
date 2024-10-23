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

interface User {
  skillLevel?: string
  // Add other user properties as needed
}

const LearnPage: React.FC = () => {
  const [words, setWords] = useState<(UserWord & { id: string })[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const user = useUser() as User | null
  const setSkillLevel = useSetSkillLevel()

  useEffect(() => {
    fetchUserWords()
  }, [])

  const nextWord = (): void => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      fetchUserWords()
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
      setLoading(false)
    } catch (error) {
      console.error(
        'Error fetching user words:',
        error instanceof Error ? error.message : String(error)
      )
      setLoading(false)
    }
  }

  const updateWordProgress = async (increment: number): Promise<void> => {
    try {
      setTimeout(() => {
        nextWord()
      }, 500)
      const updateWordProgressFn = httpsCallable(functions, 'updateWordProgress')

      await updateWordProgressFn({
        userWordId: words[currentWordIndex].id,
        increment,
      })
    } catch (error) {
      console.error(
        'Error updating/creating user word:',
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  if (user?.skillLevel === undefined) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TransleucentButton
          text={capitalizeFirstLetter(user?.skillLevel || '')}
          onPress={() => setSkillLevel('')}
        />
      </View>
      {loading || words.length === 0 ? (
        <LoadingPage />
      ) : (
        <View style={styles.cardContainer}>
          <ProgressBar currentIndex={currentWordIndex} totalCount={words.length} />
          <LearnWordCard
            userWord={words[currentWordIndex]}
            onTick={() => updateWordProgress(1)}
            onCross={() => updateWordProgress(-1)}
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
