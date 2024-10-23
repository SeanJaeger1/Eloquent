import React from 'react'

import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native'

import palette from '../../palette'

const LoadingPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={palette.secondary} />
    </View>
  )
}

interface Styles {
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingPage
