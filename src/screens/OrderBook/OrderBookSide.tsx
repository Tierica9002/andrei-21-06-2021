import React from "react";
import { SortDirections, Order, Sides } from "./types";
import TableHeader from "components/TableHeader";
import TableRow from "components/TableRow";
import ProgressBarContainer from "components/ProgressBarContainer";
import { formatNumber } from "utils/index";

export interface OrderBookSideProps {
  sort: SortDirections;
  rows: Order[];
  side: Sides;
  maxOrderSize: number;
}

const OrderBookSide = ({
  side,
  sort = SortDirections.ASC,
  rows,
  maxOrderSize,
}: OrderBookSideProps): JSX.Element => {
  return (
    <>
      <TableHeader>
        <div className="flex-1 text-right text-gray-400 pr-12">Price</div>
        <div className="flex-1 text-right text-gray-400 pr-12">Size</div>
        <div className="flex-1 text-right text-gray-400 pr-12">Total</div>
      </TableHeader>
      {rows.map((order, index) => {
        return (
          <ProgressBarContainer
            key={index}
            progress={100 * (order.total / maxOrderSize)}
            color={side === Sides.BID ? "green" : "red"}
            direction={side === Sides.BID ? "ltr" : "rtl"}
          >
            <TableRow>
              <div className="flex-1 text-right text-white pr-12">
                {formatNumber(order.price)}
              </div>
              <div className="flex-1 text-right text-white pr-12">
                {formatNumber(order.size)}
              </div>
              <div className="flex-1 text-right text-green-500 pr-12">
                {formatNumber(order.total)}
              </div>
            </TableRow>
          </ProgressBarContainer>
        );
      })}
    </>
  );
};

export default OrderBookSide;
