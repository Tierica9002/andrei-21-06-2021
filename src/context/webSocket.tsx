import React from "react";
import createWsConn from "utils/ws-client";

interface WebsocketContextType {
  conn: WebSocket | null;
  reconnect: () => void;
}

const WebsocketContext = React.createContext<
  WebsocketContextType | Record<string, never>
>({});

interface WebsocketContextProviderProps {
  children: React.ReactNode;
  wsClient: typeof WebSocket;
}

const WebsocketContextProvider = (
  props: WebsocketContextProviderProps
): JSX.Element => {
  const [conn, setConn] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    if (!process.env.WS_URL) {
      throw new Error("Websocket URL hasn't been set.");
    }
    setConn(createWsConn(props.wsClient));
    return () => {
      conn?.close();
    };
  }, []);

  const reconnect = () => {
    setConn(createWsConn(props.wsClient));
  };

  return <WebsocketContext.Provider value={{ conn, reconnect }} {...props} />;
};

const useWebsocket = (): WebsocketContextType | Record<string, never> => {
  const context = React.useContext(WebsocketContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { WebsocketContextProvider, useWebsocket };
