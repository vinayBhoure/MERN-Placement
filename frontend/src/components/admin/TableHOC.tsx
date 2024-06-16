import { useTable, Column, TableOptions, useSortBy, usePagination } from "react-table"
import '../../style/admin/product_css.css'
import '../../style/admin/table.css'

function TableHOC<T extends Object>(columns: Column<T>[], data: T[], containerClassName: string, heading: string, showPagination: boolean = false) {
    return function HOC() {

        const options: TableOptions<T> = {
            columns,
            data,
            initialState: {
                pageSize:6,
            },
        }

        const { 
            getTableProps,
            getTableBodyProps, 
            headerGroups, page, 
            prepareRow,
            nextPage,
            previousPage,
            canNextPage,
            canPreviousPage,
            pageCount,
            state:{pageIndex}

        } = useTable(options, useSortBy, usePagination)

        return <div className={containerClassName}>
            <h2 className="text-xl font-bold p-2">{heading}</h2>

            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column: any) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        {column.isSorted && <span className="text-sm">{column.isSortedDesc ? "⬇️" : "⬆️" }</span>}
                                    </th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row);
                            return <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
            
            {
                showPagination && data.length > 0 && <div className="pagination flex gap-4 m-8 justify-center items-center">
                    <button  disabled={!canPreviousPage} onClick={previousPage}>⬅️</button>
                    <span>{`${pageIndex + 1 } of ${pageCount}`}</span>
                    <button disabled={!canNextPage} onClick={nextPage}>➡️</button>
                </div>
            }
        </div>
    }
}

export default TableHOC
