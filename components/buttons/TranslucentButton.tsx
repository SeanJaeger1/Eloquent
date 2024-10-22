import { Text, View, StyleSheet, Pressable, PressableProps } from 'react-native'

import RightArrowIcon from '../icons/RightArrowIcon'

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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'white',
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
    color: 'white',
    fontWeight: '700' as const,
    fontSize: 14,
    marginRight: 12,
  },
  arrowContainer: {
    transform: [{ rotate: '90deg' }] as const,
  },
})

export default TransleucentButton
