import React from "react";
import {
  OrderBookState,
  ProductIDs,
  OrderBookAction,
  Order,
  RawOrderData,
} from "./types";
import { useSafeDispatch } from "utils/hooks";
import { useWebsocket } from "../../context/webSocket";
import { orderBookReducer, initialState, nextProduct } from "./reducer";

const BATCHING_TIME = 800;
const NR_OF_ITEMS = 25;

const websocketEvents = {
  subscribe: (productID: ProductIDs) =>
    JSON.stringify({
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [productID],
    }),
  unsubscribe: (productID: ProductIDs) =>
    JSON.stringify({
      event: "unsubscribe",
      feed: "book_ui_1",
      product_ids: [productID],
    }),
};

const createOrder = (price: number, size: number, total = 0): Order => {
  return {
    price,
    size,
    total,
  };
};

const orderConverter = (rawOrderData: Array<RawOrderData>): Order[] => {
  return rawOrderData.map(([price, size]: RawOrderData) =>
    createOrder(price, size)
  );
};

const useToggleFeed = (
  socket: WebSocket | null,
  productID: ProductIDs
): void => {
  React.useEffect(() => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(websocketEvents.unsubscribe(nextProduct[productID]));
      socket.send(websocketEvents.subscribe(productID));
    }
  }, [productID]);
};

const useOrderBook = (): [OrderBookState, React.Dispatch<OrderBookAction>] => {
  const [state, unSafeDispatch] = React.useReducer(
    orderBookReducer,
    initialState
  );
  // todo propertly type action args
  const safeDispatch = useSafeDispatch(unSafeDispatch);
  const batchingInterval = React.useRef<number>(0);
  const { conn } = useWebsocket();

  useToggleFeed(conn, state.productID);

  const registerWsEventHandlers = () => {
    conn?.addEventListener("open", () => {
      conn.send(websocketEvents.subscribe(state.productID));
      batchingInterval.current && clearInterval(batchingInterval.current);
      batchingInterval.current = window.setInterval(() => {
        safeDispatch({
          type: "render_data",
          payload: {
            nrOfItems: NR_OF_ITEMS,
          },
        });
      }, BATCHING_TIME);
    });

    conn?.addEventListener("message", (e) => {
      const wsMessage = JSON.parse(e.data);
      if (wsMessage.feed === "book_ui_1_snapshot") {
        const bidOrders = orderConverter(wsMessage.bids);
        const askOrders = orderConverter(wsMessage.asks);

        safeDispatch({
          type: "update_data",
          payload: {
            bids: bidOrders.reverse(),
            asks: askOrders,
          },
        });
        safeDispatch({
          type: "render_data",
          payload: {
            nrOfItems: 25,
          },
        });
      } else if (wsMessage.feed === "book_ui_1" && wsMessage.product_id) {
        const bidOrders = orderConverter(wsMessage.bids);
        const askOrders = orderConverter(wsMessage.asks);
        safeDispatch({
          type: "update_data",
          payload: {
            bids: bidOrders,
            asks: askOrders,
          },
        });
      } else if (wsMessage?.event === "subscribed") {
        safeDispatch({
          type: "set_loading",
          payload: false,
        });
        safeDispatch({
          type: "render_data",
          payload: {
            nrOfItems: 25,
          },
        });
      }
    });
  };

  React.useEffect(() => {
    registerWsEventHandlers();
  }, [conn]);

  return [state, safeDispatch];
};

export default useOrderBook;
