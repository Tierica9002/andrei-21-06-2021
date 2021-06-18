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
  productID: ProductIDs.PI_XBTUSD,
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
    case "toggle_feed": {
      return {
        ...state,
        productID: nextProduct[state.productID],
      };
    }
    case "update_data": {
      const { bids, asks } = action.payload;

      const { bidSide, askSide } = state;
      const mergedBidOrders = mergeDelta(
        bidSide.orders,
        bids,
        SortDirections.DESC
      );
      const mergedAskOrders = mergeDelta(
        askSide.orders,
        asks,
        SortDirections.ASC
      );

      const bidOrdersWithTotal = totalCalculator(mergedBidOrders);
      const askOrdersWithTotal = totalCalculator(mergedAskOrders);

      return {
        ...state,
        askSide: { orders: askOrdersWithTotal },
        bidSide: { orders: bidOrdersWithTotal },
      };
    }
    case "set_initial_data": {
      const { bids, asks } = action.payload;
      const bidOrdersWithTotal = totalCalculator(bids);
      const askOrdersWithTotal = totalCalculator(asks);

      const maxBidTotal = bidOrdersWithTotal[14].total;
      const maxAskTotal = askOrdersWithTotal[14].total;

      return {
        ...state,
        askSide: { orders: asks },
        bidSide: { orders: bids },
        renderedAskSide: { orders: askOrdersWithTotal },
        renderedBidSide: { orders: bidOrdersWithTotal },
        maximumOrderSize: maxBidTotal > maxAskTotal ? maxBidTotal : maxAskTotal,
      };
    }
    case "flush_to_dom": {
      const maxBidTotal = state.bidSide.orders[14].total;
      const maxAskTotal = state.askSide.orders[14].total;

      return {
        ...state,
        renderedAskSide: {
          orders: state.askSide.orders.slice(0, 15),
        },
        renderedBidSide: {
          orders: state.bidSide.orders.slice(0, 15),
        },
        maximumOrderSize: maxBidTotal > maxAskTotal ? maxBidTotal : maxAskTotal,
      };
    }
  }
};

export { orderBookReducer, initialState, nextProduct };
