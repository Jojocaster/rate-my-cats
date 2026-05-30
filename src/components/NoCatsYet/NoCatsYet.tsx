import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { Text, View } from "react-native";

const NoCatsYet = () => {
  return (
    <View
      style={{
        alignItems: "center",
        borderColor: "#E0E0E0",
      }}
    >
      <View
        style={{
          position: "relative",
          width: "100%",
          height: 300,
          marginTop: 16,

          justifyContent: "center",
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
      <Text style={{ fontFamily: "OpenSans_500Medium", fontSize: 16 }}>
        Nothing to see here - yet
      </Text>
    </View>
  );
};

export default NoCatsYet;
