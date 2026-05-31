import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import * as Picker from "expo-image-picker";
import { Alert } from "react-native";
import ImagePicker from "./ImagePicker";

const mockUpload = jest.fn();

const mockUseUploadImage = jest.fn();

jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

jest.mock("./ImagePicker.queries", () => ({
  useUploadImage: () => mockUseUploadImage(),
}));

jest.mock("lottie-react-native", () => {
  const { View } = require("react-native");
  return (props: any) => <View testID="lottie-view" {...props} />;
});

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  UIImagePickerPreferredAssetRepresentationMode: { Current: "current" },
}));

const mockAsset: Picker.ImagePickerAsset = {
  uri: "file:///photo.jpg",
  fileName: "photo.jpg",
  width: 400,
  height: 300,
  type: "image",
  assetId: null,
  mimeType: "image/jpeg",
};

describe("ImagePicker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockUseUploadImage.mockReturnValue({
      mutateAsync: mockUpload,
      data: null,
      error: null,
      isPending: false,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("requests permissions when the icon is tapped", async () => {
    (Picker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue(
      { granted: true },
    );
    (Picker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: true,
      assets: [],
    });

    render(<ImagePicker />);
    fireEvent.press(screen.getByTestId("image-picker-button"));

    await waitFor(() => {
      expect(Picker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
    });
  });

  it("shows an alert when permissions are denied", async () => {
    (Picker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue(
      { granted: false },
    );

    render(<ImagePicker />);
    fireEvent.press(screen.getByTestId("image-picker-button"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Permission required",
        "Permission to access the media library is required.",
      );
    });
  });

  it("does not launch picker when permissions are denied", async () => {
    (Picker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue(
      { granted: false },
    );

    render(<ImagePicker />);
    fireEvent.press(screen.getByTestId("image-picker-button"));

    await waitFor(() => {
      expect(Picker.launchImageLibraryAsync).not.toHaveBeenCalled();
    });
  });

  it("does not upload when picker is cancelled", async () => {
    (Picker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue(
      { granted: true },
    );
    (Picker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: true,
      assets: [],
    });

    render(<ImagePicker />);
    fireEvent.press(screen.getByTestId("image-picker-button"));

    await waitFor(() => {
      expect(Picker.launchImageLibraryAsync).toHaveBeenCalled();
    });

    expect(mockUpload).not.toHaveBeenCalled();
  });

  it("calls upload with the selected asset", async () => {
    (Picker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue(
      { granted: true },
    );
    (Picker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [mockAsset],
    });
    mockUpload.mockResolvedValue({ id: "uploaded-1" });

    render(<ImagePicker />);
    fireEvent.press(screen.getByTestId("image-picker-button"));

    await waitFor(() => {
      expect(mockUpload).toHaveBeenCalledWith(mockAsset);
    });
  });

  describe("upload status copy", () => {
    beforeEach(() => {
      (
        Picker.requestMediaLibraryPermissionsAsync as jest.Mock
      ).mockResolvedValue({ granted: true });
      (Picker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
        canceled: false,
        assets: [mockAsset],
      });
    });

    it("shows 'Uploading ...' when mutation is pending", async () => {
      mockUseUploadImage.mockReturnValue({
        mutateAsync: mockUpload,
        data: null,
        error: null,
        isPending: true,
      });

      const { getByText } = render(<ImagePicker />);
      fireEvent.press(screen.getByTestId("image-picker-button"));

      await waitFor(() => {
        expect(getByText("Uploading ...")).toBeTruthy();
      });
    });

    it("shows success message when upload data is returned", async () => {
      mockUseUploadImage.mockReturnValue({
        mutateAsync: mockUpload,
        data: { id: "uploaded-1" },
        error: null,
        isPending: false,
      });

      render(<ImagePicker />);
      fireEvent.press(screen.getByTestId("image-picker-button"));

      await waitFor(() => {
        expect(
          screen.getByText("Purrfect, the upload was successful!"),
        ).toBeTruthy();
      });
    });

    it("shows error message when upload fails", async () => {
      mockUseUploadImage.mockReturnValue({
        mutateAsync: mockUpload,
        data: null,
        error: new Error("Network error"),
        isPending: false,
      });

      render(<ImagePicker />);
      fireEvent.press(screen.getByTestId("image-picker-button"));

      await waitFor(() => {
        expect(
          screen.getByText("Oh no, something went wrong! Please try again."),
        ).toBeTruthy();
      });
    });
  });

  it("hides the modal after MODAL_TIMEOUT", async () => {
    (Picker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue(
      { granted: true },
    );
    (Picker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [mockAsset],
    });
    mockUpload.mockResolvedValue({ id: "uploaded-1" });

    render(<ImagePicker />);
    fireEvent.press(screen.getByTestId("image-picker-button"));

    await waitFor(() => {
      expect(mockUpload).toHaveBeenCalled();
    });

    // Modal should be visible
    expect(screen.getByTestId("lottie-view")).toBeTruthy();

    // Advance past MODAL_TIMEOUT
    jest.advanceTimersByTime(2500);

    await waitFor(() => {
      expect(screen.queryByTestId("lottie-view")).toBeNull();
    });
  });
});
