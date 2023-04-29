import { View, Text, StyleSheet } from "react-native"

export default function CardPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Well done</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
})
