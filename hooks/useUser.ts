import { useEffect, useState } from 'react'

import { doc, onSnapshot, DocumentSnapshot, Firestore } from 'firebase/firestore'

import { db, auth } from '../firebaseConfig'

interface UserData {
  email?: string
  displayName?: string
  skillLevel?: 'beginner' | 'intermediate' | 'advanced'
}

const useUser = (): UserData | null => {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    const fetchUser = async (): Promise<void> => {
      if (!auth.currentUser?.uid) return

      const userRef = doc(db as Firestore, 'users', auth.currentUser.uid)

      unsubscribe = onSnapshot(
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
    }

    if (auth?.currentUser?.uid) {
      fetchUser()
    } else {
      setUser(null)
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [auth?.currentUser?.uid])

  return user
}

export default useUser
