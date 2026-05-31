import { StyleSheet } from "react-native-unistyles";

export const catListStyles = StyleSheet.create((theme) => ({
  columnWrapper: {
    gap: theme.space.md,
  },
  contentContainer: {
    padding: theme.space.md,
    paddingBottom: theme.space.xxl,
    gap: theme.space.md,
  },
}));
