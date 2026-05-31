import { apiFetch } from "@/api/fetch";

import { queryClient } from "@/app/_layout";
import { CACHE_KEYS } from "@/constants/cacheKeys";
import { CatImage } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Vote {
  id: number;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  value: number;
  country_code: string;
  image: {
    id: string;
    url: string;
  };
}

export const useSetFavourite = () =>
  useMutation({
    mutationKey: [CACHE_KEYS.favourites],
    mutationFn: async (imageId: string) => {
      const result = await apiFetch<{ id: number }>("favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: imageId,
        }),
      });

      queryClient.setQueryData<CatImage[]>([CACHE_KEYS.catImages], (old) =>
        old?.map((cat) =>
          cat.id === imageId ? { ...cat, favourite: { id: result.id } } : cat,
        ),
      );
      return result;
    },
  });

export const useDeleteFavourite = () =>
  useMutation({
    mutationKey: [CACHE_KEYS.deleteFavourites],
    mutationFn: async (favouriteId: number) => {
      const result = await apiFetch(`favourites/${favouriteId}`, {
        method: "DELETE",
      });

      queryClient.setQueryData<CatImage[]>([CACHE_KEYS.catImages], (old) =>
        old?.map((cat) =>
          cat.favourite?.id === favouriteId
            ? { ...cat, favourite: undefined }
            : cat,
        ),
      );
      return result;
    },
  });

export const useVote = () =>
  useMutation({
    mutationKey: [CACHE_KEYS.votes],
    mutationFn: async (data: { imageId: string; value: number }) => {
      const result = await apiFetch("votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: data.imageId,
          value: data.value,
        }),
      });

      queryClient.invalidateQueries({
        queryKey: [CACHE_KEYS.votes, data.imageId],
      });

      return result;
    },
  });

export const useGetVotes = (imageId: string) => {
  const result = useQuery({
    queryKey: ["votes", imageId],
    queryFn: async () => {
      const result = await apiFetch<Vote[]>(`votes`);
      return result;
    },
  });
  return result.data;
};
