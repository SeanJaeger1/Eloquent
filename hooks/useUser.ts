import { useEffect, useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../firebaseConfig'
import { listenToDocument } from '../services/firebase'

import type { User } from '../types/user'

const useUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | null = null

    // Set up auth state listener
    const unsubscribeAuth = onAuthStateChanged(auth, authUser => {
      if (authUser?.uid) {
        // User is signed in, set up Firestore listener
        unsubscribeFirestore = listenToDocument<User>('users', authUser.uid, userData => {
          if (userData) {
            setUser(userData)
          } else {
            setUser(null)
          }
        })
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
