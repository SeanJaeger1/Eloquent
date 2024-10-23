import type React from 'react'
import { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'
import { httpsCallable } from 'firebase/functions'
import { View, ScrollView, StyleSheet, Text, TextInput } from 'react-native'

import { functions } from '../../firebaseConfig'
import palette from '../../palette'
import WordPanel from '../WordPanel'

import LoadingPage from './LoadingPage'

import type { NativeSyntheticEvent, NativeScrollEvent, ViewStyle, TextStyle } from 'react-native'
import type { UserWord } from 'types/words'

interface GetUserWordsResponse {
  userWords: UserWord[]
  nextPageToken: string | null
}

interface ScrollEvent extends NativeSyntheticEvent<NativeScrollEvent> {
  nativeEvent: NativeScrollEvent & {
    contentOffset: { y: number }
    contentSize: { height: number }
    layoutMeasurement: { height: number }
  }
}

const MyWordsPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [words, setWords] = useState<UserWord[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScroll = (event: ScrollEvent): void => {
    if (loading) {
      return
    }
    const offsetY = event.nativeEvent.contentOffset.y
    const contentHeight = event.nativeEvent.contentSize.height
    const height = event.nativeEvent.layoutMeasurement.height
    const bottom = offsetY + height
    const threshold = 20 // fetch more items when within 20px of the bottom

    if (bottom > contentHeight - threshold) {
      void fetchUserWords()
    }
  }

  const fetchUserWords = useCallback(async (): Promise<void> => {
    if (!nextPageToken && words.length !== 0) {
      return
    }
    try {
      setLoading(true)
      setError(null)
      const getUserWords = httpsCallable<{ lastSeenAt: string | null }, GetUserWordsResponse>(
        functions,
        'getUserWords'
      )
      const result = await getUserWords({ lastSeenAt: nextPageToken })
      const { userWords, nextPageToken: newToken } = result.data
      setWords(prevWords => [...prevWords, ...userWords])
      setNextPageToken(newToken)
    } catch (error) {
      console.error('Error fetching user words:', error)
      setError('Failed to load words. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [nextPageToken, words.length])

  // Wrap the fetchUserWords call in a function that handles the promise
  const initializeFetch = useCallback(() => {
    void fetchUserWords()
  }, [fetchUserWords])

  useFocusEffect(initializeFetch)

  const filteredWords = words.filter(({ word: { word } }) =>
    word.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search my words...'
        placeholderTextColor='black'
        onChangeText={(text: string) => setSearchText(text)}
        value={searchText}
      />
      {loading && words.length === 0 ? (
        <LoadingPage />
      ) : (
        <ScrollView
          style={styles.scroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
        >
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : filteredWords.length > 0 ? (
            filteredWords.map((word, index) => <WordPanel key={index} userWord={word} />)
          ) : (
            <Text style={styles.noWordsText}>
              You don&apos;t have any words yet! Start learning new words.
            </Text>
          )}
          {loading ? <LoadingPage /> : null}
        </ScrollView>
      )}
    </View>
  )
}

interface Styles {
  container: ViewStyle
  noWordsText: TextStyle
  errorText: TextStyle
  scroll: ViewStyle
  input: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  noWordsText: {
    fontSize: 18,
    color: palette.white,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: palette.error,
  },
  scroll: {
    paddingBottom: 148,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    backgroundColor: palette.white,
    borderRadius: 24,
    paddingLeft: 24,
  },
})

export default MyWordsPage
