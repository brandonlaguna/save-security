import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useTheme } from "styled-components/native";

const Configuration = () => {
  const [alias, setAlias] = useState<string>("");
  const [host, setHost] = useState<string>("192.168.4.1");
  const theme = useTheme();
  const styles = getStyles({ theme });
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              label="Alias"
              value={alias}
              onChangeText={(val) => setAlias(val)}
              mode="outlined"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="Host"
              value={host}
              onChangeText={(val) => setHost(val)}
              mode="outlined"
            />
          </View>

          <View style={styles.inputContainer}>
            <Button
              icon="content-save"
              mode="contained"
              loading
              onPress={() => console.log("Pressed")}
            >
              Guardar
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = ({ theme }: { theme: any }) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
      padding: 10,
    },
    container: {
      backgroundColor: "white",
      padding: 6,
      borderRadius: 10,
    },
    inputContainer: {
      marginVertical: 5,
    },
  });

export default Configuration;
