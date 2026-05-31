import Entypo from "@expo/vector-icons/Entypo";
import * as Picker from "expo-image-picker";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Alert, Modal, Text, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { MODAL_TIMEOUT } from "./ImagePicker.constants";
import { useUploadImage } from "./ImagePicker.queries";
import { imagePickerStylesheet as styles } from "./ImagePicker.style";

const ImagePicker = () => {
  const { theme } = useUnistyles();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    mutateAsync: upload,
    data: uploadData,
    error,
    isPending,
  } = useUploadImage();

  const uploadPhoto = async (asset: Picker.ImagePickerAsset) => {
    try {
      await upload(asset);
    } catch (e) {
      console.log("There was an error uploading the image", e);
    } finally {
      setTimeout(() => {
        setIsModalVisible(false);
      }, MODAL_TIMEOUT);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult = await Picker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await Picker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsModalVisible(true);

      uploadPhoto(result.assets[0]);
    }
  };

  return (
    <>
      <View>
        <Entypo
          name="plus"
          size={theme.tokens.icons.lg}
          color={theme.colors.palette.white}
          onPress={pickImage}
        />
      </View>
      <Modal visible={isModalVisible} animationType="fade">
        <View style={styles.modalContent}>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("@/assets/lottie/catLoading.json")}
          />
          <Text style={styles.statusText}>
            {isPending ? "Uploading ..." : null}
            {uploadData ? "Purrfect, the upload was successful!" : null}
            {error ? "Oh no, something went wrong! Please try again." : null}
          </Text>
        </View>
      </Modal>
    </>
  );
};

export default ImagePicker;
