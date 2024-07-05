
import Sidebar from "../../../components/admin/Sidebar"
import { LineChart } from '../../../components/admin/Charts'
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { getLastMonths } from "@/features";
import { useGetLineQuery } from "@/redux/api/dashboard";
import toast from "react-hot-toast";
import { CustomError } from "@/types/apiTypes";
import Loader from "@/components/Loader";

function LineCharts() {

  const { last12Months } = getLastMonths();
  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data, isError, error, isLoading } = useGetLineQuery(user?._id!);

  if (isError) {
    toast.error((error as CustomError).data.message)
  }


  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      {
        isLoading ?
          <Loader /> :
          <main className="col-span-4 bg-white p-16 overflow-y-auto">
            <h1 className='mb-20 ml-8'>Line Charts</h1>
            <section className="w-[80%] my-16 mx-auto" >
              <LineChart
                data={data?.data.users!}
                label="Users"
                borderColor="rgb(53, 162, 255)"
                backgroundColor="rgba(53, 162, 255,0.5)"
                labels={last12Months}
              />
              <h2 className="my-8 text-center">Active Users</h2>
            </section>
            <section className="w-[80%] my-16 mx-auto">
              <LineChart
                data={data?.data.products!}
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                label="Products"
                labels={last12Months}
              />
              <h2 className="my-8 text-center">Total Products (SKU)</h2>
            </section>

            <section className="w-[80%] my-16 mx-auto">
              <LineChart
                data={data?.data.revenue!}
                backgroundColor={"hsla(129,80%,40%,0.4)"}
                borderColor={"hsl(129,80%,40%)"}
                label="Revenue"
                labels={last12Months}
              />
              <h2 className="my-8 text-center">Total Revenue</h2>
            </section>

            <section className="w-[80%] my-16 mx-auto">
              <LineChart
                data={data?.data.discount!}
                backgroundColor={"hsla(29,80%,40%,0.4)"}
                borderColor={"hsl(29,80%,40%)"}
                label="Discount"
                labels={last12Months}
              />
              <h2 className="my-8 text-center">Discount Allotted</h2>
            </section>
          </main>
      }
    </div>
  )
}

export default LineCharts
