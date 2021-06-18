import React from "react";
import { Sides, SortDirections } from "./@types";
import Button from "components/Button";
import SwitchHorizontal from "components/icons/SwitchHorizontal";
import OrderBookSide from "screens/OrderBook/OrderBookSide";
import useOrderBook from "screens/OrderBook/hook";

// should contain 2x orderbook sides
// buttons & headings
const OrderBook = () => {
  const [state, dispatch] = useOrderBook();

  return (
    <div className="w-100 bg-gray-900">
      <div>
        <div>
          <h1 className="text-white text-2xl">Order Book</h1>
          {/* <Dropdown options={options} onChange={} value={} /> */}
        </div>
        <div className="flex items-stretch">
          <div className="flex-1">
            <OrderBookSide
              side={Sides.ASK}
              sort={SortDirections.ASC}
              rows={state.renderedAskSide.orders}
              maxOrderSize={state.maximumOrderSize}
            />
          </div>
          <div className="flex-1">
            <OrderBookSide
              side={Sides.BID}
              sort={SortDirections.DESC}
              rows={state.renderedBidSide.orders}
              maxOrderSize={state.maximumOrderSize}
            />
          </div>
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
