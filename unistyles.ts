import { StyleSheet } from "react-native-unistyles";

export const none = 0;
export const xxs = 2;
export const xs = 4;
export const sm = 8;
export const md = 16;
export const lg = 32;
export const xl = 64;
export const xxl = 128;

export const space = {
  none,
  xxs,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
} as const;

const typography = {
  title: {
    fontSize: 24,
    fontWeight: 700,
  },
};

const tokens = {
  icons: {
    md: 24,
    lg: 32,
  },
};

const colors = {
  palette: {
    white: "#FFFFFF",
    grey: "#F2F2F2",
    purple: "#715DF2",
  },
};

const themes = {
  default: {
    colors,
    space,
    typography,
    tokens,
  },
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 430,
  lg: 800,
  xl: 1200,
};

type AppThemes = typeof themes;
type AppBreakpoints = typeof breakpoints;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  themes,
  breakpoints,
});
