import { useTable, usePagination, useRowSelect, loopHooks } from "react-table";
import React from "react";
import { COLUMNS } from "./columns";
import { useState, useMemo, useEffect } from "react";
import Search from "./Search";
import "../Table/Table.css";
import Checkbox from "./Checkbox";

const BasicTable = () => {
  const [mockData, setmockData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://4027-2402-e280-3e0b-16-4d2c-4159-f0b5-17f2.in.ngrok.io/token"
      )
        .then((response) => response.json())
        .then((users) => {
          setmockData(users);
        });
    };
    fetchData();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = mockData;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((column) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...column,
        ];
      });
    }
  );

  const firstPageRows = page;

  return (
    <>
      <Search data={mockData} />

      <div className="table-container">
        <table {...getTableProps()} className="table">
          <thead className="thead-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}{" "}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button onClick={() => previousPage()}>Previous</button>
          <button onClick={() => nextPage()}>Next</button>
        </div>
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedFlatRows: selectedFlatRows.map((row) => row.original),
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </>
  );
};

export default BasicTable;
