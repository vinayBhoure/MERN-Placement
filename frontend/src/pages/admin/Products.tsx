import { ReactElement, useCallback, useState } from "react";
import Sidebar from "../../components/admin/Sidebar"
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

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

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: DataType[] = [
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
];

const Products = () => {

  const [data] = useState<DataType[]>(arr)
  const Table = useCallback(TableHOC<DataType>(columns, data, "product-box", "All Product", true), []);

  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7] pt-2">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 px-4 bg-white">
        {Table()}
        <Link to="/admin/product/new" className="fixed right-8 top-8 h-10 w-10 flex justify-center items-center rounded-[50%] bg-red-600 text-white hover:opacity-80" > <FaPlus /> </Link>
      </main>
    </div>
  )
}

export default Products
