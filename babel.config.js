module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './app/components',
          '@modules': './app/modules',
          '@navigators': './app/navigators',
          '@styles': './app/styles',
          '@utils': './app/utils',
          '@assets': './assets',
          '@services': './app/services',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
