import { THEMES } from "@/constants";
import { DefaultTheme } from "@react-navigation/native";
import { themeLight } from "./themeLight";
import { themeDark } from "./themeDark";

const themesOptions = {
  [THEMES.LIGHT]: {
    ...DefaultTheme,
    palette: themeLight,
  },
  [THEMES.DARK]: {
    ...DefaultTheme,
    palette: themeLight,
  },
};
export default themesOptions;
