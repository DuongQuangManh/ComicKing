module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        extensions: ['.ios.tsx', '.android.tsx', '.js', '.ts', '.tsx', '.json'],
        alias: {
          // This needs to be mirrored in tsconfig.json
          '@components': "./src/components",
          '@models': "./src/models",
          '@navigations': './src/navigations',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@api': './src/api',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@items':'./src/items',
        },
      },
    ],
    [
      'inline-dotenv',
      {
        systemVar: 'overwrite',
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ]
};
