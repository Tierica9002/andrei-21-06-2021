import React from "react";
import { OrderBookState } from "./types";
import { useResize } from "utils/hooks";
import Button from "components/Button";
import SwitchHorizontal from "components/icons/SwitchHorizontal";
import ExclamationCircle from "components/icons/ExclamationCircle";
import OrderBookSide from "screens/OrderBook/OrderBookSide";
import Dropdown from "components/Dropdown";
import Placeholder from "components/Placeholder";

interface OrderBookProps {
  onKillFeed: () => void;
  onChangeGrouping: (value: string) => void;
  onToggleFeed: () => void;
  state: OrderBookState;
}

const OrderBook = ({
  onKillFeed,
  onChangeGrouping,
  onToggleFeed,
  state,
}: OrderBookProps): JSX.Element => {
  const isMobile = useResize();
  const isLoading =
    state.isLoading ||
    state.renderedAskSide.orders.length === 0 ||
    state.renderedBidSide.orders.length === 0;

  return (
    <div>
      <div className="flex justify-between p-3">
        <h1 className="text-white text-2xl">Order Book</h1>
        <Dropdown
          options={state.grouping}
          prefix="Group "
          onChange={onChangeGrouping}
          selectedOption={state.tickSize}
        />
      </div>
      {state.errorMessage === "" && !isLoading ? (
        <div className="flex flex-col md:flex-row-reverse items-stretch">
          <div className="flex-1 pt-4">
            <OrderBookSide
              color="green"
              direction={isMobile ? "rtl" : "ltr"}
              rows={state.renderedBidSide.orders}
              maxOrderSize={state.maximumOrderSize}
              reverseRows={isMobile}
            />
          </div>
          <div className="flex-1 pt-4">
            <OrderBookSide
              color="red"
              direction="rtl"
              showHeader={!isMobile}
              reverseCols={!isMobile}
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
        <Button color="purple" onClick={() => onToggleFeed()}>
          <SwitchHorizontal /> Toggle feed
        </Button>
        <Button
          color="red"
          onClick={() => {
            onKillFeed();
          }}
        >
          <ExclamationCircle /> Kill feed
        </Button>
      </div>
    </div>
  );
};

export default OrderBook;
