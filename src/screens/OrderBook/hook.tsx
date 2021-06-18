import React from "react";
import {
  OrderBookState,
  ProductIDs,
  OrderBookAction,
  Order,
  RawOrderData,
} from "./@types";
import { useSafeDispatch } from "utils/hooks";
import createWsConn from "utils/ws-client";
import { orderBookReducer, initialState, nextProduct } from "./reducer";

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

const useOrderBook = (): [OrderBookState, React.Dispatch<OrderBookAction>] => {
  const [state, unSafeDispatch] = React.useReducer(
    orderBookReducer,
    initialState
  );
  // todo propertly type action args
  const safeDispatch = useSafeDispatch(unSafeDispatch);
  // move this somewhere else
  const wsConn = React.useRef<WebSocket | null>(null);

  const messageHandler = (e: any) => {
    const wsMessage = JSON.parse(e.data);
    if (wsMessage.feed === "book_ui_1_snapshot") {
      const bidOrders = orderConverter(wsMessage.bids);
      const askOrders = orderConverter(wsMessage.asks);

      safeDispatch({
        type: "set_initial_data",
        payload: {
          bids: bidOrders,
          asks: askOrders,
        },
      });
    } else if (
      wsMessage.feed === "book_ui_1" &&
      wsMessage.product_id === state.productID
    ) {
      const bidOrders = orderConverter(wsMessage.bids);
      const askOrders = orderConverter(wsMessage.asks);

      safeDispatch({
        type: "update_data",
        payload: {
          bids: bidOrders.reverse(),
          asks: askOrders,
        },
      });
    }
  };

  React.useEffect(() => {
    wsConn.current = createWsConn({
      initialMessage: websocketEvents.subscribe(state.productID),
      onMessage: messageHandler,
    });
  }, []);

  React.useEffect(() => {
    if (wsConn.current?.readyState === WebSocket.OPEN) {
      wsConn.current.send(
        websocketEvents.subscribe(nextProduct[state.productID])
      );

      wsConn.current.send(websocketEvents.unsubscribe(state.productID));
    }
  }, [state.productID]);

  React.useEffect(() => {
    if (wsConn.current?.readyState === WebSocket.OPEN) {
      setInterval(() => {
        safeDispatch({
          type: "flush_to_dom",
        });
      }, 300);
    }
  }, [wsConn.current?.readyState]);

  return [state, safeDispatch];
};

export default useOrderBook;
