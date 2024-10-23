import { Text, View, StyleSheet, Pressable } from 'react-native'

import palette from '../../palette'
import RightArrowIcon from '../icons/RightArrowIcon'

import type { PressableProps } from 'react-native'

interface TransleucentButtonProps {
  text: string
  onPress: PressableProps['onPress']
}

const TransleucentButton: React.FC<TransleucentButtonProps> = ({ text, onPress }) => {
  return (
    <Pressable style={styles.pressable} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
      <View style={styles.arrowContainer}>
        <RightArrowIcon />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: palette.transleucent,
    color: palette.white,
    borderRadius: 24,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: palette.white,
    fontWeight: '700' as const,
    fontSize: 14,
    marginRight: 12,
  },
  arrowContainer: {
    transform: [{ rotate: '90deg' }] as const,
  },
})

export default TransleucentButton
