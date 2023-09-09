import { MD3LightTheme, configureFonts } from 'react-native-paper'
import { Font } from 'react-native-paper/lib/typescript/types';

type FontFamily =
  'AvenirLTStd-Black'
  | 'AvenirLTStd-Heavy'
  | 'AvenirLTStd-Medium'
  | 'AvenirLTStd-Roman'
  | 'Padauk-Bold'
  | 'Padauk-Regular'

const getFontType = (
  fontSize: number,
  fontWeight: Font['fontWeight'],
  fontFamily: FontFamily
) => {
  return { fontSize, fontWeight, fontFamily }
}

const enFontConfig = {
  light_13: getFontType(13, '300', 'AvenirLTStd-Roman'),
  light_14: getFontType(14, '300', 'AvenirLTStd-Roman'),

  regular_15: getFontType(15, '400', 'AvenirLTStd-Roman'),
  regular_16: getFontType(16, '400', 'AvenirLTStd-Roman'),
  regular_17: getFontType(17, '400', 'AvenirLTStd-Roman'),

  medium_16: getFontType(16, '500', 'AvenirLTStd-Medium'),
  medium_17: getFontType(17, '500', 'AvenirLTStd-Medium'),
  medium_18: getFontType(18, '500', 'AvenirLTStd-Medium'),
  medium_19: getFontType(19, '500', 'AvenirLTStd-Medium'),

  semibold_14: getFontType(14, '600', 'AvenirLTStd-Heavy'),
  semibold_16: getFontType(16, '600', 'AvenirLTStd-Heavy'),
  semibold_17: getFontType(17, '600', 'AvenirLTStd-Heavy'),
  semibold_18: getFontType(18, '600', 'AvenirLTStd-Heavy'),
  semibold_20: getFontType(20, '600', 'AvenirLTStd-Heavy'),
  semibold_22: getFontType(22, '600', 'AvenirLTStd-Heavy'),

  bold_22: getFontType(22, '800', 'AvenirLTStd-Black'),
  bold_24: getFontType(24, '800', 'AvenirLTStd-Black'),
  bold_26: getFontType(26, '800', 'AvenirLTStd-Black'),
  bold_28: getFontType(28, '800', 'AvenirLTStd-Black'),
  bold_30: getFontType(30, '800', 'AvenirLTStd-Black'),
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
    surfaceVariant: 'white',
    background: '#fff',
    text: '#202020',
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