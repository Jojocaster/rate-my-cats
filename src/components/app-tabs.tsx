import { NativeTabs } from "expo-router/unstable-native-tabs";

import { useUnistyles } from "react-native-unistyles";

export default function AppTabs() {
  const { theme } = useUnistyles();

  return (
    <NativeTabs
      backgroundColor={theme.colors.palette.white}
      indicatorColor={theme.colors.palette.grey}
      iconColor={theme.colors.palette.purple}
      labelStyle={{ selected: { color: theme.colors.palette.purple } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/home.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Favourites</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="heart" renderingMode="template" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
