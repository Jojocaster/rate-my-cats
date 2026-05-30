import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import {
  OpenSans_500Medium,
  OpenSans_700Bold,
  useFonts,
} from "@expo-google-fonts/open-sans";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
  const [loaded, error] = useFonts({
    OpenSans_500Medium,
    OpenSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <AnimatedSplashOverlay />
      {/* <View style={{ padding: 24 }}> */}
      <AppTabs />
      {/* </View> */}
    </>
  );
}
