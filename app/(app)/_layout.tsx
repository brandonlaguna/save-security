import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import { getHeaderTitle } from "@react-navigation/elements";
import AppHeader from "@/components/Header";
import { ThemeProvider } from "styled-components/native";
import useThemeProvider from "@/hooks/useTheme";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "@/store/store";
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const theme = useThemeProvider();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PaperProvider>
          <Drawer
            screenOptions={{
              header: ({ navigation, route, options }) => {
                const title = getHeaderTitle(options, route.name);
                return (
                  <AppHeader
                    onPressMenu={() => navigation.toggleDrawer()}
                    title={title}
                  />
                );
              },
              headerTitleStyle: {
                color: "white",
              },
              headerStyle: {
                backgroundColor: "transparent",
              },
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "Inicio",
                title: "Save Secure",
              }}
            />
            <Drawer.Screen
              name="configuration/index"
              options={{
                drawerLabel: "Configuración",
                title: "Configuración",
              }}
            />
            <Drawer.Screen
              name="status/index"
              options={{
                drawerLabel: "Estado",
                title: "Estado",
              }}
            />
          </Drawer>
        </PaperProvider>
      </ThemeProvider>
    </Provider>
  );
}
