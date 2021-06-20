import React from "react";

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps) => {
  return <div className="flex text-white uppercase">{children}</div>;
};

export default TableHeader;
