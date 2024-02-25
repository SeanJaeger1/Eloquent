import React from "react"
import { ImageBackground, StyleSheet, View } from "react-native"

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        {children}
      </ImageBackground>
    </View>
  )
}

export default Background

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
})
