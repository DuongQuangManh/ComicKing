import { MD3LightTheme, configureFonts } from 'react-native-paper'
import { Font } from 'react-native-paper/lib/typescript/types';

type FontFamily =
  'AvenirLTStd-Black'
  | 'AvenirLTStd-Heavy'
  | 'AvenirLTStd-Medium'
  | 'AvenirLTStd-Roman'
  | 'Padauk-Bold'
  | 'Padauk-Regular'
  |'Fredoka-Light'
  |'Fredoka-Medium'
  |'Fredoka-Regular'
  |'Fredoka-SemiBold'
  |'Fredoka-Bold'

const getFontType = (
  fontSize: number,
  fontWeight: Font['fontWeight'],
  fontFamily: FontFamily
) => {
  return { fontSize, fontWeight, fontFamily }
}

const enFontConfig = {
  light_12: getFontType(12, '300', 'Fredoka-Light'),
  light_13: getFontType(13, '300', 'Fredoka-Light'),
  light_14: getFontType(14, '300', 'Fredoka-Light'),

  regular_10: getFontType(10, '400', 'Fredoka-Regular'),
  regular_12:getFontType(12, '400', 'Fredoka-Regular'),
  regular_14: getFontType(14, '400', 'Fredoka-Regular'),
  regular_15: getFontType(15, '400', 'Fredoka-Regular'),
  regular_16: getFontType(16, '400', 'Fredoka-Regular'),
  regular_17: getFontType(17, '400', 'Fredoka-Regular'),

  medium_12: getFontType(12, '500', 'Fredoka-Medium'),
  medium_14: getFontType(14, '500', 'Fredoka-Medium'),
  medium_16: getFontType(16, '500', 'Fredoka-Medium'),
  medium_17: getFontType(17, '500', 'Fredoka-Medium'),
  medium_18: getFontType(18, '500', 'Fredoka-Medium'),
  medium_19: getFontType(19, '500', 'Fredoka-Medium'),

  semibold_12: getFontType(12, '600', 'Fredoka-SemiBold'),
  semibold_14: getFontType(14, '600', 'Fredoka-SemiBold'),
  semibold_16: getFontType(16, '600', 'Fredoka-SemiBold'),
  semibold_17: getFontType(17, '600', 'Fredoka-SemiBold'),
  semibold_18: getFontType(18, '600', 'Fredoka-SemiBold'),
  semibold_20: getFontType(20, '600', 'Fredoka-SemiBold'),
  semibold_22: getFontType(22, '600', 'Fredoka-SemiBold'),
  
  bold_14: getFontType(14, '800', 'Fredoka-Bold'),
  bold_16: getFontType(16, '800', 'Fredoka-Bold'),
  bold_18: getFontType(18, '800', 'Fredoka-Bold'),
  bold_20: getFontType(20, '800', 'Fredoka-Bold'),
  bold_22: getFontType(22, '800', 'Fredoka-Bold'),
  bold_24: getFontType(24, '800', 'Fredoka-Bold'),
  bold_26: getFontType(26, '800', 'Fredoka-Bold'),
  bold_28: getFontType(28, '800', 'Fredoka-Bold'),
  bold_30: getFontType(30, '800', 'Fredoka-Bold'),
} as const
export type KeyFontType = keyof typeof enFontConfig

interface IFonts {
  en: any,
  vn: any,
}

export const fonts: IFonts = {
  en: enFontConfig,
  vn: enFontConfig
};

const fontConfig = {
  ios: enFontConfig,
  android: enFontConfig,
  default: enFontConfig,
};

//Your main theme
export const myTheme = {
  ...MD3LightTheme,
  // ...DefaultTheme.colors,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#fb6d78',
    primary_60: '#fb6d79a2',
    primary_80: '#fb6d79cb',
    surfaceVariant: 'white',
    background: '#fff',
    background_dark: '#000',
    text: '#202020',
    text_dark: '#fff',
    textHint: '#74747494',
    gray:'#efeeee',
    blackCustom:'#334249',
    transparentWhite:'#fffffff0',
    transparentGray: '#8787878d',
    transparent: 'transparent',
    backgroundMsg: '#0000002d',
    disablePrimary: '#fb6d798f'
  },
  fonts: configureFonts({ config: fontConfig as any, isV3: false }) as any,
  roundness: 5
}

export const myColors = myTheme.colors