import { CatImage } from "@/types/types";
import { fireEvent, render, screen } from "@testing-library/react-native";
import CatList from "./CatList";

jest.mock("@/components/CatCard/CatCard", () => {
  const { View, Text } = require("react-native");
  return {
    __esModule: true,
    default: ({ item }: { item: CatImage }) => (
      <View testID={`cat-card-${item.id}`}>
        <Text>{item.id}</Text>
      </View>
    ),
  };
});

jest.mock("lottie-react-native", () => {
  const { View } = require("react-native");

  return ({ testID }: { testID?: string }) => <View testID={testID ?? "lottie-view"} />;
});

const mockData: CatImage[] = [
  { id: "cat-1", url: "https://example.com/1.jpg", width: 400, height: 300 },
  { id: "cat-2", url: "https://example.com/2.jpg", width: 400, height: 300 },
  { id: "cat-3", url: "https://example.com/3.jpg", width: 400, height: 300 },
];

describe("CatList", () => {
  it("renders a card for each item", () => {
    render(<CatList data={mockData} />);

    expect(screen.getByTestId("cat-card-cat-1")).toBeTruthy();
    expect(screen.getByTestId("cat-card-cat-2")).toBeTruthy();
    expect(screen.getByTestId("cat-card-cat-3")).toBeTruthy();
  });

  it("renders nothing when data is empty", () => {
    render(<CatList data={[]} />);

    expect(screen.queryByTestId("cat-card-cat-1")).toBeNull();
  });

  it("calls onEndReached when list end is reached", () => {
    const onEndReached = jest.fn();
    render(<CatList data={mockData} onEndReached={onEndReached} />);

    const flatList = screen.getByTestId("cat-list");
    fireEvent(flatList, "endReached");

    expect(onEndReached).toHaveBeenCalled();
  });

  it("shows loading animation when loading is true", () => {
    render(<CatList data={mockData} loading={true} />);

    expect(screen.getByTestId("lottie-view")).toBeTruthy();
  });

  it("does not show loading animation when loading is false", () => {
    render(<CatList data={mockData} loading={false} />);

    expect(screen.queryByTestId("lottie-view")).toBeNull();
  });
});
