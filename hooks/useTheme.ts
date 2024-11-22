import { useColorScheme, StyleSheet } from "react-native";
import themesOptions from "@/theme/themeOptions";

const useThemeProvider = () => {
  const colorScheme = useColorScheme();
  const theme = {
    ...styles,
    backgroundColor:
      colorScheme === "dark"
        ? themesOptions["dark"].palette.mainLayout.backgroundColor
        : themesOptions["light"].palette.mainLayout.backgroundColor,
    appHeader:
      colorScheme === "dark"
        ? themesOptions["dark"].palette.appHeader
        : themesOptions["light"].palette.appHeader,
  };
  return theme;
};

const styles = StyleSheet.create({});

export default useThemeProvider;
