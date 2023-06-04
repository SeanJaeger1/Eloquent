import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { onAuthStateChanged } from "@firebase/auth"

import { auth } from "./firebaseConfig"
import AuthForm from "./components/AuthForm"
import MyWordsPage from "./components/MyWordsPage"
import Learn from "./components/Learn"

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
        <Tab.Screen name="Learn" component={Learn} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <AuthForm />
  )
}

export default App
