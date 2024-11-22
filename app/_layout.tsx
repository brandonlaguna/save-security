import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import useThemeProvider from "@/hooks/useTheme";
import { ThemeProvider } from "styled-components/native";
import { View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = useThemeProvider();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isSplashLoaded, setIsSplashLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      setIsSplashLoaded(true);
      SplashScreen.hideAsync();  // Oculta el splash screen cuando se carguen los recursos
    }
  }, [loaded]);

  if (!isSplashLoaded) {
    return <View />;  // Muestra una vista en blanco hasta que se haya cargado
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
