import CatCard from "@/components/CatCard/CatCard";
import { Header } from "@/components/Header/Header";
import NoCatsYet from "@/components/NoCatsYet/NoCatsYet";
import { useQuery } from "@tanstack/react-query";

import { FlatList } from "react-native";

import { useUnistyles } from "react-native-unistyles";

export interface CatImage {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
  favourite?: {
    id: number;
  };
}

const Home = () => {
  const { theme } = useUnistyles();
  const { data } = useQuery<CatImage[]>({
    queryKey: ["images?limit=10"],
  });

  console.log(data?.[0]);

  return (
    <>
      <Header />

      {!data?.length ? (
        <NoCatsYet />
      ) : (
        <FlatList
          data={[data[0]]}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: theme.space.md }}
          contentContainerStyle={{
            padding: theme.space.md,
            paddingBottom: theme.space.xxl,
            gap: theme.space.md,
          }}
          renderItem={({ item, index }) => (
            <CatCard
              item={item}
              isLastOdd={index === data.length - 1 && index % 2 === 0}
            />
          )}
        />
      )}
    </>
  );
};

export default Home;
