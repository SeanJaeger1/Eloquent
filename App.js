import React, { useState, useEffect } from "react"
import { onAuthStateChanged } from "@firebase/auth"
import { auth } from "./firebaseConfig"
import AuthForm from "./components/AuthForm"
import MyWordsPage from "./components/MyWordsPage"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Learn from "./components/Learn"

const Tab = createBottomTabNavigator()

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

  return loggedIn ? (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="My Words" component={MyWordsPage} />
        <Tab.Screen name="Learn" component={Learn} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <AuthForm />
  )
}
