import React from "react";

interface TableRowProps {
  children: React.ReactNode;
  reverse?: boolean;
}

const TableRow = ({ children, reverse }: TableRowProps): JSX.Element => {
  const sortedChildren = reverse
    ? React.Children.toArray(children).reverse()
    : children;
  return <div className="flex">{sortedChildren}</div>;
};

export default TableRow;
