import { orderBookReducer, initialState, groupings } from "../reducer";
import { Order, ProductIDs } from "screens/OrderBook/types";

const createUpdateAction = (payload: {
  bids: Array<Order>;
  asks: Array<Order>;
}): {
  type: "update_data";
  payload: { bids: Array<Order>; asks: Array<Order> };
} => {
  return {
    type: "update_data",
    payload,
  };
};

const createToggleFeedAction = (): {
  type: "toggle_feed";
} => {
  return {
    type: "toggle_feed",
  };
};

const createChangeTickAction = (
  payload: string
): {
  type: "change_tick_size";
  payload: string;
} => {
  return {
    type: "change_tick_size",
    payload,
  };
};

describe("orderBookReducer", () => {
  const sampleAskData: Order[] = [
    {
      price: 1000,
      size: 50,
      total: 0,
    },
    {
      price: 2000,
      size: 30,
      total: 0,
    },
    {
      price: 3000,
      size: 10,
      total: 0,
    },
    {
      price: 4000,
      size: 60,
      total: 0,
    },
    {
      price: 5000,
      size: 50,
      total: 0,
    },
  ];

  const sampleBidData: Order[] = [
    {
      price: 123,
      size: 50,
      total: 0,
    },
    {
      price: 663,
      size: 60,
      total: 0,
    },
    {
      price: 1234,
      size: 1,
      total: 0,
    },
    {
      price: 3456,
      size: 30,
      total: 0,
    },
    {
      price: 4912,
      size: 50,
      total: 0,
    },
  ];

  it("update_data action adds data when store is empty", () => {
    const updateAction = createUpdateAction({
      asks: sampleAskData,
      bids: sampleBidData,
    });
    const got = orderBookReducer(initialState, updateAction);

    expect(got).toEqual({
      ...initialState,
      askSide: {
        orders: sampleAskData,
      },
      bidSide: {
        orders: sampleBidData,
      },
    });
  });

  it("update_data action adds & sorts data when store is not empty", () => {
    const updateAction = createUpdateAction({
      asks: sampleAskData,
      bids: sampleBidData,
    });

    const state = {
      ...initialState,
      askSide: {
        orders: [
          {
            price: 1912,
            size: 20,
            total: 0,
          },
          {
            price: 3456,
            size: 10,
            total: 0,
          },
          {
            price: 5234,
            size: 1,
            total: 0,
          },
        ],
      },
      bidSide: {
        orders: [
          {
            price: 1333,
            size: 1,
            total: 0,
          },
          {
            price: 2456,
            size: 10,
            total: 0,
          },

          {
            price: 3912,
            size: 20,
            total: 0,
          },
        ],
      },
    };
    const got = orderBookReducer(state, updateAction);

    expect(got).toEqual({
      ...initialState,
      askSide: {
        orders: [
          {
            price: 1000,
            size: 50,
            total: 0,
          },
          {
            price: 1912,
            size: 20,
            total: 0,
          },
          {
            price: 2000,
            size: 30,
            total: 0,
          },
          {
            price: 3000,
            size: 10,
            total: 0,
          },
          {
            price: 3456,
            size: 10,
            total: 0,
          },
          {
            price: 4000,
            size: 60,
            total: 0,
          },
          {
            price: 5000,
            size: 50,
            total: 0,
          },
          {
            price: 5234,
            size: 1,
            total: 0,
          },
        ],
      },
      bidSide: {
        orders: [
          {
            price: 123,
            size: 50,
            total: 0,
          },
          {
            price: 663,
            size: 60,
            total: 0,
          },
          {
            price: 1234,
            size: 1,
            total: 0,
          },
          {
            price: 1333,
            size: 1,
            total: 0,
          },
          {
            price: 2456,
            size: 10,
            total: 0,
          },

          {
            price: 3456,
            size: 30,
            total: 0,
          },
          {
            price: 3912,
            size: 20,
            total: 0,
          },
          {
            price: 4912,
            size: 50,
            total: 0,
          },
        ],
      },
    });
  });

  it("update_data action replaces values that have the same price", () => {
    const localInitialState = {
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
      errorMessage: "",
      maximumOrderSize: 0,
      renderedBidSide: {
        orders: [],
      },
      renderedAskSide: {
        orders: [],
      },
    };

    const updateAction = createUpdateAction({
      asks: [
        {
          price: 123,
          size: 3,
          total: 0,
        },
      ],
      bids: [],
    });
    const got = orderBookReducer(
      {
        ...localInitialState,
        askSide: {
          orders: [
            {
              price: 123,
              size: 5,
              total: 0,
            },
            {
              price: 663,
              size: 60,
              total: 0,
            },
            {
              price: 1234,
              size: 1,
              total: 0,
            },
            {
              price: 3456,
              size: 30,
              total: 0,
            },
            {
              price: 4912,
              size: 50,
              total: 0,
            },
          ],
        },
      },
      updateAction
    );

    expect(got).toEqual({
      ...localInitialState,
      askSide: {
        orders: [
          {
            price: 123,
            size: 3,
            total: 0,
          },
          {
            price: 663,
            size: 60,
            total: 0,
          },
          {
            price: 1234,
            size: 1,
            total: 0,
          },
          {
            price: 3456,
            size: 30,
            total: 0,
          },
          {
            price: 4912,
            size: 50,
            total: 0,
          },
        ],
      },
      bidSide: {
        orders: [],
      },
    });
  });

  it("update_data action deletes values that have the same price with size 0", () => {
    const localInitialState = {
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
      errorMessage: "",
      maximumOrderSize: 0,
      renderedBidSide: {
        orders: [],
      },
      renderedAskSide: {
        orders: [],
      },
    };
    const updateAction = createUpdateAction({
      asks: [
        {
          price: 300,
          size: 1,
          total: 0,
        },
        {
          price: 200,
          size: 0,
          total: 0,
        },
        {
          price: 100,
          size: 0,
          total: 0,
        },
      ],
      bids: [],
    });
    const got = orderBookReducer(
      {
        ...localInitialState,
        askSide: {
          orders: [
            {
              price: 300,
              size: 4,
              total: 1,
            },
            {
              price: 200,
              size: 4,
              total: 1,
            },
            {
              price: 100,
              size: 4,
              total: 1,
            },
          ],
        },
      },
      updateAction
    );

    expect(got).toEqual({
      ...localInitialState,
      askSide: {
        orders: [
          {
            price: 300,
            size: 1,
            total: 0,
          },
        ],
      },
      bidSide: {
        orders: [],
      },
    });
  });

  it("update_data action doesnt mutate state so it doesnt trigger unnecessary rerenders", () => {
    const localInitialState = {
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
      errorMessage: "",
      maximumOrderSize: 0,
      renderedBidSide: {
        orders: [],
      },
      renderedAskSide: {
        orders: [],
      },
    };
    const updateAction = createUpdateAction({
      asks: [
        {
          price: 300,
          size: 1,
          total: 0,
        },
        {
          price: 200,
          size: 0,
          total: 0,
        },
        {
          price: 100,
          size: 0,
          total: 0,
        },
      ],
      bids: [],
    });
    const got = orderBookReducer(localInitialState, updateAction);

    expect(got.askSide.orders).toBe(localInitialState.askSide.orders);
  });

  it("toggle_feed action updates the product ID and sets loading to true and changes grouping info", () => {
    const toggleFeedAction = createToggleFeedAction();

    const gotETHUSD = orderBookReducer(initialState, toggleFeedAction);
    expect(gotETHUSD).toEqual({
      ...initialState,
      productID: ProductIDs.PI_ETHUSD,
      grouping: groupings[ProductIDs.PI_ETHUSD],
      tickSize: groupings[ProductIDs.PI_ETHUSD][0],
      isLoading: true,
    });

    const gotXBTUSD = orderBookReducer(
      {
        ...initialState,
        productID: ProductIDs.PI_ETHUSD,
      },
      toggleFeedAction
    );
    expect(gotXBTUSD).toEqual({
      ...initialState,
      isLoading: true,
      productID: ProductIDs.PI_XBTUSD,
      grouping: groupings[ProductIDs.PI_XBTUSD],
      tickSize: groupings[ProductIDs.PI_XBTUSD][0],
    });
  });

  it("change_tick_size updates the tick size", () => {
    const changeTickAction = createChangeTickAction(
      groupings[ProductIDs.PI_XBTUSD][1]
    );

    const got = orderBookReducer(initialState, changeTickAction);
    expect(got).toEqual({
      ...initialState,
      tickSize: groupings[ProductIDs.PI_XBTUSD][1],
    });
  });

  it("feed_error updates the tick size", () => {
    const changeTickAction = createChangeTickAction(
      groupings[ProductIDs.PI_XBTUSD][1]
    );

    const got = orderBookReducer(initialState, changeTickAction);
    expect(got).toEqual({
      ...initialState,
      tickSize: groupings[ProductIDs.PI_XBTUSD][1],
    });
  });
});
