module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module:react-native-dotenv',
        { moduleName: '@env', allowUndefined: false },
        'react-native-reanimated/plugin',
      ],
    ],
  }
}
