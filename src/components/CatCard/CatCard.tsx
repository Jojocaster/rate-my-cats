import { apiFetch } from "@/api/fetch";
import { CatImage } from "@/app";
import { queryClient } from "@/app/_layout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

interface CatCardProps {
  item: CatImage;
  isLastOdd: boolean;
}

const CatCard = ({ item, isLastOdd }: CatCardProps) => {
  const { theme } = useUnistyles();
  const isFavourite = !!item.favourite?.id;
  console.log(isFavourite);

  const toggleFavourite = (item: CatImage) => {
    if (isFavourite) {
      deleteFavourite(item.favourite?.id!);
    } else {
      setFavourite(item.id);
    }
  };

  const { mutate: setFavourite, data } = useMutation({
    mutationKey: ["favourites"],
    mutationFn: async (imageId: string) => {
      await apiFetch("favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: item.id,
        }),
      });

      queryClient.invalidateQueries({ queryKey: ["images?limit=10"] });
    },
  });

  const { mutate: deleteFavourite } = useMutation({
    mutationKey: ["deleteFavourites"],
    mutationFn: async (favouriteId: number) => {
      await apiFetch(`favourites/${favouriteId}`, {
        method: "DELETE",
      });

      queryClient.invalidateQueries({ queryKey: ["images?limit=10"] });
    },
  });

  return (
    <View
      style={{
        flex: 1,
        maxWidth: "50%",
        paddingRight: isLastOdd ? theme.space.sm : 0,
        overflow: "hidden",
        borderRadius: theme.space.sm,
      }}
    >
      <Image
        contentFit="cover"
        source={{ uri: item.url }}
        style={{
          width: "100%",
          height: 200,
        }}
      />
      <View
        style={{
          padding: theme.space.sm,
          alignItems: "center",
          backgroundColor: theme.colors.palette.white,
        }}
      >
        <Pressable onPress={() => toggleFavourite(item)}>
          <Ionicons
            name={isFavourite ? "heart" : "heart-outline"}
            size={24}
            color={theme.colors.palette.purple}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default CatCard;
