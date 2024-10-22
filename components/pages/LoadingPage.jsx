import { View, ActivityIndicator, StyleSheet } from 'react-native'

import palette from '../../palette'

const LoadingPage = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={palette.secondary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingPage
