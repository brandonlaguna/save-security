import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import useAsyncStorage from "./useAsyncStorage";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { API_SERVER_PORT, IP_SERVER, SOCKET_SERVER_PORT } from "@/constants";
import axios from "axios";
import { useMessageHandler } from "./useMessageHandler";

export interface IChartTemp {
  value: number;
}

export interface IDataWithDate {
  date: Date;
  register: IChartTemp[];
}

export const useHomeHook = () => {
  const { isConnected } = useMessageHandler();

  const { setValue } = useAsyncStorage<IDataWithDate[]>(
    "temperature_register",
    []
  );
  const temperatureReducer = (register: IChartTemp) => {
    // setDataChartTemperature((prevData) => [...prevData.slice(-99), register]);
  };

  return {};
};
