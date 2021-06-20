const createWsConn = (ws: typeof WebSocket): WebSocket => {
  if (!process.env.WS_URL) {
    throw new Error("Websocket URL hasn't been set.");
  }

  const socket = new ws(process.env.WS_URL);

  return socket;
};

export default createWsConn;
