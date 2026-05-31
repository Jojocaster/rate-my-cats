import { apiFetch } from "@/api/fetch";
import { queryClient } from "@/app/_layout";
import Entypo from "@expo/vector-icons/Entypo";
import { useMutation } from "@tanstack/react-query";
import { File } from "expo-file-system";
import * as Picker from "expo-image-picker";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Alert, Modal, Text, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

const ImagePicker = () => {
  const { theme } = useUnistyles();

  const [isUploaded, setUploaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const uploadPhoto = async (asset: Picker.ImagePickerAsset) => {
    try {
      await upload(asset);

      setUploaded(true);
      queryClient.invalidateQueries({ queryKey: ["images?limit=10"] });

      setTimeout(() => {
        setIsModalVisible(false);
      }, 2000);
    } catch {
      setIsModalVisible(false);
    }
  };

  const { mutateAsync: upload } = useMutation({
    mutationKey: ["images/upload"],
    mutationFn: async (asset: Picker.ImagePickerAsset) => {
      const formData = new FormData();

      formData.append(
        "file",
        new File(asset.uri),
        asset.fileName ?? "photo.jpg",
      );

      return apiFetch("images/upload", {
        method: "POST",
        body: formData,
      });
    },
  });

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
          size={32}
          color={theme.colors.palette.white}
          onPress={pickImage}
        />
      </View>
      <Modal visible={isModalVisible} animationType="fade">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            autoPlay
            style={{
              width: 300,
              height: 300,
              flexShrink: 1,
              alignSelf: "center",
            }}
            source={require("@/assets/lottie/catLoading.json")}
          />
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {isUploaded ? "Purrfect, upload successful!" : "Uploading ..."}
          </Text>
        </View>
      </Modal>
    </>
  );
};

export default ImagePicker;
