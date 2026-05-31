import { render } from "@testing-library/react-native";
import NoCatsYet from "./NoCatsYet";

jest.mock("lottie-react-native", () => "LottieView");

describe("NoCatsYet", () => {
  it("renders the empty state text", () => {
    const { getByText } = render(<NoCatsYet />);

    expect(getByText("Nothing to see here yet!")).toBeTruthy();
    expect(
      getByText("Why don't you upload a cat photo and get some ratings going?"),
    ).toBeTruthy();
  });
});
