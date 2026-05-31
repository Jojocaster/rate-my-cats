import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { Text, View } from "react-native";
import { noCatsStylesheet as styles } from "./NoCatsYet.style";

const NoCatsYet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Nothing to see here yet!</Text>
      <View style={styles.imageWrapper}>
        <Image
          source={require("@/assets/images/blob2.svg")}
          style={styles.blob}
        />
        <LottieView
          autoPlay
          loop
          style={styles.lottie}
          source={require("@/assets/lottie/cat.json")}
        />
      </View>
      <Text style={styles.cta}>
        Why don't you upload a cat photo and get some ratings going?
      </Text>
    </View>
  );
};

export default NoCatsYet;
