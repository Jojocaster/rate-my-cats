import { render, screen } from "@testing-library/react-native";
import { Header } from "./Header";

jest.mock("../ImagePicker/ImagePicker", () => () => null);

describe("Header", () => {
  it("renders the title", () => {
    render(<Header />);

    expect(screen.getByText("Rate my cats")).toBeTruthy();
  });
});
