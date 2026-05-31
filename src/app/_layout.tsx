import { apiFetch } from "@/api/fetch";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import {
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  useFonts,
} from "@expo-google-fonts/open-sans";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => apiFetch(queryKey[0] as string),
    },
  },
});

export default function TabLayout() {
  const [loaded, error] = useFonts({
    OpenSans_500Medium,
    OpenSans_600SemiBold,
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
    <QueryClientProvider client={queryClient}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </QueryClientProvider>
  );
}
