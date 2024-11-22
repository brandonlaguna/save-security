import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { Image } from "expo-image";
import { primaryMain, secondaryMain } from "@/theme/colors";
import { API_SERVER_PORT, IP_SERVER } from "@/constants";

export default function Index() {
  const handleVerifyServer = async () => {
    console.log("consultando");
    await fetch(`http://${IP_SERVER}:${API_SERVER_PORT}/start`)
      .then((response) => response.text())
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        if (data === "WebSocket iniciado") {
          router.navigate("/(app)/");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ handleVerifyServer ~ err:", err);
        console.error(err);
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("@/assets/images/action-bar.jpeg")}
                contentFit="contain"
                transition={1000}
              />
              <Text style={styles.titleCard}>Activar Wifi</Text>
              <Text style={styles.textCard}>
                Visita el centro de control y activa el Wifi
              </Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("@/assets/images/name-wifi-red.jpeg")}
                contentFit="contain"
                transition={1000}
              />
              <Text style={styles.titleCard}>Conectar a la red</Text>
              <Text style={styles.textCard}>
                Selecciona la red llamada SaveSecure
              </Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("@/assets/images/wifi-button.jpeg")}
                contentFit="contain"
                transition={1000}
              />
              <Text style={styles.titleCard}>Iniciar servicios</Text>
              <Text style={styles.textCard}>
                Una vez conectado dar al boton Iniciar Servicio
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Button
                icon="connection"
                mode="contained"
                onPress={() => handleVerifyServer()}
                style={{ backgroundColor: "white" }}
                textColor={secondaryMain}
              >
                Iniciar Servicio
              </Button>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: secondaryMain,
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  image: {
    width: "100%",
    height: 100,
  },
  imageContainer: {
    // backgroundColor: "white",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  titleCard: {
    color: "white",
    fontWeight: "bold",
  },
  textCard: {
    color: "white",
  },
});
