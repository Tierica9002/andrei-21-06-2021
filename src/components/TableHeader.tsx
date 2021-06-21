import React from "react";

interface TableHeaderProps {
  children: React.ReactNode;
  reverse?: boolean;
}

const TableHeader = ({
  children,
  reverse = false,
}: TableHeaderProps): JSX.Element => {
  const sortedChildren = reverse
    ? React.Children.toArray(children).reverse()
    : children;
  return <div className="flex text-white mb-3 uppercase">{sortedChildren}</div>;
};

export default TableHeader;
