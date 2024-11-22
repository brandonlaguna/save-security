import { StyleSheet } from "react-native";
import { secondaryMain } from "./colors";

export const themeLight = StyleSheet.create({
  mainLayout: {
    backgroundColor: secondaryMain,
  },
  appHeader: {
    backgroundColor: secondaryMain,
  },
  batteryIconOk: {
    color: "green",
  },
  batteryIconError: {
    color: "red",
  },
});
