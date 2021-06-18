import React from "react";

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps) => {
  return <div className="flex text-white">{children}</div>;
};

export default TableHeader;
