
import { ReactElement, useEffect, useState } from "react"
import Sidebar from "../../components/admin/Sidebar"
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { useAllOrderQuery } from "@/redux/api/orderAPI";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/reducer/userReducer";
import toast from "react-hot-toast";
import { CustomError } from "@/types/apiTypes";
import { Loader } from "lucide-react";


interface Datatype {
  user: string,
  quantity: number,
  discount: number,
  amount: number,
  status: ReactElement,
  action: ReactElement
}

const columns: Column<Datatype>[] = [{
  Header: "User",
  accessor: "user",
},
{
  Header: "Quantity",
  accessor: "quantity",
},
{
  Header: "Discount",
  accessor: "discount",
},
{
  Header: "Amount",
  accessor: "amount",
},
{
  Header: "Status",
  accessor: "status",
},
{
  Header: "Action",
  accessor: "action"
}
]

function Transactions() {

  const { user } = useSelector((state: { userReducer: UserState }) => state.userReducer)
  const { data: orderData, isLoading, isError, error } = useAllOrderQuery(user?._id!)

  if (isError) {
    toast.error((error as CustomError).data.message);
  }

  const [data, setData] = useState<Datatype[]>([])

  useEffect(() => {
    if (orderData) {
      setData(
        orderData?.orders.map((i) => ({
          key: i._id,
          user: i.user.name,
          amount: i.total,
          discount: i.discount,
          status: <span className={
            i.status === "Processing" ? "text-red-600" : i.status === "Shipped" ? "text-green-600" : "text-purple-600"
          }>{i.status}</span>,
          quantity: i.orderItems.length,
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      )
    }
  }, [orderData])

  // const Table = useCallback(TableHOC(columns, data, "transaction-box", "Transactions", true), []);
  const Table = TableHOC(columns, data, "transaction-box", "Transactions", true)();



  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 px-4 bg-white">
        {
          isLoading ? <Loader /> : Table
        }
      </main>
    </div>
  )
}

export default Transactions
