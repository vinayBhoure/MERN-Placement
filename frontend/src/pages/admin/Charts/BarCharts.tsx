import Sidebar from "../../../components/admin/Sidebar"
import BarChart from "../../../components/admin/Charts"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { useGetBarQuery } from "@/redux/api/dashboard"
import toast from "react-hot-toast"
import { CustomError } from "@/types/apiTypes"
import Loader from "@/components/Loader"
import { getLastMonths } from "@/features"

function BarCharts() {

  const { last6Months, last12Months } = getLastMonths();

  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data, isLoading, isError, error } = useGetBarQuery(user?._id!)

  if (isError) {
    toast.success((error as CustomError).data.message);
  }

  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      {
        isLoading ?
          <Loader /> :
          <main className="col-span-4 p-16 overflow-y-auto bg-white">
            <h2 className="mb-20 ml-8">Prodcuts and Customer</h2>
            <section className="w-[80%] my-16 mx-auto">
              <BarChart
                labels={last6Months}
                data_1={data?.data.products!}
                data_2={data?.data.users!}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260,50%,30%)`}
                bgColor_2={`hsl(360,90%,90%)`}
              />
              <h2 className="my-8 text-center">Top Selling Products and Top Customers</h2>
            </section>

            <section className="w-[80%] my-16 mx-auto">
              <BarChart
                labels={last12Months}
                horizontal={true}
                data_1={data?.data.orders!}
                data_2={[]}
                title_1="Products"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
              />
              <h2 className="my-8 text-center">Orders throughtout the year</h2>
            </section>

          </main>
      }
    </div>
  )
}

export default BarCharts
