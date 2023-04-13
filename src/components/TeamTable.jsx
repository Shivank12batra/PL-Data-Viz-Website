import React, {useState} from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import data from '../data/table';

const TeamTable = () => {
    // const [columns, setColumns] = useState();
    // const [sortColumn, setSortColumn] = useState("Rank");
    // const [sortDirection, setSortDirection] = useState("");

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
            isSortedDesc: true
          };
        });
      }, [data]);

      const tableInstance = useTable({
        columns,
        data
      },
      useSortBy
      )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state : {sortBy},
      setSortBy} = tableInstance;

    const sortToggle = (column) => {
        const { isSorted, isSortedDesc, sortDescFirst } = column;
        console.log(column)
        console.log(Object.keys(column))
        console.log(isSorted)
        console.log(sortDescFirst)
      
        if (!isSorted) {
          setSortBy([{ isSorted: true, sortDescFirst: true }]);
        } else {
          setSortBy([{ sortDescFirst: !sortDescFirst, isSorted: true }]);
        }
      

      // toggle sorting order
      // const newIsSorted = !isSorted;
      // const newIsSortedDesc = isSorted ? !isSortedDesc : false;
    
      // // update column properties
      // // column.isSorted = newIsSorted;
      // column.isSortedDesc = newIsSortedDesc;
    
      // // update sorting state in React-Table
      // setSortBy([
      //   {
      //     id: column.id,
      //     desc: newIsSortedDesc,
      //   },
      // ]);
    };
    
    
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
                              <FaSortDown onClick={() => sortToggle(column)}/>
                            ) : (
                              <FaSortUp onClick={() => sortToggle
                              (column)}/>
                            )
                          ) : (
                            <FaSort onClick={() => sortToggle
                            (column)}/>
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

// {
//   onClick: () => {
//     console.log(column.id);
//     setSortColumn(column.id);
//     setSortDirection(sortColumn === column.id ? (sortDirection === 'Desc' ? 'Asc' : 'Desc') : 'Desc');
//   }
// }