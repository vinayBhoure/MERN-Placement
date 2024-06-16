import Sidebar from "../../../components/admin/Sidebar"
import{ PieChart, DoughnutChart} from "../../../components/admin/Charts"
import { categories } from "../../../assets/data.json"


function PieCharts() {
  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] overflow-y-scroll bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 bg-white p-16 overflow-y-auto">
        <h1 className="mb-20 ml-8">Pie & Doughnut Charts</h1>
        <section className="w-[80%] my-16 mx-auto">
          <div className="max-w-[25rem] mx-auto mt-24 mb-[-1rem]">
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[12, 9, 13]}
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
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
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
              data={[40, 20]}
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
              data={[32, 18, 5, 20, 25]}
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
              data={[30, 250, 70]}
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
              data={[40, 250]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default PieCharts
