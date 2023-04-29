import React, { useState, useEffect } from "react"
import { onAuthStateChanged } from "@firebase/auth"
import { auth } from "./firebaseConfig"
import AuthForm from "./components/AuthForm"
import CardPage from "./components/CardPage"

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return loggedIn ? <CardPage /> : <AuthForm />
}
