import { StyleSheet } from "react-native-unistyles";

export const imagePickerStylesheet = StyleSheet.create((theme) => ({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 300,
    height: 300,
    flexShrink: 1,
    alignSelf: "center",
  },
  statusText: {
    color: theme.colors.palette.purple,
    fontSize: theme.typography.title.fontSize,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
    maxWidth: "80%",
  },
}));
