import CatCard from "@/components/CatCard/CatCard";
import { CatImage } from "@/types/types";
import { FlatList } from "react-native";
import { catListStyles as styles } from "./CatList.style";

interface CatListProps {
  data: CatImage[];
}

const CatList = ({ data }: CatListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
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
