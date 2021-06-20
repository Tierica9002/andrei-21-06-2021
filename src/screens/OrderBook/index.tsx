import React from "react";
import Button from "components/Button";
import SwitchHorizontal from "components/icons/SwitchHorizontal";
import ExclamationCircle from "components/icons/ExclamationCircle";
import OrderBookSide from "screens/OrderBook/OrderBookSide";
import useOrderBook from "screens/OrderBook/hook";
import Dropdown from "components/Dropdown";
import { useWebsocket } from "../../context/webSocket";
import { useResize } from "utils/hooks";
import Placeholder from "components/Placeholder";

const OrderBook = (): JSX.Element => {
  const [state, dispatch] = useOrderBook();
  const isMobile = useResize();
  const { conn, reconnect } = useWebsocket();

  const isLoading =
    state.isLoading ||
    state.renderedAskSide.orders.length === 0 ||
    state.renderedBidSide.orders.length === 0;

  return (
    <div className="w-100 bg-gray-900">
      <div>
        <div className="flex justify-between p-3">
          <h1 className="text-white text-2xl">Order Book</h1>
          <Dropdown
            options={state.grouping}
            prefix="Group "
            onChange={(value) => {
              dispatch({
                type: "change_tick_size",
                payload: value,
              });
            }}
            selectedOption={state.tickSize}
          />
        </div>
        {state.errorMessage === "" && !isLoading ? (
          <div className="flex flex-col md:flex-row-reverse items-stretch">
            <div className="flex-1">
              <OrderBookSide
                color="green"
                direction={isMobile ? "rtl" : "ltr"}
                reverse={isMobile}
                rows={state.renderedBidSide.orders}
                maxOrderSize={state.maximumOrderSize}
              />
            </div>
            <div className="flex-1">
              <OrderBookSide
                color="red"
                direction="rtl"
                showHeader={!isMobile}
                rows={state.renderedAskSide.orders}
                maxOrderSize={state.maximumOrderSize}
              />
            </div>
          </div>
        ) : (
          <Placeholder
            className={`h-96 ${state.errorMessage ? "text-red-500" : ""}`}
            text={state.errorMessage || "Loading..."}
          />
        )}
        <div className="flex justify-center">
          <Button
            color="purple"
            onClick={() => {
              dispatch({
                type: "toggle_feed",
              });
            }}
          >
            <SwitchHorizontal /> Toggle feed
          </Button>
          <Button
            color="red"
            onClick={() => {
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
          >
            <ExclamationCircle /> Kill feed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
