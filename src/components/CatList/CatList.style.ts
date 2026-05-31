import { Platform } from 'react-native';
import { StyleSheet } from "react-native-unistyles";

export const catListStyles = StyleSheet.create((theme) => ({
  columnWrapper: {
    gap: theme.space.md,
  },
  contentContainer: {
    padding: theme.space.md,
    paddingBottom: Platform.OS === 'ios' ? theme.space.xxl : theme.space.md,
    gap: theme.space.md,
  },
}));
