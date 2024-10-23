import type React from 'react'

import { View, StyleSheet } from 'react-native'

import palette from '../palette'

import type { ViewStyle } from 'react-native'

interface DotsComponentProps {
  value: number
}

const DotsComponent: React.FC<DotsComponentProps> = ({ value }) => {
  const dots = Array(5).fill(null) as null[]
  const filledDots: number = value > 0 && value <= 5 ? value : 0

  return (
    <View style={styles.container}>
      {dots.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index < filledDots ? palette.darkBlue : palette.lightBlue,
            } as ViewStyle,
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
})

export default DotsComponent
