import { StyleSheet } from "react-native-unistyles";

export const noCatsStylesheet = StyleSheet.create((theme) => ({
  container: {
    padding: theme.space.md,
    alignItems: "center",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    gap: theme.space.md,
  },
  subtitle: {
    fontFamily: "OpenSans_500Medium",
    fontSize: 16,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  blob: {
    width: 200,
    height: 200,
    alignSelf: "center",
    position: "absolute",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  cta: {
    fontFamily: "OpenSans_500Medium",
    fontSize: 16,
    textAlign: "center",
    maxWidth: "70%",
  },
}));
