import { Order, SortDirections } from "screens/OrderBook/types";

// maybe save data in a closure so we don't pass number of decimals each time
export const formatNumber = (nr: number): string => {
  return nr.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// could have used normal sort function, but this function is called very often
// and I think the readibilty cost justifies the time complexity saved
// Time complexity is O(m+n) as oposed to normal sort which is O((m+n)(log m+n))
export const mergeDelta = (
  initial: Array<Order>,
  delta: Array<Order>
): Array<Order> => {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < initial.length && j < delta.length) {
    if (initial[i].price < delta[j].price) {
      result.push(initial[i]);
      i++;
    } else if (initial[i].price > delta[j].price) {
      result.push(delta[j]);
      j++;
    } else {
      result.push(delta[j]);
      j++;
      i++;
    }
  }

  return result
    .concat(initial.slice(i))
    .concat(delta.slice(j))
    .filter((item) => item.size !== 0);
};
