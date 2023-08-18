import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import data from '../data/table';

const TeamTable = () => {
    const {team} = useAuth()

    const userTeam = team === 'Manchester United' ? 'Manchester Utd' : team

    const isMatchingTeam = (squad) => squad === userTeam

    // custom sort for the 'form' column
    const formSort = (rowA, rowB) => {
      const formA = rowA.original.Form
      const formB = rowB.original.Form
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
    
    // custom sort for xGD column to sort column containing negative values as well
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

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;
    
    
    return (
        <div className='flex flex-col items-center border-transparent border-2 mt-32'>
          <h1 className='text-white text-4xl font-bold mb-6 underline underline-offset-4 text-center'>LEAGUE TABLE STATISTICS</h1>
          <h3 className='text-white text-2xl font-bold mb-2'>Season</h3>
          <select className='px-12 py-2 border border-gray-400 rounded-lg shadow-md hover:cursor-pointer'>
            <option>22-23</option>
          </select>
          <div className='overflow-x-auto w-full sm:w-4/5'>
            <table {...getTableProps()} className='w-full border-collapse border border-gray-500 rounded-lg shadow-lg mt-8 table-auto'>
              <thead className='bg-gradient-to-b from-black to-gray-800'>
                  {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                          <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className="border border-gray-500 p-3 text-white font-bold uppercase tracking-wider cursor-pointer"
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
              <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    const isCurrentTeam = isMatchingTeam(row.original.Squad);
                    const rowStyle = {
                      backgroundColor: isCurrentTeam ? '#6EE7B7' : '#9CA3AF',
                    };
                    return (
                      <tr
                        {...row.getRowProps()}
                        style={rowStyle}
                      >
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="border border-gray-200 p-3"
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
            </table>
          </div>
       </div>
    );
    
}

export default TeamTable