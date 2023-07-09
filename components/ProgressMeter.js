import React from "react"
import { View } from 'react-native';

import palette from "../palette"

const DotsComponent = ({ value }) => {
  // Create an array of dots
  const dots = Array(5).fill(null)

  // Determine the number of dots to fill with blue
  const filledDots = value > 0 && value <= 5 ? value : 0

  return (
    <View style={{ display: "flex", flexDirection: 'row'}}>
      {dots.map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor:
              index < filledDots ? palette.secondary : palette.offWhite,
            marginRight: 4,
          }}
        />
      ))}
    </View>
  )
}

export default DotsComponent
