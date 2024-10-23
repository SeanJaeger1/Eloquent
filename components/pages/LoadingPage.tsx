import type React from 'react'

import { View, ActivityIndicator, StyleSheet } from 'react-native'

import palette from '../../palette'

import type { ViewStyle } from 'react-native'

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
