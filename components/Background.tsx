import type { ReactNode } from 'react'

import { ImageBackground, StyleSheet, View } from 'react-native'

import type { ImageSourcePropType } from 'react-native'

interface BackgroundProps {
  children: ReactNode
}

const Background = ({ children }: BackgroundProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png') as ImageSourcePropType}
        resizeMode='cover'
        style={styles.image}
      >
        {children}
      </ImageBackground>
    </View>
  )
}

export default Background

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})
