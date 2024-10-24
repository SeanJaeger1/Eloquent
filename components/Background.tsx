import type { ReactNode } from 'react'

import { ImageBackground, StyleSheet, View } from 'react-native'

import palette from 'palette'

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
        <View style={styles.overlay}>{children}</View>
      </ImageBackground>
    </View>
  )
}

export default Background

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: palette.transparent,
  },
})
