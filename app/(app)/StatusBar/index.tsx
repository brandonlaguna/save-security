import { error, success, warning } from "@/theme/colors";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import { useTheme } from "styled-components";

export interface IStatusBar {
  connectionStatus: boolean;
  batteryStatus: boolean;
  kickStandStatus: boolean;
  hitStatus: boolean;
}

const StatusBar: FC<IStatusBar> = (props) => {
  const { connectionStatus, batteryStatus, kickStandStatus, hitStatus } = props;

  const theme = useTheme();

  return (
    <View style={styles.root}>
      <View style={styles.generalStatus}>
        <Button icon="battery" textColor={batteryStatus ? success : error}>
          {" "}
        </Button>
      </View>
      <View style={styles.generalStatus}>
        <Button icon="motorbike" textColor={kickStandStatus ? success : error}>
          {" "}
        </Button>
      </View>
      <View style={styles.generalStatus}>
        <Button icon="car-emergency" textColor={!hitStatus ? success : error}>
          {" "}
        </Button>
      </View>
      <View style={styles.generalStatus}>
        <Button
          icon={
            connectionStatus == true ? "wifi-arrow-left-right" : "wifi-settings"
          }
          textColor={connectionStatus ? success : error}
          onPress={() => router.navigate("/")}
        >
          {" "}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  generalStatus: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export default StatusBar;
