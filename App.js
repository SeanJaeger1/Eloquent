import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { onAuthStateChanged } from "@firebase/auth"
import { ImageBackground, StyleSheet, View } from "react-native"
import Svg, { Path } from "react-native-svg"

import { auth } from "./firebaseConfig"
import AuthFormPage from "./components/pages/AuthFormPage"
import MyWordsPage from "./components/pages/MyWordsPage"
import LearnPage from "./components/pages/LearnPage"
import useUser from "./hooks/useUser"
import UpdateSkillLevelPage from "./components/pages/UpdateSkillLevelPage"
import palette from "./palette"

const useAuthState = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setLoggedIn(!!user))
    return unsubscribe
  }, [])

  return loggedIn
}
const MySvgComponent = () => (
  <Svg height="50" width="50" viewBox="0 0 100 100">
    <Path
      fill="none"
      stroke="white"
      d="M10 4.99992C10 4.99992 8.75 3.33325 5.83334 3.33325C2.91667 3.33325 1.66667 4.99992 1.66667 4.99992V16.6666C1.66667 16.6666 2.91667 15.8333 5.83334 15.8333C8.75 15.8333 10 16.6666 10 16.6666M10 4.99992V16.6666M10 4.99992C10 4.99992 11.25 3.33325 14.1667 3.33325C17.0833 3.33325 18.3333 4.99992 18.3333 4.99992V16.6666C18.3333 16.6666 17.0833 15.8333 14.1667 15.8333C11.25 15.8333 10 16.6666 10 16.6666"
    />
  </Svg>
)

const Tab = createBottomTabNavigator()

const App = () => {
  const loggedIn = useAuthState()
  const user = useUser()

  if (loggedIn && user?.skillLevel === "") {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/background.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <UpdateSkillLevelPage />
        </ImageBackground>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.png")}
        resizeMode="cover"
        style={styles.image}
        id="FIRST"
      >
        {loggedIn ? (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: , // Background color
                  marginBottom: 56, // Bottom margin
                  marginHorizontal: 48,
                  borderRadius: 36,
                  height: 60,
                  display: "inline",
                  tabBarShowLabel: false,
                },
                tabBarActiveTintColor: "#ffffff", // Active icon color
                tabBarInactiveTintColor: "#b3b3b3", // Inactive icon color
              }}
            >
              <Tab.Screen
                name="My Words"
                component={MyWordsPage}
                options={{
                  tabBarIcon: ({ color, size }) => MySvgComponent,
                  tabBarLabel: "", // This also ensures the label is not displayed, but tabBarShowLabel in screenOptions is more effective for all tabs.
                }}
              />
              <Tab.Screen name="Learn" component={LearnPage} />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          // <NavigationContainer id="SECOND">
          //   <Tab.Navigator>
          //     <Tab.Screen name="My Words" component={MyWordsPage} />
          //     <Tab.Screen name="Learn" component={LearnPage} />
          //   </Tab.Navigator>
          // </NavigationContainer>
          <AuthFormPage />
        )}
      </ImageBackground>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
})
