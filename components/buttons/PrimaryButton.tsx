import React from 'react'

import { Text, View, StyleSheet, Pressable, GestureResponderEvent, ViewStyle } from 'react-native'

import palette from '../../palette'
import RightArrowIcon from '../icons/RightArrowIcon'

interface PrimaryButtonProps {
  text: string
  onPress: (event: GestureResponderEvent) => void
  style?: ViewStyle
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onPress, style }) => {
  return (
    <Pressable style={[styles.pressable, style]} onPress={onPress}>
      <Text style={styles.signUpButton}>{text}</Text>
      <View style={styles.arrowContainer}>
        <RightArrowIcon />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: palette.secondary,
    color: 'white',
    borderRadius: 24,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
  },
  signUpButton: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  arrowContainer: {
    position: 'absolute',
    right: 36,
  },
})

export default PrimaryButton
