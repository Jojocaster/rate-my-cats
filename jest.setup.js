jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-nitro-modules", () => ({}));

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/lib/module/mock')
);
