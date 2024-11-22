import * as React from "react";
import { Appbar, Button } from "react-native-paper";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { router } from "expo-router";

export interface IAppHeader {
  onPressMenu: Function;
  title: string;
}
const AppHeader: React.FC<IAppHeader> = (props) => {
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const theme = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: theme.appHeader.backgroundColor }}>
      <Button
        onPress={() => props.onPressMenu()}
        icon={({ size, color }) => (
          <Appbar.Action
            icon="chevron-left"
            size={32}
            color={"white"}
            onPress={() => router.back()}
          />
        )}
        children={<></>}
      />
      {/* <Appbar.BackAction onPress={() => props.onPressMenu()} iconColor={theme.tabBar.color} /> */}
      <Appbar.Content title={props.title} color={"white"} />
      <Appbar.Action
        icon={"power-standby"}
        color={"white"}
        onPress={() => {}}
      />
    </Appbar.Header>
  );
};
export default AppHeader;
