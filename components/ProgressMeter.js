import React from "react"

import palette from "../palette"

const DotsComponent = ({ value }) => {
  // Create an array of dots
  const dots = Array(5).fill(null)

  // Determine the number of dots to fill with blue
  const filledDots = value > 0 && value <= 5 ? value : 0

  return (
    <div style={{ display: "flex" }}>
      {dots.map((_, index) => (
        <div
          key={index}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor:
              index < filledDots ? palette.secondary : palette.offWhite,
            marginRight: "4px",
          }}
        />
      ))}
    </div>
  )
}

export default DotsComponent
