import {createTheming} from '@callstack/react-theme-provider';
import {StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import Spacing from './Spacing';
import {
  BLACK,
  GRAY200,
  GRAY500,
  ORANGE500,
  PINK500,
  PURPLE500,
  RED500,
  WHITE,
} from './Color';

export interface ITheme {
  fontFamily: {
    base: {
      light: string;
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    decorative: {
      light: string;
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    alternative: {
      light: string;
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
  fontSize: {
    header: number;
    intro: number;
    subheader: number;
    input: number;
    action: number;
    body: number;
    label: number;
    validation: number;
    navbar: number;
  };
  colors: {
    primaryColor: string;
    primaryColorDisabled: string;
    secondaryColor: string;
    textColor: string;
    labelColor: string;
    borderColor: string;
    placeholderColor: string;
    errorColor: string;
    dark: string;
    light: string;
    actionBackgroundColor: string;
    successColor: string;
    indicator: string;
    fadedText: string;
  };
  screenInset: number;
  roundness: number;
  cardRoundness: number;
  spacings: typeof Spacing;
  borderWidth: {
    default: number;
    '0': number;
    '1': number;
    '2': number;
    '4': number;
  };
  buttonHeight: number;
  inputHeight: number;
  inputAreaHeight: number;
  navbarHeight: number;
  shadowColor: {
    default: string;
    primary: string;
  };
}

const {ThemeProvider, withTheme, useTheme} = createTheming<ITheme>({
  fontFamily: {
    base: {
      light: 'HKGrotesk-Light',
      regular: 'HKGrotesk-Regular',
      medium: 'HKGrotesk-Medium',
      semibold: 'HKGrotesk-SemiBold',
      bold: 'HKGrotesk-Bold',
    },
    decorative: {
      light: 'Recoleta-Light',
      regular: 'Recoleta-Regular',
      medium: 'Recoleta-Medium',
      semibold: 'Recoleta-SemiBold',
      bold: 'Recoleta-Bold',
    },
    alternative: {
      light: 'RecoletaAlt-Light',
      regular: 'RecoletaAlt-Regular',
      medium: 'RecoletaAlt-Medium',
      semibold: 'RecoletaAlt-SemiBold',
      bold: 'RecoletaAlt-Bold',
    },
  },
  fontSize: {
    header: Spacing[28],
    intro: Spacing[22],
    subheader: Spacing[20],
    input: Spacing[18],
    action: Spacing[16],
    body: Spacing[14],
    label: Spacing[14],
    validation: Spacing[12],
    navbar: Spacing[16],
  },
  colors: {
    primaryColor: ORANGE500,
    // primaryColorDisabled: WARM_PINK_DISABLED,
    // secondaryColor: PURPLE500,
    // textColor: SEMI_BLACK,
    // labelColor: SEMI_BLACK,
    // borderColor: GRAY500,
    // placeholderColor: GRAY200,
    // errorColor: RED500,
    // dark: BLACK,
    // light: WHITE,
    // actionBackgroundColor: MILK_WHITE,
    // successColor: FOREST_GREEN,
    // indicator: PALE_PURPLE,
    // fadedText: `${SEMI_BLACK}66`,
  },
  screenInset: Spacing[24],
  roundness: Spacing[24],
  cardRoundness: 12,
  spacings: Spacing,
  borderWidth: {
    default: StyleSheet.hairlineWidth,
    '0': 0,
    '1': 1,
    '2': Spacing[2],
    '4': Spacing[4],
  },
  buttonHeight: Spacing[48],
  inputHeight: Spacing[60],
  inputAreaHeight: ms(100),
  navbarHeight: Spacing[48],
  shadowColor: {
    default: BLACK,
    primary: PINK500,
  },
});

export type ThemeType = typeof useTheme;
export {ThemeProvider, withTheme, useTheme};
