import CatList from "@/components/CatList/CatList";
import { Header } from "@/components/Header/Header";
import NoCatsYet from "@/components/NoCatsYet/NoCatsYet";
import { CACHE_KEYS } from "@/constants/cacheKeys";
import { CatImage } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data } = useQuery<CatImage[]>({
    queryKey: [CACHE_KEYS.catImages],
  });

  return (
    <>
      <Header />

      {data?.length ? <CatList data={data} /> : <NoCatsYet />}
    </>
  );
};

export default Home;
