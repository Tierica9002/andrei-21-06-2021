import React from "react";
import {
  OrderBookState,
  ProductIDs,
  OrderBookAction,
  Order,
  RawOrderData,
} from "./types";
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

const useToggleFeed = (
  wsConn: WebSocket | null,
  productID: ProductIDs
): void => {
  React.useEffect(() => {
    if (wsConn?.readyState === WebSocket.OPEN) {
      wsConn.send(websocketEvents.unsubscribe(nextProduct[productID]));
      wsConn.send(websocketEvents.subscribe(productID));
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
  // move this somewhere else
  const wsConn = React.useRef<WebSocket | null>(null);
  const batchingInterval = React.useRef<number>(0);

  useToggleFeed(wsConn.current, state.productID);

  const messageHandler = (e: any) => {
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
        type: "flush_to_dom",
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
    }
  };

  //todo refactor
  React.useEffect(() => {
    wsConn.current = createWsConn({
      initialMessage: websocketEvents.subscribe(state.productID),
      onMessage: messageHandler,
    });
  }, []);

  React.useEffect(() => {
    if (wsConn.current?.readyState === WebSocket.OPEN) {
      batchingInterval.current && clearInterval(batchingInterval.current);
      batchingInterval.current = window.setInterval(() => {
        safeDispatch({
          type: "flush_to_dom",
          payload: {
            nrOfItems: 25,
          },
        });
      }, 800);
    }
  }, [wsConn.current?.readyState, state.productID]);

  return [state, safeDispatch];
};

export default useOrderBook;
