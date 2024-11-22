// useMessageHandler.js
import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

import { useDispatch, useSelector } from "react-redux";
import { setHitStatus, setVehicleStatus, storeSelector } from "@/store/store";
import { IP_SERVER, SOCKET_SERVER_PORT } from "@/constants";

export function useMessageHandler() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { readyState, sendMessage } = useWebSocket(
    `ws://${IP_SERVER}:${SOCKET_SERVER_PORT}`,
    {
      onMessage: (message) => handleOnMessage(message),
    }
  );
  const dispatch = useDispatch();

  const { temperature, hitStatus, kickstandStatus, historicalTemperature } =
    useSelector(storeSelector);

  const handleOnMessage = (message: any) => {
    try {
      dispatch(setVehicleStatus(JSON.parse(message.data)));
    } catch (error) {
      console.error("Error al parsear el JSON:", error);
    }
  };

  useEffect(() => {
    setIsConnected(false);
    if (readyState === 1) setIsConnected(true);
  }, [readyState]);

  const handleResetHit = () => {
    console.log("handleResetHit");
    dispatch(setHitStatus(false));
  };

  const handleClickSendMessage = useCallback(() => {
    console.log("enviando Hello");
    sendMessage("Hello");
  }, []);

  return {
    isConnected,
    temperature,
    hitStatus,
    kickstandStatus,
    historicalTemperature,
    handleResetHit,
    handleClickSendMessage,
  };
}
