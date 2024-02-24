import React, { useState } from "react"
import { View, ScrollView, StyleSheet, Text } from "react-native"

const ExampleText = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}></View>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  box: {
    backgroundColor: "rgba(128, 182, 182, 0.5)",
    width: 6,
    height: "100%",
    marginRight: 8,
  },
})

export default ExampleText
