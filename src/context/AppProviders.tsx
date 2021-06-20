import React from "react";
import { WebsocketContextProvider } from "./webSocket";

interface AppProvidersProps {
  children: React.ReactNode;
  wsClient?: typeof WebSocket;
}

const AppProviders = ({
  children,
  wsClient,
}: AppProvidersProps): JSX.Element => {
  return (
    <WebsocketContextProvider wsClient={wsClient || WebSocket}>
      {children}
    </WebsocketContextProvider>
  );
};

export default AppProviders;
