import { StyleSheet } from "react-native-unistyles";

export const catCardStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    maxWidth: "50%",
    borderRadius: theme.space.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  innerContainer: {
    overflow: "hidden",
    position: "relative",
    borderRadius: theme.space.sm,
  },
  favouriteIcon: {
    position: "absolute",
    top: theme.space.sm,
    right: theme.space.sm,
    borderRadius: 50,
    backgroundColor: `rgba(255, 255, 255, 0.7)`,
    padding: theme.space.sm,
  },
  image: {
    backgroundColor: theme.colors.palette.white,
    width: "100%",
    height: 200,
  },
  footer: {
    padding: theme.space.sm,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.palette.white,
  },
}));
