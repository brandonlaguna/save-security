import { useEffect, useRef, useState, useCallback } from "react";

interface WebSocketData {
  kickstand?: boolean;
  temperatura?: number;
}

interface UseSocketOptions {
  onTemperatureData?: (temperature: number) => void;
  onKickstandChange?: (status: boolean) => void;
  onHitDetected?: () => void;
}

const useSocket = (options: UseSocketOptions) => {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  // Función para establecer la conexión HTTP a la ruta /start
  const initializeConnection = useCallback(async () => {
    try {
      const response = await fetch("http://192.168.4.1/start");
      if (!response.ok) {
        throw new Error("Error en la conexión HTTP /start");
      }
      console.log("Conexión HTTP establecida");
      openWebSocket();
    } catch (error) {
      console.error("Error al iniciar conexión HTTP:", error);
    }
  }, []);

  // Función para abrir el WebSocket
  const openWebSocket = useCallback(() => {
    const socket = new WebSocket("ws://192.168.4.1:81");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket abierto");
      setConnectionStatus(true);
    };

    socket.onmessage = (event) => {
      const message = event.data as string;
      if (message.startsWith("/reading")) {
        try {
          const data: WebSocketData = JSON.parse(message.replace("/reading ", ""));
          options.onTemperatureData?.(data.temperatura!);
          options.onKickstandChange?.(data.kickstand!);
        } catch (error) {
          console.error("Error al parsear el JSON:", error);
        }
      } else if (message.startsWith("/hit")) {
        options.onHitDetected?.();
      }
    };

    socket.onerror = (error) => {
      console.error("Error en la conexión WebSocket:", error);
    };

    socket.onclose = () => {
      setConnectionStatus(false);
      console.log("Conexión WebSocket cerrada");
    };
  }, [options]);

  // Función para enviar mensajes al WebSocket
  const sendMessage = useCallback((message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket no está abierto. No se puede enviar el mensaje.");
    }
  }, []);

  useEffect(() => {
    // Inicia la conexión HTTP
    initializeConnection();

    // Cierra la conexión WebSocket al desmontarse el componente
    return () => {
      socketRef.current?.close();
    };
  }, [initializeConnection]);

  return { connectionStatus, sendMessage };
};

export default useSocket;
