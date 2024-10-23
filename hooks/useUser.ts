import { useEffect, useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot, DocumentSnapshot, Firestore } from 'firebase/firestore'

import { db, auth } from '../firebaseConfig'

interface UserData {
  email?: string
  displayName?: string
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

const useUser = (): UserData | null => {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | null = null

    // Set up auth state listener
    const unsubscribeAuth = onAuthStateChanged(auth, authUser => {
      if (authUser?.uid) {
        // User is signed in, set up Firestore listener
        const userRef = doc(db as Firestore, 'users', authUser.uid)

        unsubscribeFirestore = onSnapshot(
          userRef,
          (doc: DocumentSnapshot) => {
            if (doc.exists()) {
              setUser(doc.data() as UserData)
            }
          },
          error => {
            console.error(
              'Error fetching user data:',
              error instanceof Error ? error.message : String(error)
            )
            setUser(null)
          }
        )
      } else {
        // User is signed out
        setUser(null)
        if (unsubscribeFirestore) {
          unsubscribeFirestore()
          unsubscribeFirestore = null
        }
      }
    })

    // Cleanup function
    return () => {
      if (unsubscribeFirestore) {
        unsubscribeFirestore()
      }
      unsubscribeAuth()
    }
  }, [])

  return user
}

export default useUser
