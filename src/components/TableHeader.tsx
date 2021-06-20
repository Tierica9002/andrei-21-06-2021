import React from "react";

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps): JSX.Element => {
  return <div className="flex text-white mb-3 uppercase">{children}</div>;
};

export default TableHeader;
