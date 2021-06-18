import { Order, SortDirections } from "screens/OrderBook/@types";

// maybe save data in a closure so we don't pass number of decimals each time
export const formatNumber = (nr: number, decimals: number): string => {
  return "";
};

export const mergeDelta = (
  initial: Array<Order>,
  delta: Array<Order>,
  sortDirection: SortDirections
): Array<Order> => {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < initial.length && j < delta.length) {
    if (sortDirection === SortDirections.ASC) {
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
    } else {
      if (initial[i].price > delta[j].price) {
        result.push(initial[i]);
        i++;
      } else if (initial[i].price < delta[j].price) {
        result.push(delta[j]);
        j++;
      } else {
        result.push(delta[j]);
        j++;
        i++;
      }
    }
  }

  return result
    .concat(initial.slice(i))
    .concat(delta.slice(j))
    .filter((item) => item.size !== 0);
};
