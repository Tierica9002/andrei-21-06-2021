import React from "react";
import { SortDirections, Order, Sides } from "./types";
import TableHeader from "components/TableHeader";
import TableRow from "components/TableRow";
import ProgressBarContainer from "components/ProgressBarContainer";
import { formatNumber } from "utils/index";

export interface OrderBookSideProps {
  reverse?: boolean;
  showHeader?: boolean;
  rows: Order[];
  maxOrderSize: number;
  direction: "ltr" | "rtl";
  color: "red" | "green";
}

const OrderBookSide = ({
  reverse = false,
  direction,
  color,
  rows,
  maxOrderSize,
  showHeader = true,
}: OrderBookSideProps): JSX.Element => {
  const sortedRows = reverse ? rows.slice().reverse() : rows;
  return (
    <>
      <TableHeader>
        {showHeader && (
          <>
            <div className="flex-1 text-right text-gray-400 pr-12">Price</div>
            <div className="flex-1 text-right text-gray-400 pr-12">Size</div>
            <div className="flex-1 text-right text-gray-400 pr-12">Total</div>
          </>
        )}
      </TableHeader>
      {sortedRows.map((order, index) => {
        return (
          <ProgressBarContainer
            key={index}
            progress={100 * (order.total / maxOrderSize)}
            color={color}
            direction={direction}
          >
            <TableRow>
              <div className="flex-1 text-right text-green-500 text-white pr-12">
                {formatNumber(order.price)}
              </div>
              <div className="flex-1 text-right text-white pr-12">
                {formatNumber(order.size)}
              </div>
              <div className="flex-1 text-right text-white pr-12">
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
