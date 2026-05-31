import { fireEvent, render, screen } from "@testing-library/react-native";
import CatCard from "./CatCard";

const mockSetFavourite = jest.fn().mockResolvedValue({ id: 99 });
const mockDeleteFavourite = jest.fn().mockResolvedValue({});
const mockVote = jest.fn().mockResolvedValue({});

jest.mock("./CatCard.queries", () => ({
  useSetFavourite: () => ({
    mutateAsync: mockSetFavourite,
    isPending: false,
  }),
  useDeleteFavourite: () => ({
    mutateAsync: mockDeleteFavourite,
    isPending: false,
  }),
  useVote: () => ({
    mutateAsync: mockVote,
    isPending: false,
  }),
  useGetVotes: () => [],
}));

jest.mock("@/hooks/useVotesByImage", () => ({
  useVotesByImage: () => ({
    score: 5,
    vote: mockVote,
    loading: false,
  }),
}));

const mockItem = {
  id: "cat-1",
  url: "https://example.com/cat.jpg",
  width: 400,
  height: 300,
  favourite: undefined,
};

const mockFavouritedItem = {
  ...mockItem,
  favourite: { id: 42 },
};

describe("CatCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the score text", () => {
    render(<CatCard item={mockItem} isLastOdd={false} />);

    expect(screen.getByText("Score: 5")).toBeTruthy();
  });

  it("calls setFavourite when heart is pressed on unfavourited item", () => {
    render(<CatCard item={mockItem} isLastOdd={false} />);

    const heartButton = screen.getByTestId("favourite-button");
    fireEvent.press(heartButton);

    expect(mockSetFavourite).toHaveBeenCalledWith("cat-1");
  });

  it("calls deleteFavourite when heart is pressed on favourited item", () => {
    render(<CatCard item={mockFavouritedItem} isLastOdd={false} />);

    const heartButton = screen.getByTestId("favourite-button");
    fireEvent.press(heartButton);

    expect(mockDeleteFavourite).toHaveBeenCalledWith(42);
  });

  it("calls vote with thumbs up value when thumbs up is pressed", () => {
    render(<CatCard item={mockItem} isLastOdd={false} />);

    const thumbsUpButton = screen.getByTestId("thumbs-up-button");
    fireEvent.press(thumbsUpButton);

    expect(mockVote).toHaveBeenCalledWith({ imageId: "cat-1", value: 1 });
  });

  it("calls vote with thumbs down value when thumbs down is pressed", () => {
    render(<CatCard item={mockItem} isLastOdd={false} />);

    const thumbsDownButton = screen.getByTestId("thumbs-down-button");
    fireEvent.press(thumbsDownButton);

    expect(mockVote).toHaveBeenCalledWith({ imageId: "cat-1", value: -1 });
  });
});
