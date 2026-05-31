import { apiFetch } from "@/api/fetch";
import { queryClient } from "@/app/_layout";
import { CACHE_KEYS } from "@/constants/cacheKeys";
import { useMutation } from "@tanstack/react-query";
import { File } from "expo-file-system";
import * as Picker from "expo-image-picker";

export const useUploadImage = () =>
  useMutation({
    mutationKey: [CACHE_KEYS.uploadImage],
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.catImages] });
    },
  });
