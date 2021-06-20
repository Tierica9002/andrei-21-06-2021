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

const groupBy = (orders: Order[], groupBy: string): Order[] => {
  const groupedArray: Order[] = [];
  const groupByNumber = parseFloat(groupBy);
  let groupedIndex = 0;
  for (let i = 0; i < orders.length; i++) {
    const groupedPrice =
      Math.floor(orders[i].price / groupByNumber) * groupByNumber;

    if (Number.isInteger(orders[i].price / groupByNumber)) {
      groupedArray.push(orders[i]);
      groupedIndex++;
    } else {
      if (i === 0) {
        groupedArray.push({
          ...orders[i],
          price: groupedPrice,
        });
        groupedIndex++;
      } else {
        const prevItem = groupedArray[groupedIndex - 1];

        if (prevItem.price === groupedPrice) {
          groupedArray[groupedIndex - 1] = {
            ...prevItem,
            size: orders[i].size + prevItem.size,
          };
        } else {
          groupedArray.push({
            ...orders[i],
            price: groupedPrice,
          });
          groupedIndex++;
        }
      }
    }
  }

  return groupedArray;
};

const groupings = {
  [ProductIDs.PI_ETHUSD]: ["0.05", "0.1", "0.25"],
  [ProductIDs.PI_XBTUSD]: ["0.5", "1", "2.5"],
};

const initialState: OrderBookState = {
  bidSide: {
    orders: [],
  },
  askSide: {
    orders: [],
  },
  productID: ProductIDs.PI_XBTUSD,
  tickSize: "0.5",
  grouping: groupings[ProductIDs.PI_XBTUSD],
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
      const nextProductID = nextProduct[state.productID];
      return {
        ...initialState,
        productID: nextProductID,
        grouping: groupings[nextProductID],
        isLoading: true,
      };
    }
    case "update_data": {
      if (state.isLoading) {
        return state;
      }
      const { bids, asks } = action.payload;
      const { bidSide, askSide } = state;
      const mergedBidOrders = mergeDelta(bidSide.orders, bids);
      const mergedAskOrders = mergeDelta(askSide.orders, asks);

      return {
        ...state,
        askSide: { orders: mergedAskOrders },
        bidSide: { orders: mergedBidOrders },
      };
    }
    case "flush_to_dom": {
      const { nrOfItems } = action.payload;

      const reversedBidOrders = [...state.bidSide.orders].reverse();
      const groupedBidOrders = groupBy(reversedBidOrders, state.tickSize);
      const bidOrdersWithTotal = totalCalculator(groupedBidOrders);
      const maxBidTotal = bidOrdersWithTotal[nrOfItems - 1]?.total;

      const groupedAskOrders = groupBy(state.askSide.orders, state.tickSize);
      const askOrdersWithTotal = totalCalculator(groupedAskOrders);
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
    case "change_tick_size": {
      return {
        ...state,
        tickSize: action.payload,
      };
    }
  }
};

export { orderBookReducer, initialState, nextProduct, groupBy };
