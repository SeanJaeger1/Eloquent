import type React from 'react'

import { View, StyleSheet, Text } from 'react-native'

import palette from '../palette'

interface ExampleTextProps {
  text: string
}

const ExampleText: React.FC<ExampleTextProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}></View>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
  box: {
    backgroundColor: palette.subtleBlue,
    width: 6,
    height: '100%',
    marginRight: 8,
  },
})

export default ExampleText
