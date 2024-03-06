import React, { useEffect, useRef } from "react"
import { View, StyleSheet, Animated, Text } from "react-native"

const ProgressBar = ({ currentIndex, totalCount }) => {
  const initialWidthPercent = (currentIndex / totalCount) * 100
  const animatedWidth = useRef(new Animated.Value(initialWidthPercent)).current

  useEffect(() => {
    const targetWidthPercent = ((currentIndex + 1) / totalCount) * 100
    Animated.timing(animatedWidth, {
      toValue: targetWidthPercent,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }, [currentIndex, totalCount])

  const animatedWidthStyle = {
    flex: animatedWidth.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1], // Use flex to dynamically size the width
    }),
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Animated.View style={[styles.progressBar, animatedWidthStyle]} />
      </View>
      <Text style={styles.textStyle}>{`${
        currentIndex + 1
      } / ${totalCount}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  container: {
    flex: 1, // Make the container fill available space
    flexDirection: "row", // Ensure the animated view can be flexibly sized
    height: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    borderRadius: 4,
    marginRight: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "white",
  },
  textStyle: {
    color: "white",
    fontSize: 14,
  },
})

export default ProgressBar
