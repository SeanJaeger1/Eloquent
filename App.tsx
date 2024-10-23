import type React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { View, Dimensions, StyleSheet } from 'react-native'

import Background from './components/Background'
import BookIcon from './components/icons/BookIcon'
import SquaresIcon from './components/icons/SquaresIcon'
import AuthFormPage from './components/pages/AuthFormPage'
import LearnPage from './components/pages/LearnPage'
import MyWordsPage from './components/pages/MyWordsPage'
import UpdateSkillLevelPage from './components/pages/UpdateSkillLevelPage'
import useAuthState from './hooks/useAuthState'
import useUser from './hooks/useUser'
import palette from './palette'

import type { SquaresIconProps } from './components/icons/SquaresIcon'
import type { ViewStyle } from 'react-native'

const Tab = createBottomTabNavigator()

const SCREEN_WIDTH = Dimensions.get('window').width
const NAV_BAR_WIDTH = 280
const NAV_BAR_HEIGHT = 60
const ICON_SIZE = 48

interface TabIconProps {
  focused: boolean
  Icon: React.ComponentType<SquaresIconProps>
}

interface User {
  skillLevel?: string
}

const TabIcon = ({ focused, Icon }: TabIconProps): JSX.Element => (
  <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
    <Icon stroke={focused ? palette.secondary : palette.lightGrey} width='24' height='24' />
  </View>
)

const App = (): JSX.Element => {
  const loggedIn = useAuthState()
  const user = useUser() as User | null
  const unranked = loggedIn && user?.skillLevel === ''

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: palette.transleucent,
    },
  }

  const tabBarStyle: ViewStyle = styles.tabBar

  let content: React.ReactNode

  if (!loggedIn || user === null) {
    content = <AuthFormPage />
  } else if (unranked) {
    content = <UpdateSkillLevelPage />
  } else {
    content = (
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          initialRouteName='Learn'
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle,
            headerShown: false,
          }}
        >
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={SquaresIcon} />,
            }}
            name='My Words'
            component={MyWordsPage}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={BookIcon} />,
            }}
            name='Learn'
            component={LearnPage}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  return <Background>{content}</Background>
}

interface Styles {
  iconContainer: ViewStyle
  iconContainerFocused: ViewStyle
  tabBar: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: palette.transleucent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerFocused: {
    backgroundColor: palette.white,
  },
  tabBar: {
    backgroundColor: palette.secondary,
    position: 'absolute',
    bottom: 54,
    left: (SCREEN_WIDTH - NAV_BAR_WIDTH) / 2,
    width: NAV_BAR_WIDTH,
    height: NAV_BAR_HEIGHT,
    elevation: 0,
    borderRadius: NAV_BAR_HEIGHT / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0,
  },
})

export default App
