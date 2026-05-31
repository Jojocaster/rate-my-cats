import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "../ImagePicker/ImagePicker";
import { headerStylesheet as styles } from "./Header.style";

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]}>
        <View style={styles.row}>
          <Text style={styles.title}>Rate my cats</Text>
          <ImagePicker />
        </View>
      </SafeAreaView>
    </View>
  );
};
