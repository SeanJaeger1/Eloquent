import { type ReactNode } from 'react'

import { View, StyleSheet } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg'

import type { ViewStyle } from 'react-native'

interface BackgroundProps {
  children: ReactNode
  containerStyle?: ViewStyle
}

const Background = ({ children, containerStyle }: BackgroundProps): JSX.Element => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.svgContainer}>
        <Svg width='100%' height='100%' preserveAspectRatio='none'>
          <Defs>
            <LinearGradient id='gradient' x1='0%' y1='100%' x2='80%' y2='0%'>
              <Stop stopColor='#92E9EE' />
              <Stop offset='1' stopColor='#0CA0A4' />
            </LinearGradient>
          </Defs>
          <Rect width='100%' height='100%' fill='url(#gradient)' />
        </Svg>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const colors = {
  background: '#0CA0A4',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})

export default Background
