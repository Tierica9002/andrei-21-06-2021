import React from "react";

interface TableRowProps {
  children: React.ReactNode;
}

const TableRow = ({ children }: TableRowProps): JSX.Element => {
  return <div className="flex">{children}</div>;
};

export default TableRow;
