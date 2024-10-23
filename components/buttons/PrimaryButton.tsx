import type React from 'react'

import { Text, View, StyleSheet, Pressable } from 'react-native'

import palette from '../../palette'
import RightArrowIcon from '../icons/RightArrowIcon'

import type { GestureResponderEvent, ViewStyle } from 'react-native'

interface PrimaryButtonProps {
  text: string
  onPress: (event: GestureResponderEvent) => void
  style?: ViewStyle
  disabled?: boolean
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onPress,
  style,
  disabled = false,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        style,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.signUpButton, disabled && styles.disabledText]}>{text}</Text>
      <View style={styles.arrowContainer}>
        <RightArrowIcon />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: palette.secondary,
    color: palette.white,
    borderRadius: 24,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
  },
  signUpButton: {
    color: palette.white,
    fontWeight: '600',
    fontSize: 18,
  },
  arrowContainer: {
    position: 'absolute',
    right: 36,
  },
  disabled: {
    backgroundColor: palette.secondary + '80', // Adding 50% opacity
  },
  disabledText: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.9,
  },
})

export default PrimaryButton
