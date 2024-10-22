import React from 'react'

import { View, StyleSheet } from 'react-native'

import palette from '../palette'

const DotsComponent = ({ value }) => {
  const dots = Array(5).fill(null)
  const filledDots = value > 0 && value <= 5 ? value : 0

  return (
    <View style={styles.container}>
      {dots.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index < filledDots ? palette.darkBlue : palette.lightBlue,
            },
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
