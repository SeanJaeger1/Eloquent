import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import useAuthState from "./hooks/useAuthState"
import AuthFormPage from "./components/pages/AuthFormPage"
import MyWordsPage from "./components/pages/MyWordsPage"
import LearnPage from "./components/pages/LearnPage"
import useUser from "./hooks/useUser"
import UpdateSkillLevelPage from "./components/pages/UpdateSkillLevelPage"
import Background from "./components/Background"

const Tab = createBottomTabNavigator()

const App = () => {
  const loggedIn = useAuthState()
  const user = useUser()
  const unranked = loggedIn && user?.skillLevel === ""

  let content = <AuthFormPage />
  if (loggedIn) {
    content = null
  }
  if (unranked) {
    content = <UpdateSkillLevelPage />
  }

  return <Background>{content}</Background>

  // to be handled
  // <NavigationContainer>
  //   <Tab.Navigator>
  //     <Tab.Screen name="My Words" component={MyWordsPage} />
  //     <Tab.Screen name="Learn" component={LearnPage} />
  //   </Tab.Navigator>
  // </NavigationContainer>
}

export default App
