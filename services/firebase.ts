import { doc, onSnapshot } from '@firebase/firestore'
import { httpsCallable } from '@firebase/functions'

import { functions, db } from '../firebaseConfig'

import type { UserWord } from '../types/words'
import type { DocumentSnapshot } from 'firebase/firestore'

// Function to get learning words
export const getLearningWords = async (): Promise<(UserWord & { id: string })[]> => {
  try {
    const getUserWords = httpsCallable<void, (UserWord & { id: string })[]>(
      functions,
      'getLearningWords'
    )
    const result = await getUserWords()
    return result.data
  } catch (error) {
    console.error(
      'Error fetching learning words:',
      error instanceof Error ? error.message : String(error)
    )
    throw error
  }
}

// Function to update word progress
export const updateWordProgress = async (userWordId: string, increment: number): Promise<void> => {
  try {
    const updateWordProgressFn = httpsCallable(functions, 'updateWordProgress')
    await updateWordProgressFn({
      userWordId,
      increment,
    })
  } catch (error) {
    console.error(
      'Error updating word progress:',
      error instanceof Error ? error.message : String(error)
    )
    throw error
  }
}

// Function to get user's saved words
export const getUserWords = async (
  lastSeenAt: string | null
): Promise<{
  userWords: UserWord[]
  nextPageToken: string | null
}> => {
  try {
    const getUserWordsFn = httpsCallable<
      { lastSeenAt: string | null },
      { userWords: UserWord[]; nextPageToken: string | null }
    >(functions, 'getUserWords')

    const result = await getUserWordsFn({ lastSeenAt })
    return result.data
  } catch (error) {
    console.error(
      'Error fetching user words:',
      error instanceof Error ? error.message : String(error)
    )
    throw error
  }
}

// Function to listen to a document
export const listenToDocument = <T>(
  collectionName: string,
  documentId: string,
  callback: (data: T | null) => void
): (() => void) => {
  const docRef = doc(db, collectionName, documentId)

  const unsubscribe = onSnapshot(
    docRef,
    (doc: DocumentSnapshot) => {
      if (doc.exists()) {
        callback(doc.data() as T)
      } else {
        callback(null)
      }
    },
    error => {
      console.error(
        `Error listening to ${collectionName}/${documentId}:`,
        error instanceof Error ? error.message : String(error)
      )
      callback(null)
    }
  )

  return unsubscribe
}
