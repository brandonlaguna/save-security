import { IChartTemp } from "@/model/IDataChart";
import { error, success, warning } from "@/theme/colors";
import { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { LinearGradient, Stop } from "react-native-svg";

interface IDimension {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ITempChart {
  data: number[];
}

const TempChart: FC<ITempChart> = (props) => {
  const { data } = props;
  const [lineData, setLineData] = useState<IChartTemp[]>([]);

  const structureLineData = (data: number[]) => {
    return data.map((value) => {
      return { value: value };
    });
  };

  useEffect(() => {
    if (data != null) {
      setLineData(structureLineData(data));
    }
  }, [data]);

  const [dimensions, setDimensions] = useState<IDimension>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleGetDimensions = (layout: IDimension) => {
    console.log("🚀 ~ handleGetDimensions ~ layout:", layout);
    setDimensions(layout);
  };

  return (
    <View
      style={styles.root}
      onLayout={(event) => {
        handleGetDimensions(event.nativeEvent.layout);
      }}
    >
      <LineChart
        width={dimensions.width - 60}
        data={lineData}
        spacing={2}
        hideDataPoints
        lineGradient
        lineGradientId="ggrd"
        thickness={1.5}
        curved
        hideRules={true}
        stepValue={30}
        maxValue={180}
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisLabelSuffix="°C"
        yAxisLabelWidth={50}
        yAxisTextStyle={{
          fontSize: 10,
          fontWeight: "bold",
          color: "gray",
        }}
        color={"#00ff83"}
        startFillColor="rgba(20,105,81,0.3)"
        endFillColor="rgba(20,85,81,0.01)"
        scrollToEnd
        lineGradientComponent={() => {
          return (
            <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={error} />
              <Stop offset="0.5" stopColor={warning} />
              <Stop offset="1" stopColor={success} />
            </LinearGradient>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
});
export default TempChart;
