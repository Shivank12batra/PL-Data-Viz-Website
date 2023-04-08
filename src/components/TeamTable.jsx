import React, {useState} from 'react';
import { useTable, useSortBy } from 'react-table';
import data from '../data/table';

const TeamTable = () => {
    const [sortColumn, setSortColumn] = useState("Form");
    const [sortDirection, setSortDirection] = useState("Desc");

    const formSort = (rowA, rowB) => {
      const formA = rowA.original.Form;
      const formB = rowB.original.Form;
      const pointsA = formA.split("").reduce((total, value) => {
        if (value === "W") {
          total += 3;
        } else if (value === "D") {
          total += 1;
        }
        return total;
      }, 0);
      const pointsB = formB.split("").reduce((total, value) => {
        if (value === "W") {
          total += 3;
        } else if (value === "D") {
          total += 1;
        }
        return total;
      }, 0);
      return pointsA > pointsB ? 1 : pointsA < pointsB ? -1 : 0;
    };

    const columns = React.useMemo(() => {
        const columnHeaders = Object.keys(data[0]);
      
        return columnHeaders.map((header) => {
          return {
            Header: header,
            accessor: header,
            sortType: header === 'Form' ? formSort : typeof data[0][header] === 'number' ? 'number' : 'alphanumeric',
            sortDescFirst: true,
            sortInverted: false,
          };
        });
      }, [data]);
      console.log(columns)
      
    
    const tableInstance = useTable(
        { columns, data, initialState: { sortBy: [{ id: sortColumn, desc: true }] } },
        useSortBy
      );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    const handleSortClick = (columnId) => {
        if (sortColumn === columnId) {
          setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
          setSortColumn(columnId);
          setSortDirection("desc");
        }
      };
    
    return (
        <div className='flex justify-center items-center mt-8 font-serif'>
            <table {...getTableProps()} className='border-collapse border border-gray-500 rounded-lg shadow-lg bg-red-500'>
            <thead className='bg-red-500'>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} className="border border-gray-500 p-3 text-gray-700 font-bold uppercase tracking-wider">{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className='bg-white'>
                {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className='border border-gray-500 p-3'>{cell.render('Cell')}</td>
                    ))}
                    </tr>
                );
                })}
            </tbody>
        </table>
        </div>
      );
    
}

export default TeamTable