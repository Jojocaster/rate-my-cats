import { apiFetch } from "@/api/fetch";
import CatList from "@/components/CatList/CatList";
import { Header } from "@/components/Header/Header";
import NoCatsYet from "@/components/NoCatsYet/NoCatsYet";
import { CACHE_KEYS } from "@/constants/cacheKeys";
import { CatImage } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_LIMIT = 10;

const Home = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<CatImage[]>({
      queryKey: [CACHE_KEYS.catImages],
      queryFn: ({ pageParam }) =>
        apiFetch<CatImage[]>(`images?limit=${PAGE_LIMIT}&page=${pageParam}`),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _allPages, lastPageParam) =>
        lastPage?.length < PAGE_LIMIT
          ? undefined
          : (lastPageParam as number) + 1,
    });

  const allImages = data?.pages.flat() ?? [];

  return (
    <>
      <Header />

      {allImages.length ? (
        <CatList
          loading={isFetchingNextPage}
          data={allImages}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      ) : (
        <NoCatsYet />
      )}
    </>
  );
};

export default Home;
