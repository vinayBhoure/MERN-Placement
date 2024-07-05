
import { ReactElement, useEffect, useState } from "react"
import Sidebar from "../../components/admin/Sidebar"
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import { FaTrash } from "react-icons/fa";
import { useAllUserQuery, useDeleteUserMutation } from "@/redux/api/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CustomError } from "@/types/apiTypes";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleResponse } from "@/features";
import { useNavigate } from "react-router";

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
}]

function Customers() {

  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer)

  const { data: allUserData, isLoading, isError, error } = useAllUserQuery(user?._id!);
  const [ deleteUser ] = useDeleteUserMutation();

  if (isError) {
    toast.error((error as CustomError).data.message);
  }

  const [data, setData] = useState<DataType[]>([]);

  const deleteHandler =  async(id: string) => {
      alert("Are you sure you want to delete this user?")
      console.log("admin ID", user?._id);
      console.log("user ID", id);
      const response = await deleteUser({userId: user?._id!, id});
      handleResponse(response, navigate, "/customers")
  }

  useEffect(() => {

    if (allUserData) {
      setData(
        allUserData.users.map((i) => ({
          avatar: (
            <Avatar className="h-10 w-10">
              <AvatarImage src={i.photo} />
              <AvatarFallback>{i.name[0]}</AvatarFallback>
            </Avatar>
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      )
    }

  }, [allUserData])

  const Table = TableHOC<DataType>(columns, data, "customer-box", "Customers", true)();
  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 bg-white px-4">
        {
          isLoading ?
            <Loader /> :
            <>{Table}</>
        }
      </main>
    </div>
  )
}

export default Customers
