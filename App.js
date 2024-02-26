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
import palette from "./palette"
import BookIcon from "./components/icons/WordsIcon"
import SquaresIcon from "./components/icons/SquaresIcon"

const Tab = createBottomTabNavigator()

const App = () => {
  const loggedIn = useAuthState()
  const user = useUser()
  const unranked = loggedIn && user?.skillLevel === ""

  let content = (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: palette.secondary, // Semi-transparent or any color of choice
            position: "absolute",
            bottom: 56,
            left: 48,
            right: 48,
            elevation: 0,
            borderRadius: 36,
            height: 64,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <SquaresIcon stroke={focused ? "white" : "#A3A3A3"} />
            ),
          }}
          name="My Words"
          component={MyWordsPage}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <BookIcon stroke={focused ? "white" : "#A3A3A3"} />
            ),
          }}
          name="Learn"
          component={LearnPage}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )

  if (loggedIn && unranked) {
    content = <UpdateSkillLevelPage />
  } else if (!loggedIn) {
    content = <AuthFormPage />
  }

  return <Background>{content}</Background>
}

export default App
