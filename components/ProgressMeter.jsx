import { View } from "react-native"

import palette from "../palette"

const DotsComponent = ({ value }) => {
  const dots = Array(5).fill(null)
  const filledDots = value > 0 && value <= 5 ? value : 0

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
    },
    box: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor:
        index < filledDots ? palette.darkBlue : palette.lightBlue,
      marginRight: 4,
    },
  })

  return (
    <View style={styles.container}>
      {dots.map((_, index) => (
        <View key={index} style={styles.meter} />
      ))}
    </View>
  )
}

export default DotsComponent
