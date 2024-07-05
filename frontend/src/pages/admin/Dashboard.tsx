import { BsSearch } from "react-icons/bs"
import Sidebar from "../../components/admin/Sidebar"
import { FaRegBell } from "react-icons/fa"
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi"
import BarChart, { DoughnutChart } from "../../components/admin/Charts"
import { BiMaleFemale } from "react-icons/bi"
import { useGetDashboardStatsQuery } from "@/redux/api/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CustomError } from "@/types/apiTypes";
import toast from "react-hot-toast";
import DashboardTable from "../../components/admin/DashboardTable"
import Loader from "@/components/Loader"
import { useEffect, useState } from "react"
import { DashboardStatsType } from "@/types/types"
import { getLastMonths } from "@/features"

interface CategoryItemProps {
  color: string,
  heading: string,
  value: number
}

function Dashboard() {

  const {last6Months: months} = getLastMonths();

  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data: dashboardStats, isLoading, isError, error } = useGetDashboardStatsQuery(user?._id!);

  if (isError) {
    toast.error((error as CustomError).data.message);
  }

  const [data, setData] = useState<DashboardStatsType>()

  useEffect(() => {
    const dashboard = dashboardStats?.data
    if (dashboardStats) {
      setData(
        {

          percentChange: {
            revenue: dashboard?.percentChange.revenue!,
            productPercentage: dashboard?.percentChange.productPercentage!,
            userPercentage: dashboard?.percentChange.userPercentage!,
            orderPercentage: dashboard?.percentChange.orderPercentage!
          },
          counts: {
            revenue: dashboard?.counts.revenue!,
            productCount: dashboard?.counts.productCount!,
            userCount: dashboard?.counts.userCount!,
            orderCount: dashboard?.counts.orderCount!
          },
          chart: {
            order: dashboard?.chart.order!,
            revenue: dashboard?.chart.revenue!

          },
          categories: dashboard?.categories!,
          userRatio: dashboard?.userRatio!,
          transactions: dashboard?.transactions!,
        }
      )
    }
  }, [dashboardStats])

  return (
    <div className="grid lg:grid-cols-5 grid-cols-1 gap-8 h-[100vh] bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      {
        isLoading ?
          <Loader /> :
          <>
            <main className="col-span-4 overflow-y-auto px-4">
              <div className={` h-[4rem] flex items-center py-0 px-4 border-b border-slate-300 gap-2`}
              >
                <BsSearch size={'1.2rem'} opacity={'0.7'} />
                <input type="text" placeholder="Searcg for data, users, docs" className="mr-auto bg-[#f7f7f7] w-full focus:outline-none py-2 px-0 " />
                <FaRegBell />
                {/* <img className="w-10 h-10 rounded-full" src={user?.photo} alt="Rounded avatar" /> */}
              </div>

              <section className="flex lg:justify-between  items-stretch gap-8 lg:py-8 lg:pr-8 p-8 justify-center flex-wrap">
                <WidgetItem
                  percent={data?.percentChange.orderPercentage!}
                  heading="revenue"
                  value={data?.percentChange.productPercentage!}
                  amount={true}
                  color="blue"
                />
                <WidgetItem
                  percent={data?.percentChange.productPercentage!}
                  heading="products"
                  value={data?.percentChange.productPercentage!}
                  amount={false}
                  color="red"
                />
                <WidgetItem
                  percent={data?.percentChange.userPercentage!}
                  heading="users"
                  value={data?.percentChange.userPercentage!}
                  amount={false}
                  color="green"
                />
                <WidgetItem
                  percent={data?.percentChange.orderPercentage!}
                  heading="orders"
                  value={data?.percentChange.orderPercentage!}
                  amount={false}
                  color="yellow"
                />

              </section>

              <section className=" flex gap-8 pr-8 pb-8 flex-wrap lg:flex-nowrap justify-center ">
                <div className="bg-white rounded-lg w-full py-4 px-8">
                  <h2 className="text-xl text-center mt-4 mb-8 ml-1">Revenue and Transcation</h2>
                  {/* <BarChart /> */}
                  <BarChart
                  labels={months}
                    data_1={data?.chart.order!}
                    data_2={data?.chart.revenue!}
                    title_1="Revenue"
                    title_2="Transaction"
                    bgColor_1="rgb(0,115,255)"
                    bgColor_2="rgba(53,162,235,0.8)" />

                </div>
                <div className="bg-white rounded-lg w-full max-w-64 pb-8">
                  <h2 className="text-xl text-center mt-6 mb-8 ">Inventory</h2>
                  <div className="pl-2 overflow-y-auto">
                    {data && data.categories.map((item, index) => {
                      const [heading, value] = Object.entries(item)[0];
                      return <CategoryItem
                        key={index}
                        color={`hsl(${value! * 4}, ${value}%, 50%)`}
                        heading={heading}
                        value={value ? value : 0}
                      />
                    })}
                  </div>
                </div>

              </section>

              <section className="flex gap-8 lg:pr-8 lg:pb-8 p-8 h-[unset] lg:h-[25rem] flex-wrap lg:flex-nowrap justify-center">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-[20rem] relative">
                  <h2 className="text-center mt-6 mb-8 ">Gender Chart</h2>
                  {/* charts donut */}
                  <p className="text-lg absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"><BiMaleFemale /></p>
                  <DoughnutChart
                    labels={["Female", "Male"]}
                    data={[data?.userRatio.female!, data?.userRatio.male!]}
                    backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                    cutout={90}
                  />
                </div>

                {/* Table */}
                <div className="w-full bg-white rounded-lg">
                  <DashboardTable data={data?.transactions!} />
                </div>
              </section>

            </main>
          </>
      }
    </div>
  )
}

interface WidgetProps {
  heading: string,
  value: number,
  percent: number,
  color: string,
  amount?: boolean
}

const WidgetItem = ({ heading, value, percent, amount, color }: WidgetProps) => <article className="w-48 bg-white shadow-inner rounded p-2 flex justify-between items-stretch">
  <div className="">
    <p className="text-sm opacity-70">{heading}</p>
    <h3 className="text-2xl">{amount ? `$${value}` : value}</h3>
    {
      percent > 0 ?
        <span className="text-green-500 flex items-center text-xs"><HiTrendingUp /> {`${percent > 1000 ? 999 : percent}%`}</span> :
        <span className="text-red-500"><HiTrendingDown /> {`${percent < -1000 ? -999 : percent}%`}</span>
    }
  </div>
  <div
    className=" w-[4rem] h-[4rem] rounded-full grid relative place-items-center "
    style={{ background: `conic-gradient(${color} ${(percent / 100) * 360}deg, rgb(255,255,255) 0)` }}
  >
    <div className="rounded-full w-[3.5rem] h-[3.5rem] grid place-items-center absolute bg-white">
      <span
        className={`text-${color} relative`}
        style={{ color: `${color}` }}
      >
        {percent > 0 && `${percent > 1000 ? 999 : percent}%`}
        {percent < 0 && `${percent < -1000 ? -999 : percent}%`}
      </span>
    </div>
  </div>
</article>


const CategoryItem = ({ color, heading, value }: CategoryItemProps) => (
  <div className="w-full flex justify-between items-center gap-1 p-4">
    <h5 className="font-light tracking-wide">{heading}</h5>
    <div className="ml-auto w-24 rounded-2xl h-2 bg-[rgb(217,217,217)]">
      <div style={{ backgroundColor: `${color}`, width: `${value}%` }} className="h-full rounded-2xl"></div>
    </div>
    <span className="font-bold text-sm">{value}%</span>
  </div>
)

export default Dashboard
