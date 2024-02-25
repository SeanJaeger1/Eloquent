import { useEffect, useState } from "react"
import { onAuthStateChanged } from "@firebase/auth"
import { auth } from "../firebaseConfig"

const useAuthState = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setLoggedIn(!!user))
    return unsubscribe
  }, [])

  return loggedIn
}

export default useAuthState
