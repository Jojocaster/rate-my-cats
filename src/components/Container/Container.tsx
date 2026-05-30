import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";

export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useUnistyles();
  return (
    <SafeAreaView>
      <View style={{ padding: theme.space.md }}>{children}</View>
    </SafeAreaView>
  );
};
