import { mergeDelta } from "utils/index";
import { SortDirections } from "screens/OrderBook/types";

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
    const got = mergeDelta(arr1Asc, arr2Asc, SortDirections.ASC);
    expect(got).toEqual(expectedArr1Arr2Asc);
  });

  it("sorts 2 sorted arrays descendend", () => {
    const got = mergeDelta(arr1Desc, arr2Desc, SortDirections.DESC);
    expect(got).toEqual(expectedArr1Arr2Desc);
  });
});
