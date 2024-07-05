import { Column } from "react-table";
import TableHOC from "./TableHOC";
import { TransactionStat } from "@/types/types";


const columns: Column<TransactionStat>[] = [{
  Header: "Id",
  accessor: "_id",
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
}
]

const DashboardTable = ({data = []} : {data: TransactionStat[]}) => {
  return TableHOC<TransactionStat>(columns, data, "transaction-box", "Top Transactions")();
}

export default DashboardTable
