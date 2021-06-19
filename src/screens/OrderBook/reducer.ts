import {
  OrderBookState,
  SortDirections,
  OrderBookAction,
  ProductIDs,
  Order,
} from "./types";
import { mergeDelta } from "utils/index";

const nextProduct = {
  [ProductIDs.PI_ETHUSD]: ProductIDs.PI_XBTUSD,
  [ProductIDs.PI_XBTUSD]: ProductIDs.PI_ETHUSD,
};

const totalCalculator = (orders: Order[]): Order[] => {
  let prevOrder = 0;

  return orders.map((order) => {
    prevOrder += order.size;
    return {
      ...order,
      total: prevOrder,
    };
  });
};

const groupings = {
  ETH: [0.05, 0.1, 0.25],
  XBT: [0.5, 1, 2.5],
};

const initialState: OrderBookState = {
  bidSide: {
    orders: [],
  },
  askSide: {
    orders: [],
  },
  productID: ProductIDs.PI_ETHUSD,
  tickSize: 0.5,
  grouping: groupings.ETH,
  isLoading: false,
  maximumOrderSize: 0,
  renderedBidSide: {
    orders: [],
  },
  renderedAskSide: {
    orders: [],
  },
};

const orderBookReducer = (
  state: OrderBookState,
  action: OrderBookAction
): OrderBookState => {
  switch (action.type) {
    case "set_loading": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case "toggle_feed": {
      return {
        ...initialState,
        productID: nextProduct[state.productID],
        isLoading: true,
      };
    }
    case "update_data": {
      if (state.isLoading) {
        return state;
      }
      const { bids, asks } = action.payload;
      const { bidSide, askSide } = state;
      const mergedBidOrders = mergeDelta(
        bidSide.orders,
        bids,
        SortDirections.ASC
      );
      const mergedAskOrders = mergeDelta(
        askSide.orders,
        asks,
        SortDirections.DESC
      );
      return {
        ...state,
        askSide: { orders: mergedAskOrders },
        bidSide: { orders: mergedBidOrders },
      };
    }
    case "flush_to_dom": {
      const { nrOfItems } = action.payload;

      const bidOrdersWithTotal = totalCalculator(state.bidSide.orders);
      const askOrdersWithTotal = totalCalculator(state.askSide.orders);
      const maxBidTotal = bidOrdersWithTotal[nrOfItems - 1]?.total;
      const maxAskTotal = askOrdersWithTotal[nrOfItems - 1]?.total;

      return {
        ...state,
        renderedAskSide: {
          orders: askOrdersWithTotal.slice(0, nrOfItems),
        },
        renderedBidSide: {
          orders: bidOrdersWithTotal.slice(0, nrOfItems),
        },
        maximumOrderSize: maxBidTotal > maxAskTotal ? maxBidTotal : maxAskTotal,
      };
    }
  }
};

export { orderBookReducer, initialState, nextProduct };
