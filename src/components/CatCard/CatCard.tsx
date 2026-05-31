import useVotesByImage from "@/hooks/useVotesByImage";
import { CatImage } from "@/types/types";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import PressableFeedback from "../PressableFeedback/PressableFeedback";
import { useDeleteFavourite, useSetFavourite } from "./CatCard.queries";
import { catCardStyles as styles } from "./CatCard.style";

interface CatCardProps {
  item: CatImage;
  isLastOdd: boolean;
}

const THUMBS_DOWN_VALUE = -1;
const THUMBS_UP_VALUE = 1;

const CatCard = ({ item, isLastOdd }: CatCardProps) => {
  const { theme } = useUnistyles();
  const isFavourite = !!item.favourite?.id;

  const { score, vote, loading } = useVotesByImage(item.id);

  const { mutateAsync: setFavourite, isPending: isSettingFavourite } =
    useSetFavourite();
  const { mutateAsync: deleteFavourite, isPending: isDeletingFavourite } =
    useDeleteFavourite();

  const isUpdating = loading || isSettingFavourite || isDeletingFavourite;

  const voteForCat = async (value: number) => {
    await vote({ imageId: item.id, value });
  };

  const toggleFavourite = async (item: CatImage) => {
    if (isFavourite) {
      await deleteFavourite(item.favourite?.id!);
    } else {
      await setFavourite(item.id);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingRight: isLastOdd ? theme.space.sm : 0 },
      ]}
    >
      <View style={styles.innerContainer}>
        <Image
          contentFit="cover"
          source={{ uri: item.url }}
          style={styles.image}
        />
        <View style={styles.favouriteIcon}>
          <PressableFeedback
            disabled={isUpdating}
            onPress={() => toggleFavourite(item)}
          >
            <Ionicons
              name={isFavourite ? "heart" : "heart-outline"}
              size={theme.tokens.icons.md}
              color={theme.colors.palette.purple}
            />
          </PressableFeedback>
        </View>
        <View style={styles.footer}>
          <PressableFeedback
            disabled={isUpdating}
            onPress={() => voteForCat(THUMBS_UP_VALUE)}
          >
            <Feather
              name={"thumbs-up"}
              size={theme.tokens.icons.md}
              color={theme.colors.palette.purple}
            />
          </PressableFeedback>
          <Text>Score: {score}</Text>
          <PressableFeedback
            disabled={isUpdating}
            onPress={() => voteForCat(THUMBS_DOWN_VALUE)}
          >
            <Feather
              name={"thumbs-down"}
              size={theme.tokens.icons.md}
              color={theme.colors.palette.purple}
            />
          </PressableFeedback>
        </View>
      </View>
    </View>
  );
};

export default CatCard;
