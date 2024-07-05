import Sidebar from "../../../components/admin/Sidebar"
import { PieChart, DoughnutChart } from "../../../components/admin/Charts"
import { categories } from "../../../assets/data.json"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useGetPieQuery } from "@/redux/api/dashboard"
import toast from "react-hot-toast"
import { CustomError } from "@/types/apiTypes"
import Loader from "@/components/Loader"


function PieCharts() {

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError, isLoading, error } = useGetPieQuery(user?._id!);

  if (isError) {
    toast.error((error as CustomError).data.message)
  }

  const order = data?.data.orderFullfillment!;
  const stock = data?.data.stockAvailability!;
  const product = data?.data.productInfo!;
  const revenue = data?.data.revenue!;
  const userAge = data?.data.userAge!;
  const userPie = data?.data.user!;

  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] overflow-y-scroll bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      {
        isLoading ?
          <Loader /> :
          <main className="col-span-4 bg-white p-16 overflow-y-auto">
            <h1 className="mb-20 ml-8">Pie & Doughnut Charts</h1>
            <section className="w-[80%] my-16 mx-auto">
              <div className="max-w-[25rem] mx-auto mt-24 mb-[-1rem]">
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[
                    order.processing,
                    order.shipped,
                    order.delivered
                  ]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2 className="my-8 text-center">Order Fulfillment Ratio</h2>
            </section>

            <section className="w-[80%] my-16 mx-auto">
              <div className="max-w-[25rem] mx-auto mt-24 mb-[-1rem]">
                <DoughnutChart
                  labels={product.categories.map((i) => Object.keys(i)[0])}
                  data={product.categories.map((i) => Object.values(i)[0])}
                  backgroundColor={categories.map(
                    (i) => `hsl(${i.value * 4},${i.value}%, 50%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2 className="my-8 text-center">Product Categories Ratio</h2>
            </section>

            <section className="w-[80%] my-16 mx-auto">
              <div className="max-w-[25rem] mx-auto mt-24 mb-[-1rem]">
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[
                    stock.inStock,
                    stock.outOfStock
                  ]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2 className="my-8 text-center">Stock Availability</h2>
            </section>
            <section className="w-[80%] my-16 mx-auto">
              <div className="max-w-[25rem] mx-auto mt-24 mb-[-1rem]">
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    revenue.marketingCost,
                    revenue.discount,
                    revenue.burnt,
                    revenue.productionCost,
                    revenue.netMargin,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2 className="my-8 text-center">Revenue Distribution</h2>
            </section>

            <section className="w-[80%] my-16 mx-auto">
              <div className="max-w-[25rem] mx-auto mt-24 mb-[-1rem]">
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[
                    userAge.teen,
                    userAge.adult,
                    userAge.old,
                  ]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2 className="my-8 text-center">Users Age Group</h2>
            </section>

            <section className="w-[80%] my-16 mx-auto">
              <div className="max-w-[25rem] mx-auto mt-24 mb-[-1rem]">
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[
                    userPie.admin,
                    userPie.customer
                  ]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 80]}
                />
              </div>
            </section>
          </main>
      }
    </div>
  )
}

export default PieCharts
