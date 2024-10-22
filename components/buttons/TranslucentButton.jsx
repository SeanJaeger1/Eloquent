import RightArrowIcon from '../icons/RightArrowIcon'
import { Text, View, StyleSheet, Pressable } from 'react-native'

const TransleucentButton = ({ text, onPress }) => {
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
    fontWeight: 700,
    fontSize: 14,
    marginRight: 12,
  },
  arrowContainer: { transform: 'rotate(90deg)' },
})

export default TransleucentButton
