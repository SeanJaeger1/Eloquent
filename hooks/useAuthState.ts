import { useEffect, useState } from 'react'

import { Auth, User, onAuthStateChanged } from '@firebase/auth'

import { auth } from '../firebaseConfig'

const useAuthState = (): boolean => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth as Auth, (user: User | null) => setLoggedIn(!!user))

    return () => unsubscribe()
  }, [])

  return loggedIn
}

export default useAuthState
