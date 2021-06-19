import { orderBookReducer, initialState } from "../reducer";
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

describe("orderBookReducer", () => {
  const sampleAskData: Order[] = [
    {
      price: 5000,
      size: 50,
      total: 0,
    },
    {
      price: 4000,
      size: 60,
      total: 0,
    },
    {
      price: 3000,
      size: 10,
      total: 0,
    },
    {
      price: 2000,
      size: 30,
      total: 0,
    },
    {
      price: 1000,
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
            price: 5234,
            size: 1,
            total: 0,
          },
          {
            price: 3456,
            size: 10,
            total: 0,
          },
          {
            price: 1912,
            size: 20,
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
            price: 5234,
            size: 1,
            total: 0,
          },
          {
            price: 5000,
            size: 50,
            total: 0,
          },
          {
            price: 4000,
            size: 60,
            total: 0,
          },
          {
            price: 3456,
            size: 10,
            total: 0,
          },
          {
            price: 3000,
            size: 10,
            total: 0,
          },
          {
            price: 2000,
            size: 30,
            total: 0,
          },
          {
            price: 1912,
            size: 20,
            total: 0,
          },
          {
            price: 1000,
            size: 50,
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
    const updateAction = createUpdateAction({
      asks: [
        {
          price: 100,
          size: 3,
          total: 0,
        },
      ],
      bids: [],
    });
    const got = orderBookReducer(
      {
        ...initialState,
        askSide: {
          orders: [
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
      ...initialState,
      askSide: {
        orders: [
          {
            price: 100,
            size: 3,
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
        ...initialState,
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
      ...initialState,
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

  it("toggle_feed action updates the product ID", () => {
    const toggleFeedAction = createToggleFeedAction();

    const gotETHUSD = orderBookReducer(initialState, toggleFeedAction);
    expect(gotETHUSD).toEqual({
      ...initialState,
      productID: ProductIDs.PI_ETHUSD,
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
      productID: ProductIDs.PI_XBTUSD,
    });
  });
});
