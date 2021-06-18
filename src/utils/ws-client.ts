type WSConnParam = {
  initialMessage: string;
  onMessage: (e: any) => void;
  onClose?: (e: CloseEvent) => any;
  onError?: (e: Event) => void;
};

const createWsConn = ({
  initialMessage,
  onMessage,
  onClose,
  onError,
}: WSConnParam): WebSocket => {
  if (!process.env.WS_URL) {
    throw new Error("Websocket URL hasn't been set.");
  }

  const socket = new WebSocket(process.env.WS_URL);
  console.log(socket);
  socket.onopen = function (e) {
    console.log(initialMessage);
    socket.send(initialMessage);
  };
  socket.onmessage = onMessage;
  socket.onclose = onClose ? onClose : () => null;
  socket.onerror = onError ? onError : () => null;

  return socket;
};

export default createWsConn;
