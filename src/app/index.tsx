import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";

const Home = () => {
  const { theme } = useUnistyles();
  return (
    <>
      <View
        style={{
          backgroundColor: theme.colors.palette.grey,
          padding: theme.space.md,
        }}
      >
        <SafeAreaView>
          <Text
            style={{
              fontFamily: "OpenSans_500Medium",
              fontSize: theme.typography.title.fontSize,
            }}
          >
            Rate my cats
          </Text>
        </SafeAreaView>
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.palette.white,

          flex: 1,
          padding: theme.space.md,
        }}
      >
        <Text>some text</Text>
      </ScrollView>
    </>
  );
};

export default Home;
