import TableHOC from "@/components/admin/TableHOC"
import { useMyOrderQuery } from "@/redux/api/orderAPI";
import { UserState } from "@/redux/reducer/userReducer";
import { CustomError } from "@/types/apiTypes";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { error } from "console";
import { Loader } from "lucide-react";
import { ReactElement, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";

type DataTypes = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
}


const columns: Column<DataTypes>[] = [
    {
        Header: 'ID',
        accessor: '_id',
    },
    {
        Header: 'Amount',
        accessor: 'amount',
    },
    {
        Header: 'Quantity',
        accessor: 'quantity',
    },
    {
        Header: 'Discount',
        accessor: 'discount',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Action',
        accessor: 'action',
    }
]

function Orders() {

    const { user } = useSelector((state: { userReducer: UserState }) => state.userReducer)
    const { data, isLoading, isError, error } = useMyOrderQuery(user?._id!);

    if (isError) {
        toast.error((error as CustomError).data.message);
    }

    const [rows, setRows] = useState<DataTypes[]>([])

    useEffect(() => {
        if (data) {
            setRows(
                data.orders.map((i) => ({
                    _id: i._id,
                    amount: i.total,
                    quantity: i.orderItems.length,
                    discount: i.discount,
                    status: <span className="text-green-500">Paid</span>,
                    action: <Link to={`/${i.user}/${i._id}`}>View</Link>
                }))
            )
        }
    }, [data])

    const Table = TableHOC<DataTypes>(columns, rows, 'orders', 'order', rows.length > 6)();

    return (
        <div className="max-w-[1280px] w-full m-auto overflow-auto" style={{minHeight:'calc(100vh - 4rem)'}}>
            {
                isLoading ? <Loader /> : <>
                    <h1 className="text-2xl uppercase my-4">My Orders</h1>
                    {Table}
                </>
            }
        </div>
    )
}

export default Orders
