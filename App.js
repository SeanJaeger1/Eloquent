import React from 'react';
import { View, Dimensions } from 'react-native';
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

const SCREEN_WIDTH = Dimensions.get('window').width;
const NAV_BAR_WIDTH = 280;
const NAV_BAR_HEIGHT = 60;
const ICON_SIZE = 48;

const TabIcon = ({ focused, Icon }) => (
  <View style={{
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: focused ? 'white' : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Icon
      stroke={focused ? palette.secondary : palette.lightGrey}
      width={24}
      height={24}
    />
  </View>
);

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

  if (!loggedIn || user === null) {
    content = <AuthFormPage />
  } else if (unranked) {
    content = <UpdateSkillLevelPage />
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
              bottom: 54,
              left: (SCREEN_WIDTH - NAV_BAR_WIDTH) / 2,
              width: NAV_BAR_WIDTH,
              height: NAV_BAR_HEIGHT,
              elevation: 0,
              borderRadius: NAV_BAR_HEIGHT / 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} Icon={SquaresIcon} />
              ),
            }}
            name="My Words"
            component={MyWordsPage}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} Icon={BookIcon} />
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
