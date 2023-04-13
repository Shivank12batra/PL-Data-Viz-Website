import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import data from '../data/table';

const TeamTable = () => {
    
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

    const xGDSort = (rowA, rowB) => {
      const numA = parseFloat(rowA.original.xGD);
      const numB = parseFloat(rowB.original.xGD);
      if (numA > numB) {
        return 1;
      }
      if (numA < numB) {
        return -1;
      }
      return 0;
    }

    const columns = React.useMemo(() => {
        const columnHeaders = Object.keys(data[0]);
      
        return columnHeaders.map((header) => {
          return {
            Header: header,
            accessor: header,
            sortType: header === 'Form' ? formSort : header === 'xGD' ? xGDSort : typeof data[0][header] === 'number' ? 'number' : 'alphanumeric',
            sortDesc : true
          };
        });
      }, [data]);

      const tableInstance = useTable({
        columns,
        data
      },
      useSortBy
      )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
      setSortBy} = tableInstance;
    
    
    return (
        <div className='flex justify-center items-center mt-8 font-serif'>
            <table {...getTableProps()} className='border-collapse border border-gray-500 rounded-lg shadow-lg bg-red-500'>
            <thead className='bg-red-500'>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                        <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className="border border-gray-500 p-3 text-gray-700 font-bold uppercase tracking-wider cursor-pointer"
                        
                      >
                        {column.render('Header')}
                        <span className='flex justify-center'>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaSortDown/>
                            ) : (
                              <FaSortUp/>
                            )
                          ) : (
                            <FaSort/>
                          )}
                        </span>
                      </th>
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