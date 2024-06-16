
import { ReactElement, useState } from "react"
import Sidebar from "../../components/admin/Sidebar"
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import { useCallback } from "react";
import { FaTrash } from "react-icons/fa";

interface DataType {
  avatar: ReactElement,
  name: string,
  gender: string,
  email: string,
  role: string,
  action: ReactElement
}

const columns: Column<DataType>[] = [{
  Header: "Avatar",
  accessor: "avatar"
},
{
  Header: "Name",
  accessor: "name"
},
{
  Header: "Gender",
  accessor: "gender"
},
{
  Header: "Email",
  accessor: "email"
},
{
  Header: "Role",
  accessor: "role"
},
{
  Header: "Action",
  accessor: "action"
}

]

const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const arr: DataType[] = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img}
        alt="Shoes"
      />
    ),
    name: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },

  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img2}
        alt="Shoes"
      />
    ),
    name: "May Scoot",
    email: "aunt.may@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

function Customers() {

  const [data, setData] = useState<DataType[]>(arr);
  const Table = useCallback(TableHOC<DataType>(columns, data, "customer-box", "Customers", true), []);
  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7] pt-2">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 bg-white px-4">
        {Table()}
      </main>
    </div>
  )
}

export default Customers
