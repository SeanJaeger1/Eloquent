import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"

import Background from "./components/Background"
import SquaresIcon from "./components/icons/SquaresIcon"
import BookIcon from "./components/icons/BookIcon"
import AuthFormPage from "./components/pages/AuthFormPage"
import LearnPage from "./components/pages/LearnPage"
import MyWordsPage from "./components/pages/MyWordsPage"
import UpdateSkillLevelPage from "./components/pages/UpdateSkillLevelPage"
import useAuthState from "./hooks/useAuthState"
import useUser from "./hooks/useUser"
import palette from "./palette"

const Tab = createBottomTabNavigator()

const App = () => {
  const loggedIn = useAuthState()
  const user = useUser()
  const unranked = loggedIn && user?.skillLevel === ""
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  }

  let content

  if (unranked) {
    content = <UpdateSkillLevelPage />
  } else if (!loggedIn) {
    content = <AuthFormPage />
  } else {
    content = (
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          initialRouteName="Learn"
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: palette.secondary,
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
                <SquaresIcon
                  stroke={focused ? "white" : palette.lightGrey}
                  width={30}
                  height={30}
                />
              ),
            }}
            name="My Words"
            component={MyWordsPage}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <BookIcon
                  stroke={focused ? "white" : palette.lightGrey}
                  width={30}
                  height={30}
                />
              ),
            }}
            name="Learn"
            component={LearnPage}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  return <Background>{content}</Background>
}

export default App
