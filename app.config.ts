import 'dotenv/config'
import type { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
  name: 'Eloquent',
  slug: 'eloquent',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.seanjaeger.eloquent',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'webpack',
    output: 'static',
    favicon: './assets/eloquent-favicon.png',
  },
  extra: {
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    GOOGLE_TEXT_SPEECH_API_KEY: process.env.GOOGLE_TEXT_SPEECH_API_KEY,
    eas: {
      projectId: '9ef30b88-ee33-41c5-9039-11c413596d0a',
    },
  },
  owner: 'seanjaeger123',
}

export default config
