import { getDefaultConfig } from 'expo/metro-config'

import type { MetroConfig } from '@expo/metro-config'

const defaultConfig = getDefaultConfig(__dirname)

if (!defaultConfig.resolver) {
  throw new Error('Metro resolver configuration is missing')
}

const config = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    assetExts: [...(defaultConfig.resolver.assetExts ?? []), 'png', 'jpg', 'jpeg'],
    sourceExts: [
      ...(defaultConfig.resolver.sourceExts ?? []),
      'css',
      'web.js',
      'web.jsx',
      'web.ts',
      'web.tsx',
    ],
    platforms: ['ios', 'android', 'web'],
    assetResolutions: defaultConfig.resolver.assetResolutions ?? ['1', '1.5', '2', '3', '4'],
  },
} as MetroConfig

export default config
