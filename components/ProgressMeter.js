import React from "react"
import { View } from "react-native"

import palette from "../palette"

const DotsComponent = ({ value }) => {
  const dots = Array(5).fill(null)
  const filledDots = value > 0 && value <= 5 ? value : 0

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {dots.map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor:
              index < filledDots ? palette.darkBlue : palette.lightBlue,
            marginRight: 4,
          }}
        />
      ))}
    </View>
  )
}

export default DotsComponent
