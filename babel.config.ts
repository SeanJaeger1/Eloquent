import { ConfigFunction } from '@babel/core'

const config: ConfigFunction = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
  }
}

export default config
