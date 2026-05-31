import CatCard from "@/components/CatCard/CatCard";
import { CatImage } from "@/types/types";
import LottieView from "lottie-react-native";
import { FlatList, View } from "react-native";
import { catListStyles as styles } from "./CatList.style";

interface CatListProps {
  data: CatImage[];
  onEndReached?: () => void;
  loading?: boolean;
}

const CatList = ({ data, onEndReached, loading }: CatListProps) => {
  return (
    <FlatList
      testID="cat-list"
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      ListFooterComponent={() =>
        loading ? (
          <View style={{ alignItems: "center" }}>
            <LottieView
              autoPlay
              loop
              style={{ width: 96, height: 96 }}
              source={require("@/assets/lottie/cat.json")}
            />
          </View>
        ) : null
      }
      renderItem={({ item, index }) => (
        <CatCard
          item={item}
          isLastOdd={index === data.length - 1 && index % 2 === 0}
        />
      )}
    />
  );
};

export default CatList;
