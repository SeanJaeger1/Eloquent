import 'dotenv/config'
import type { ExpoConfig } from 'expo/config'

// Function to ensure env variables are defined
const requireEnv = (name: string): string => {
  // Using Record type assertion to properly type process.env
  const env = process.env as Record<string, string | undefined>
  const value = env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

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
    buildNumber: '2',
  },
  android: {
    package: 'com.seanjaeger.eloquent',
    versionCode: 2,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    favicon: './assets/eloquent-favicon.png',
    name: 'Eloquent',
    startUrl: '/',
    backgroundColor: '#ffffff',
    themeColor: '#ffffff',
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      minimumScale: 1,
    },
    resizeMode: 'contain',
    meta: {
      name: {
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      },
    },
  },
  extra: {
    firebaseConfig: {
      apiKey: requireEnv('FIREBASE_API_KEY'),
      authDomain: requireEnv('FIREBASE_AUTH_DOMAIN'),
      projectId: requireEnv('FIREBASE_PROJECT_ID'),
      storageBucket: requireEnv('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: requireEnv('FIREBASE_MESSAGING_SENDER_ID'),
      appId: requireEnv('FIREBASE_APP_ID'),
      measurementId: requireEnv('FIREBASE_MEASUREMENT_ID'),
    },
    GOOGLE_TEXT_SPEECH_API_KEY: requireEnv('GOOGLE_TEXT_SPEECH_API_KEY'),
    eas: {
      projectId: '9ef30b88-ee33-41c5-9039-11c413596d0a',
    },
  },
  owner: 'seanjaeger123',
  plugins: ['expo-router', 'expo-font'],
  newArchEnabled: true,
}

export default config
