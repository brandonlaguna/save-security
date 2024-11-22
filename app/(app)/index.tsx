import LargeCard from "@/components/Card/LargeCard";
import { router } from "expo-router";
import { SafeAreaView, View } from "react-native";
import TempChart from "./Charts/TempChart";
import CardImage from "./CardImage";
import { Text } from "react-native-paper";
import StatusBar from "./StatusBar";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import store from "@/store/store";
import { useAppSelector } from "@/store/store";
import { useMessageHandler } from "@/hooks/useMessageHandler";
import ModalAlert from "@/components/Modal";

const Index = () => {
  const {
    isConnected,
    temperature,
    kickstandStatus,
    historicalTemperature,
    hitStatus,
    handleResetHit,
    handleClickSendMessage,
  } = useMessageHandler();
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        paddingHorizontal: 14,
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <ScrollView>
        <CardImage />

        <StatusBar
          connectionStatus={isConnected}
          batteryStatus={true}
          kickStandStatus={kickstandStatus}
          hitStatus={hitStatus}
        />

        <LargeCard
          title="Estado de la moto"
          rightIcon="information-outline"
          handleClick={handleClickSendMessage}
        >
          <View>
            <TempChart data={historicalTemperature} />
          </View>
        </LargeCard>

        <LargeCard
          title="Configuración"
          rightIcon="chevron-right"
          handleClick={() => router.navigate("/(app)/configuration")}
        >
          <View>
            <Text>V1.0.0</Text>
          </View>
        </LargeCard>
        <ModalAlert visible={hitStatus} handleCancel={handleResetHit} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
