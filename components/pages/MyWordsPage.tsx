import type React from 'react'
import { useCallback, useRef, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import palette from '../../palette'
import { apiCache } from '../../services/apiCache'
import { getUserWords } from '../../services/firebase'
import WordPanel from '../WordPanel'

import LoadingPage from './LoadingPage'

import type { NativeScrollEvent, NativeSyntheticEvent, TextStyle, ViewStyle } from 'react-native'
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
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)

  // Animation value for search box
  const searchBoxAnimation = useRef(new Animated.Value(0)).current

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

      // Cache key including pagination token
      const cacheKey = `user_words_${nextPageToken ?? 'initial'}`
      const cachedResult = apiCache.get<GetUserWordsResponse>(cacheKey)

      let userWordsData: GetUserWordsResponse

      if (cachedResult) {
        userWordsData = cachedResult
      } else {
        userWordsData = await getUserWords(nextPageToken)

        // Cache for 2 minutes - shorter time since user might be actively updating words
        apiCache.set(cacheKey, userWordsData, 2 * 60 * 1000)
      }

      const { userWords, nextPageToken: newToken } = userWordsData
      setWords(prevWords => [...prevWords, ...userWords])
      setNextPageToken(newToken)
    } catch (error) {
      console.error('Error fetching user words:', error)
      setError('Failed to load words. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [nextPageToken, words.length])

  // Animation for search box focus
  const handleSearchFocus = (focused: boolean): void => {
    setIsSearchFocused(focused)
    Animated.timing(searchBoxAnimation, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  // Clear search text
  const handleClearSearch = (): void => {
    setSearchText('')
  }

  // Wrap the fetchUserWords call in a function that handles the promise
  const initializeFetch = useCallback((): void => {
    void fetchUserWords()
  }, [fetchUserWords])

  useFocusEffect(initializeFetch)

  const filteredWords = words.filter(({ word: { word } }) =>
    word.toLowerCase().includes(searchText.toLowerCase())
  )

  // Computed styles for search box
  const searchContainerStyle = {
    ...styles.searchContainer,
    shadowOpacity: searchBoxAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 0.3],
    }),
    borderColor: searchBoxAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [palette.lightGrey, palette.darkBlue],
    }),
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Words</Text>

      <Animated.View style={searchContainerStyle}>
        <Ionicons
          name='search'
          size={20}
          color={isSearchFocused ? palette.darkBlue : palette.lightGrey}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder='Search my words...'
          placeholderTextColor={palette.lightGrey}
          onChangeText={setSearchText}
          value={searchText}
          onFocus={() => handleSearchFocus(true)}
          onBlur={() => handleSearchFocus(false)}
        />
        {searchText.length > 0 ? (
          <Pressable onPress={handleClearSearch} style={styles.clearButton}>
            <Ionicons name='close-circle' size={18} color={palette.lightGrey} />
          </Pressable>
        ) : null}
      </Animated.View>

      {filteredWords.length > 0 ? (
        <Text style={styles.resultCount}>
          {filteredWords.length} word{filteredWords.length !== 1 ? 's' : ''}
        </Text>
      ) : null}

      {loading && words.length === 0 ? (
        <LoadingPage />
      ) : (
        <ScrollView
          style={styles.scroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          contentContainerStyle={styles.scrollContent}
        >
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : filteredWords.length > 0 ? (
            filteredWords.map((word, index) => <WordPanel key={index} userWord={word} />)
          ) : (
            <View style={styles.emptyStateContainer}>
              <Ionicons name='book-outline' size={64} color={palette.lightGrey} />
              <Text style={styles.noWordsText}>
                You don&apos;t have any words yet! Start learning new words.
              </Text>
            </View>
          )}
          {loading ? <LoadingPage /> : null}
        </ScrollView>
      )}
    </View>
  )
}

interface Styles {
  container: ViewStyle
  pageTitle: TextStyle
  searchContainer: ViewStyle
  searchIcon: ViewStyle
  clearButton: ViewStyle
  input: TextStyle
  noWordsText: TextStyle
  errorText: TextStyle
  scroll: ViewStyle
  scrollContent: ViewStyle
  emptyStateContainer: ViewStyle
  resultCount: TextStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: palette.white,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: 16,
    padding: 0,
    marginBottom: 16,
    borderWidth: 1.5,
    height: 52,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
    paddingRight: 16,
    fontSize: 16,
    color: palette.black,
  },
  clearButton: {
    padding: 12,
  },
  noWordsText: {
    fontSize: 18,
    color: palette.white,
    textAlign: 'center',
    marginTop: 16,
    marginHorizontal: 24,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: palette.error,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 148,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  resultCount: {
    fontSize: 14,
    color: palette.white,
    marginBottom: 8,
  },
})

export default MyWordsPage
