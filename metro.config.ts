import { getDefaultConfig } from 'expo/metro-config'

import type { MetroConfig } from '@expo/metro-config'

const config = getDefaultConfig(__dirname) as MetroConfig

config.resolver.assetExts = [...(config.resolver.assetExts || []), 'png', 'jpg', 'jpeg']
config.resolver.sourceExts = [...(config.resolver.sourceExts || []), 'css']

// Enable web support
config.resolver.platforms = ['ios', 'android', 'web']

// Handle web-specific file extensions
config.resolver.sourceExts = [
  ...(config.resolver.sourceExts || []),
  'web.js',
  'web.jsx',
  'web.ts',
  'web.tsx',
]

export default config
