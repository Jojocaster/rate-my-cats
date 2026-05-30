import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";
import ImagePicker from "../ImagePicker/ImagePicker";

export const Header = () => {
  const { theme } = useUnistyles();
  return (
    <View
      style={{
        backgroundColor: theme.colors.palette.grey,
        padding: theme.space.md,
      }}
    >
      <SafeAreaView edges={["top"]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: theme.space.sm,
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              fontSize: theme.typography.title.fontSize,
            }}
          >
            Rate my cats
          </Text>
          <ImagePicker />
        </View>
      </SafeAreaView>
    </View>
  );
};
