import { useEffect, useState } from 'react'

import { onAuthStateChanged } from '@firebase/auth'

import { auth } from '../firebaseConfig'

import type { User } from '@firebase/auth'

const useAuthState = (): boolean => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => setLoggedIn(!!user))

    return () => unsubscribe()
  }, [])

  return loggedIn
}

export default useAuthState
