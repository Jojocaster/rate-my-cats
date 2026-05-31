import { StyleSheet } from "react-native-unistyles";

export const headerStylesheet = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.palette.purple,
    padding: theme.space.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.space.sm,
  },
  title: {
    color: theme.colors.palette.white,
    fontFamily: "OpenSans_600SemiBold",
    fontSize: theme.typography.title.fontSize,
  },
}));
