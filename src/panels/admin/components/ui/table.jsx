import React from 'react';

export const Table = ({ children, className }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table-auto w-full ${className}`}>{children}</table>
    </div>
  );
};

export const TableHeader = ({ children }) => {
  return <thead className="bg-gray-100">{children}</thead>;
};

export const TableRow = ({ children, className }) => {
  return <tr className={`border-b ${className}`}>{children}</tr>;
};

export const TableHead = ({ children, className }) => {
  return (
    <th className={`text-left text-sm font-semibold text-gray-700 px-4 py-2 ${className}`}>
      {children}
    </th>
  );
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableCell = ({ children, className }) => {
  return (
    <td className={`text-sm text-gray-600 px-4 py-2 ${className}`}>
      {children}
    </td>
  );
};
