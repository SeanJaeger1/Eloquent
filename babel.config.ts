import type { ConfigFunction } from '@babel/core'

const config: ConfigFunction = (api): ReturnType<ConfigFunction> => {
  api.cache.forever()
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
  }
}

export default config
