import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import ThemeProvider from "@/context/ThemeContext";
import LocaleProvider from "@/context/LocaleContext";
import PortalProvider from "@/context/PortalContext";
import { DbProvider } from "@/context/DbContext";
import { PrimaryColor } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LoadingProvider } from "@/context/LoadingContext";
import { useDb } from "@/context/DbContext";
import { useLoading } from "@/hooks/useLoading";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { NotificationsProvider, useNotifications } from "@/context/NotificationContext";

SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const textColor = useThemeColor("text");
  const backgroundColor = useThemeColor("background");
  const { isLoading } = useLoading();
  const { dbReady } = useDb();
  const { isSynchronized } = useNotifications();

  useEffect(() => {
    if (loaded && dbReady && isSynchronized) {
      setTimeout(() => SplashScreen.hideAsync(), 320);
    }
  }, [loaded, dbReady, isSynchronized]);

  if (!loaded || !dbReady) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTitleStyle: { color: textColor },
          headerStyle: { backgroundColor: backgroundColor },
          headerTintColor: PrimaryColor,
        }}
      >
        <Stack.Screen
          name="(screens)/(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
      {isLoading && <LoadingOverlay />}
    </>
  );
}

export default function RootLayout() {
  return (
    <PortalProvider>
      <LocaleProvider>
        <ThemeProvider>
          <LoadingProvider>
            <DbProvider>
              <NotificationsProvider>
                <AppLayout />
              </NotificationsProvider>
            </DbProvider>
          </LoadingProvider>
        </ThemeProvider>
      </LocaleProvider>
    </PortalProvider>
  );
}
