import { IDataWithDate } from "@/hooks/useHomeHook";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import TempChart from "../Charts/TempChart";
import moment from "moment";
const Status = () => {
  const [registerStatus, setRegisterStatus] = useState<IDataWithDate[]>([]);

  const { storedValue, loading } = useAsyncStorage<IDataWithDate[]>(
    "temperature_register",
    []
  );

  useEffect(() => {
    if (storedValue != null) {
      setRegisterStatus(storedValue);
    }
  }, [loading]);

  return (
    <View>
      {registerStatus.map((data, index) => (
        <View key={index} style={styles.card}>
          <Text>{`${moment(data.date).format("dddd, MMMM Do YYYY")}`}</Text>
          {/* <TempChart data={data.register}></TempChart> */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 5,
  },
});

export default Status;
