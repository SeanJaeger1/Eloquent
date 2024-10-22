import RightArrowIcon from '../icons/RightArrowIcon'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import palette from '../../palette'

const PrimaryButton = ({ text, onPress }) => {
  return (
    <Pressable style={styles.pressable} onPress={onPress}>
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
    fontWeight: 600,
    fontSize: 18,
  },
  arrowContainer: { position: 'absolute', right: 36 },
})

export default PrimaryButton
