import { Header } from "@/components/Header/Header";
import NoCatsYet from "@/components/NoCatsYet/NoCatsYet";
import { ScrollView, Text } from "react-native";
import { useUnistyles } from "react-native-unistyles";

const Home = () => {
  const { theme } = useUnistyles();
  return (
    <>
      <Header />
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.palette.white,

          flex: 1,
          padding: theme.space.md,
        }}
      >
        <Text>some text</Text>
        <NoCatsYet />
      </ScrollView>
    </>
  );
};

export default Home;
