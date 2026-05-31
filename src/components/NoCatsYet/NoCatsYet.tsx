import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { Text, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

const NoCatsYet = () => {
  const { theme } = useUnistyles();

  return (
    <View
      style={{
        padding: theme.space.md,
        alignItems: "center",
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        gap: theme.space.md,
      }}
    >
      <Text style={{ fontFamily: "OpenSans_500Medium", fontSize: 16 }}>
        Nothing to see here yet!
      </Text>
      <View
        style={{
          position: "relative",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/blob2.svg")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            position: "absolute",
          }}
        />
        <LottieView
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
          source={require("@/assets/lottie/cat.json")}
        />
      </View>
      <Text
        style={{
          fontFamily: "OpenSans_500Medium",
          fontSize: 16,
          textAlign: "center",
          maxWidth: "70%",
        }}
      >
        Why don't you upload a cat photo and get some ratings going?
      </Text>
    </View>
  );
};

export default NoCatsYet;
