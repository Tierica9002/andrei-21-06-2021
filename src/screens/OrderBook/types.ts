export interface Order {
  total: number;
  size: number;
  price: number;
}

export interface OrderBookSide {
  orders: Order[];
}

export interface OrderBookState {
  bidSide: OrderBookSide;
  askSide: OrderBookSide;
  productID: ProductIDs;
  tickSize: number;
  grouping: number[];
  isLoading: boolean;
  maximumOrderSize: number;
  renderedBidSide: OrderBookSide;
  renderedAskSide: OrderBookSide;
}

export type OrderBookAction =
  | {
      type: "update_data";
      payload: { bids: Array<Order>; asks: Array<Order> };
    }
  | { type: "toggle_feed" }
  | {
      type: "flush_to_dom";
      payload: {
        nrOfItems: number;
      };
    }
  | { type: "set_loading"; payload: boolean };

export enum ProductIDs {
  PI_XBTUSD = "PI_XBTUSD",
  PI_ETHUSD = "PI_ETHUSD",
}

export enum SortDirections {
  ASC = "ASC",
  DESC = "DESC",
}

export enum Sides {
  BID = "BID",
  ASK = "ASK",
}

export interface OrderBookProps {
  data: OrderBookState;
  onToggleFeed: () => void;
  onKillFeed: () => void;
  onChangeGrouping: () => void;
}

export type RawOrderData = Array<number>;
