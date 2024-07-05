import { ReactElement, useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar"
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from "@/redux/api/productAPI";
import toast from "react-hot-toast";
import { CustomError } from "@/types/apiTypes";
import { useSelector } from "react-redux";
import { UserState } from "@/redux/reducer/userReducer";
import { server } from "@/redux/store";
import { Loader } from "lucide-react";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  }
]

const Products = () => {

  const { user } = useSelector((state: { userReducer: UserState }) => state.userReducer);
  const { isLoading, isError, error, data } = useAllProductsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([])

  if (isError) {
    toast.error((error as CustomError).data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          key: i._id,
          photo: <img src={`${server}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(columns, rows, "product-box", "All Product", true)();

  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 px-4 bg-white">
        {isLoading ? <Loader /> : Table}
        <Link to="/admin/product/new" className="fixed right-12 top-20 h-10 w-10 flex justify-center items-center rounded-[50%] bg-red-600 text-white hover:opacity-80" > <FaPlus /> </Link>
      </main>
    </div>
  )
}

export default Products
