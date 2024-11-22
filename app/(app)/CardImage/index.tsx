import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function CardImage() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/vehicledb/xr150l.webp")}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: 180,
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
