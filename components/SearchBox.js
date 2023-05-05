import React from "react"
import { TextInput, StyleSheet } from "react-native"

const SearchBox = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search..."
      onChangeText={props.onChangeText}
      value={props.value}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
  },
})

export default SearchBox
