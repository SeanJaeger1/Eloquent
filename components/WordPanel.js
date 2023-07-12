import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Audio } from 'expo-av';
import { Icon } from "react-native-elements";

import palette from "../palette";
import ProgressMeter from "./ProgressMeter"

const WordPanel = ({ userWord }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [sound, setSound] = useState();
  const { word: { definition, meaning, word, wordType, audioUrl }, progress } = userWord

  const handlePress = () => {
    setIsExpanded(!isExpanded)
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUrl }
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.boldText}>{word}, {wordType} </Text>
          {
            audioUrl && (<TouchableOpacity onPress={playSound}>
              <Icon name='volume-up' type='font-awesome' color={palette.secondary} />
            </TouchableOpacity>)
          }
        </View>
        <View style={styles.row}>
          <ProgressMeter value={progress} />
        </View>
        <View style={styles.row}>
          <Text>{meaning}</Text>
        </View>
        {isExpanded && (
          <View style={styles.row}>
            <Text>{definition}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: '1px 1px 2px 1px rgba(0, 0, 0, 0.25)',
    marginBottom: 20,
    marginHorizontal: 8
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 8
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
})

export default WordPanel
