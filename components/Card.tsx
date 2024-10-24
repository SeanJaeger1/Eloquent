import type React from 'react'

import { View, StyleSheet } from 'react-native'

import palette from '../palette'

import type { ViewStyle } from 'react-native'
interface CardProps {
  children: React.ReactNode
  containerStyle?: ViewStyle
}

const Card: React.FC<CardProps> = ({ children, containerStyle }) => {
  return <View style={[styles.container, containerStyle]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export default Card
