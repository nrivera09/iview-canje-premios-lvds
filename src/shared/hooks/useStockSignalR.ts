import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const useStockSignalR = (onStockUpdate: (message: any) => void) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_ACITY_DOMAIN}/hub/stock`, {
        transport: signalR.HttpTransportType.LongPolling,
      })

      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = connection;

    // Definir el handler ANTES de iniciar la conexión
    connection.on("StockActualizadoCanje", (data, message) => {
      console.log("📦 Evento 'ReceiveStockUpdate':", data);
      console.log("📦 Mensaje:", message);
      onStockUpdate(data);
    });

    connection
      .start()
      .then(() => {
        console.log("✅ Conectado a SignalR");

        // (Opcional) Invocar algo al conectar
        // connection.invoke("send", "Hello desde React");
      })
      .catch((err) =>
        console.error("❌ Error al conectar a SignalR:", err.message)
      );

    return () => {
      connection.stop();
    };
  }, [onStockUpdate]);
};
