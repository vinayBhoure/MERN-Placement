
import { ReactElement, useCallback, useState } from "react"
import Sidebar from "../../components/admin/Sidebar"
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";


interface Datatype {
  user: string,
  quantity: number,
  discount: number,
  amount: number,
  status: ReactElement,
  action:ReactElement
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

const arr: Datatype[] = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    quantity: 3,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="green">Shipped</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="purple">Delivered</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
];


function Transactions() {

  const [data] = useState<Datatype[]>(arr)
  const Table = useCallback(TableHOC(columns, data, "transaction-box", "Transactions", true),[])
  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7] pt-2">

      {/* Sidebar */} 
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 px-4 bg-white">
        {Table()}
      </main>
    </div>
  )
}

export default Transactions
