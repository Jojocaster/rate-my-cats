import { useGetVotes, useVote } from "@/components/CatCard/CatCard.queries";

const useVotesByImage = (imageId: string) => {
  const votes = useGetVotes(imageId);
  const { mutateAsync: toggleVote, isPending } = useVote();

  const votesByImage = votes?.filter((vote) => vote.image_id === imageId);
  const score = votesByImage?.reduce((acc, vote) => acc + vote.value, 0) || 0;

  return {
    score,
    vote: toggleVote,
    loading: isPending,
  };
};

export default useVotesByImage;
