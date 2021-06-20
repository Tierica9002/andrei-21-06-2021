import { mergeDelta } from "utils/index";
import { groupBy } from "screens/OrderBook/reducer";

describe("mergeDelta", () => {
  const arr1Asc = [
    {
      price: 100,
      size: 1,
      total: 0,
    },
    {
      price: 400,
      size: 1,
      total: 0,
    },
    {
      price: 700,
      size: 1,
      total: 0,
    },
    {
      price: 710,
      size: 1,
      total: 0,
    },
    {
      price: 720,
      size: 1,
      total: 0,
    },
  ];

  const arr2Asc = [
    {
      price: 90,
      size: 1,
      total: 0,
    },
    {
      price: 200,
      size: 1,
      total: 0,
    },
    {
      price: 300,
      size: 1,
      total: 0,
    },
    {
      price: 360,
      size: 1,
      total: 0,
    },
    {
      price: 7230,
      size: 1,
      total: 0,
    },
  ];

  const expectedArr1Arr2Asc = [
    {
      price: 90,
      size: 1,
      total: 0,
    },
    {
      price: 100,
      size: 1,
      total: 0,
    },
    {
      price: 200,
      size: 1,
      total: 0,
    },
    {
      price: 300,
      size: 1,
      total: 0,
    },
    {
      price: 360,
      size: 1,
      total: 0,
    },
    {
      price: 400,
      size: 1,
      total: 0,
    },
    {
      price: 700,
      size: 1,
      total: 0,
    },
    {
      price: 710,
      size: 1,
      total: 0,
    },
    {
      price: 720,
      size: 1,
      total: 0,
    },
    {
      price: 7230,
      size: 1,
      total: 0,
    },
  ];

  const arr1Desc = [
    {
      price: 900,
      size: 1,
      total: 0,
    },
    {
      price: 400,
      size: 1,
      total: 0,
    },
    {
      price: 200,
      size: 1,
      total: 0,
    },
    {
      price: 100,
      size: 1,
      total: 0,
    },
  ];

  const arr2Desc = [
    {
      price: 1900,
      size: 1,
      total: 0,
    },
    {
      price: 1400,
      size: 1,
      total: 0,
    },
    {
      price: 600,
      size: 1,
      total: 0,
    },
    {
      price: 500,
      size: 1,
      total: 0,
    },
    {
      price: 130,
      size: 1,
      total: 0,
    },
    {
      price: 50,
      size: 1,
      total: 0,
    },
  ];

  const expectedArr1Arr2Desc = [
    {
      price: 1900,
      size: 1,
      total: 0,
    },
    {
      price: 1400,
      size: 1,
      total: 0,
    },
    {
      price: 900,
      size: 1,
      total: 0,
    },
    {
      price: 600,
      size: 1,
      total: 0,
    },
    {
      price: 500,
      size: 1,
      total: 0,
    },
    {
      price: 400,
      size: 1,
      total: 0,
    },
    {
      price: 200,
      size: 1,
      total: 0,
    },
    {
      price: 130,
      size: 1,
      total: 0,
    },
    {
      price: 100,
      size: 1,
      total: 0,
    },
    {
      price: 50,
      size: 1,
      total: 0,
    },
  ];

  it("sorts 2 sorted arrays ascendent", () => {
    const got = mergeDelta(arr1Asc, arr2Asc);
    expect(got).toEqual(expectedArr1Arr2Asc);
  });
});

describe("groupBy", () => {
  it("groups items by price based on group by", () => {
    const unGroupedArr1 = [
      {
        price: 1.1,
        size: 100,
        total: 0,
      },
      {
        price: 2,
        size: 50,
        total: 0,
      },
      {
        price: 2.3,
        size: 120,
        total: 0,
      },
      {
        price: 3,
        size: 140,
        total: 0,
      },
      {
        price: 4.1,
        size: 10,
        total: 0,
      },
    ];

    const expected1 = [
      {
        price: 1,
        size: 100,
        total: 0,
      },
      {
        price: 2,
        size: 170,
        total: 0,
      },
      {
        price: 3,
        size: 140,
        total: 0,
      },
      {
        price: 4,
        size: 10,
        total: 0,
      },
    ];

    const got1 = groupBy(unGroupedArr1, "0.5");
    expect(got1).toEqual(expected1);

    const unGroupedArr2 = [
      {
        price: 50,
        size: 100,
        total: 0,
      },
      {
        price: 56,
        size: 50,
        total: 0,
      },
      {
        price: 57,
        size: 120,
        total: 0,
      },
      {
        price: 58,
        size: 140,
        total: 0,
      },
      {
        price: 59,
        size: 10,
        total: 0,
      },
    ];

    const expected2 = [
      {
        price: 50,
        size: 100,
        total: 0,
      },
      {
        price: 56,
        size: 50,
        total: 0,
      },
      {
        price: 57,
        size: 120,
        total: 0,
      },
      {
        price: 58,
        size: 140,
        total: 0,
      },
      {
        price: 59,
        size: 10,
        total: 0,
      },
    ];

    const got2 = groupBy(unGroupedArr2, "0.5");
    expect(got2).toEqual(expected2);

    const unGroupedArr3 = [
      {
        price: 50,
        size: 100,
        total: 0,
      },
      {
        price: 55.5,
        size: 50,
        total: 0,
      },
      {
        price: 55.6,
        size: 120,
        total: 0,
      },
      {
        price: 55.7,
        size: 140,
        total: 0,
      },
      {
        price: 56,
        size: 10,
        total: 0,
      },
    ];

    const expected3 = [
      {
        price: 50,
        size: 100,
        total: 0,
      },
      {
        price: 55,
        size: 310,
        total: 0,
      },
      {
        price: 56,
        size: 10,
        total: 0,
      },
    ];

    const got3 = groupBy(unGroupedArr3, "1");
    expect(got3).toEqual(expected3);

    const unGroupedArr4 = [
      {
        price: 53,
        size: 100,
        total: 0,
      },
      {
        price: 55,
        size: 50,
        total: 0,
      },
      {
        price: 55.6,
        size: 120,
        total: 0,
      },
      {
        price: 70,
        size: 140,
        total: 0,
      },
      {
        price: 72,
        size: 10,
        total: 0,
      },
      {
        price: 72.5,
        size: 10,
        total: 0,
      },
    ];

    const expected4 = [
      {
        price: 52.5,
        size: 100,
        total: 0,
      },
      {
        price: 55,
        size: 170,
        total: 0,
      },
      {
        price: 70,
        size: 150,
        total: 0,
      },
      {
        price: 72.5,
        size: 10,
        total: 0,
      },
    ];

    const got4 = groupBy(unGroupedArr4, "2.5");
    expect(got4).toEqual(expected4);

    const unGroupedArr5 = [
      {
        price: 2250.3,
        size: 100,
        total: 0,
      },
      {
        price: 2250.7,
        size: 50,
        total: 0,
      },
      {
        price: 2250.8,
        size: 120,
        total: 0,
      },
    ];

    const expected5 = [
      {
        price: 2250.3,
        size: 100,
        total: 0,
      },
      {
        price: 2250.7,
        size: 50,
        total: 0,
      },
      {
        price: 2250.8,
        size: 120,
        total: 0,
      },
    ];

    const got5 = groupBy(unGroupedArr5, "0.05");
    expect(got5).toEqual(expected5);
  });
});
