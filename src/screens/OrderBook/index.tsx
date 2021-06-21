import React from "react";
import useOrderBook from "./hook";
import OrderBook from "./OrderBook";
import { useWebsocket } from "../../context/webSocket";

const OrderBookScreen = (): JSX.Element => {
  const [state, dispatch] = useOrderBook();
  const { conn, reconnect } = useWebsocket();

  return (
    <div className="w-100 bg-gray-900">
      <OrderBook
        state={state}
        onToggleFeed={() => {
          dispatch({
            type: "toggle_feed",
          });
        }}
        onChangeGrouping={(value) => {
          dispatch({
            type: "change_tick_size",
            payload: value,
          });
        }}
        onKillFeed={() => {
          if (conn?.readyState === WebSocket.OPEN) {
            conn?.close();
            dispatch({
              type: "update_feed_error",
              payload:
                "A communication error occured, please try to refresh your browser.",
            });
          } else {
            reconnect();
            dispatch({
              type: "update_feed_error",
              payload: "",
            });
          }
        }}
      />
    </div>
  );
};

export default OrderBookScreen;
