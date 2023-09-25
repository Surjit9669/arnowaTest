import React from 'react';
import { useTable } from 'react-table';

const SessionTable = ({ data }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Session Time',
                accessor: 'sessionTime',
            },
            {
                Header: 'Session Duration',
                accessor: 'sessionDuration',
            },
            {
                Header: 'Messages',
                accessor: 'messages',
                Cell: ({ value }) => {
                    return (
                        <ul>
                            {value.map((message, index) => (
                                <li key={index}>{message}</li>
                            ))}
                        </ul>
                    );
                }
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    return (
        <div className="table-responsive">
            <table {...getTableProps()} className="table table-striped table-bordered">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SessionTable;
