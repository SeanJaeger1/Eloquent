import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { onAuthStateChanged } from "@firebase/auth"

import { auth } from "./firebaseConfig"
import AuthFormPage from "./components/pages/AuthFormPage"
import MyWordsPage from "./components/pages/MyWordsPage"
import LearnPage from "./components/pages/LearnPage"

const useAuthState = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setLoggedIn(!!user))
    return unsubscribe
  }, [])

  return loggedIn
}

const Tab = createBottomTabNavigator()

const App = () => {
  const loggedIn = useAuthState()

  return loggedIn ? (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="My Words" component={MyWordsPage} />
        <Tab.Screen name="Learn" component={LearnPage} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <AuthFormPage />
  )
}

export default App
